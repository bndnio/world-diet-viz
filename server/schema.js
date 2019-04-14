const { gql } = require('apollo-server');
const runQuery = require('./db');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  enum Group {
    RAW
    MACRO
    GROUP
    OTHER
  }

  type Range {
    min: Int!
    max: Int!
  }

  type YearCountriesDiet {
    year: Int!
    countries: [CountryDiet!]!
  }

  type CountryDiet {
    country: String!
    items: [Diet]!
  }

  type Diet {
    country: String!
    year: Int!
    type: Group!
    name: String!
    value: Float!
  }

  type YearCountriesLifeExp {
    year: Int!
    countries: [CountryLifeExp!]!
  }

  type CountryLifeExp {
    country: String!
    items: [LifeExp!]!
  }

  type LifeExp {
    country: String!
    year: Int!
    value: Float
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    diets(
      years: [Int!]
      countries: [String!]
      type: Group
    ): [YearCountriesDiet!]

    lifeExpectancies(
      years: [Int!]
      countries: [String!]
    ): [YearCountriesLifeExp!]

    countries: [String!]!
    yearRange: Range!
    kcalRange: Range!
    lifeExpRange: Range!
    names(type: Group): [String!]!
  }
`;

const aggregateItemByYearCountry = itemFunc => res => {
  const { rows } = res;
  const yearGrouped = rows.reduce(
    (acc, row) => ({
      ...acc,
      [row.year]: {
        ...(acc[row.year] || {}),
        [row.country]: [
          ...((acc[row.year] && acc[row.year][row.country]) || []),
          itemFunc(row),
        ],
      },
    }),
    {}
  );
  const output = Object.entries(yearGrouped).map(([year, countries]) => ({
    year,
    countries: Object.entries(countries).map(([country, items]) => ({
      country,
      items,
    })),
  }));
  return output;
};

const dietItemFunc = row => ({
  country: row.country,
  year: row.year,
  type: row.type,
  name: row.name,
  value: row.value,
});

const buildDietsQueryStr = ({ countries = [], years = [], type = '' }) =>
  [
    `SELECT DISTINCT country, year, type, name, value FROM diet`,
    countries.length > 0 ? `WHERE ( country='${countries[0]}'` : '',
    countries.length > 1
      ? countries.slice(1).map(c => `OR country='${c}'`)
      : '',
    countries.length > 0 ? `)` : '',
    countries.length > 0 && years.length > 0 ? `AND` : '',
    countries.length === 0 && years.length > 0 ? `WHERE` : '',
    years.length > 0 ? `( year=${years[0]}` : '',
    years.length > 1 ? years.slice(1).map(y => `OR year=${y}`) : '',
    years.length > 0 ? `)` : '',
    countries.length === 0 && years.length === 0 && !!type ? `WHERE` : '',
    (countries.length > 0 || years.length > 0) && !!type ? `AND` : '',
    !!type ? `type='${type}'` : '',
    `ORDER BY country, year;`,
  ]
    .flat()
    .join(' ');

const lifeExpsItemFunc = row =>
  console.log(row) || {
    country: row.country,
    year: row.year,
    value: row.value || null,
  };

const buildLifeExpsQueryStr = ({ countries = [], years = [] }) =>
  [
    `SELECT DISTINCT country, year, life_expectancy as value FROM life_expectancy`,
    countries.length > 0 ? `WHERE ( country='${countries[0]}'` : '',
    countries.length > 1
      ? countries.slice(1).map(c => `OR country='${c}'`)
      : '',
    countries.length > 0 ? `)` : '',
    countries.length > 0 && years.length > 0 ? `AND` : '',
    countries.length === 0 && years.length > 0 ? `WHERE` : '',
    years.length > 0 ? `( year=${years[0]}` : '',
    years.length > 1 ? years.slice(1).map(y => `OR year=${y}`) : '',
    years.length > 0 ? `)` : '',
    `ORDER BY country, year;`,
  ]
    .flat()
    .join(' ');

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    diets: (parent, args) =>
      runQuery(
        buildDietsQueryStr(args),
        aggregateItemByYearCountry(dietItemFunc)
      ),
    lifeExpectancies: (parent, args) =>
      runQuery(
        buildLifeExpsQueryStr(args),
        aggregateItemByYearCountry(lifeExpsItemFunc)
      ),
    countries: () =>
      runQuery(`SELECT DISTINCT country FROM diet ORDER BY country ASC`, res =>
        res.rows.map(r => r.country)
      ),
    yearRange: () => ({
      min: runQuery(`SELECT MIN(year) from diet`, res => res.rows[0].min),
      max: runQuery(`SELECT MAX(year) from diet`, res => res.rows[0].max),
    }),
    kcalRange: () => ({
      min: runQuery(
        `SELECT MIN(value) from diet WHERE name='Grand Total - Food supply'`,
        res => res.rows[0].min
      ),
      max: runQuery(
        `SELECT MAX(value) from diet WHERE name='Grand Total - Food supply'`,
        res => res.rows[0].max
      ),
    }),
    names: (parent, args) =>
      runQuery(
        `SELECT DISTINCT name from diet ${
          !!args.type ? `WHERE type='${args.type}'` : ''
        }`,
        res => res.rows.map(r => r.name)
      ),
  },
};

module.exports = { typeDefs, resolvers };
