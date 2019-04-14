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

  type IntRange {
    min: Int!
    max: Int!
  }

  type FloatRange {
    min: Float!
    max: Float!
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

  type YearCountriesAll {
    year: Int!
    countries: [CountryAll!]!
  }

  type CountryAll {
    country: String!
    items: [All!]!
  }

  type All {
    country: String!
    year: Int!
    type: Group!
    name: String!
    value: Float!
    lifeExp: Float
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    diets(
      years: [Int!]
      countries: [String!]
      type: Group
    ): [YearCountriesDiet!]

    lifeExps(years: [Int!], countries: [String!]): [YearCountriesLifeExp!]

    alls(years: [Int!], countries: [String!], type: Group): [YearCountriesAll!]

    countries: [String!]!
    names(type: Group): [String!]!

    yearRange: IntRange!
    kcalRange: FloatRange!
    lifeExpRange(countries: [String!]): FloatRange!
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
    `ORDER BY country, year`,
  ]
    .flat()
    .join(' ');

const lifeExpItemFunc = row => ({
  country: row.country,
  year: row.year,
  value: row.life_expectancy || null,
});

const buildLifeExpsQueryStr = ({ countries = [], years = [] }) =>
  [
    `SELECT DISTINCT country, year, life_expectancy FROM life_expectancy`,
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
    `ORDER BY country, year`,
  ]
    .flat()
    .join(' ');

const allItemFunc = row => ({
  country: row.country,
  year: row.year,
  type: row.type,
  name: row.name,
  value: row.value,
  lifeExp: row.life_expectancy,
});

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    diets: (parent, args) =>
      runQuery(
        buildDietsQueryStr(args),
        aggregateItemByYearCountry(dietItemFunc)
      ),
    lifeExps: (parent, args) =>
      runQuery(
        buildLifeExpsQueryStr(args),
        aggregateItemByYearCountry(lifeExpItemFunc)
      ),
    alls: (parent, args) =>
      runQuery(
        `SELECT DISTINCT d.country as country, d.year as year, d.type as type, d.name as name, d.value as value, le.life_expectancy as life_expectancy FROM (${buildDietsQueryStr(
          args
        )}) d INNER JOIN (${buildLifeExpsQueryStr(
          args
        )}) le ON d.country=le.country AND d.year=le.year`,
        aggregateItemByYearCountry(allItemFunc)
      ),
    countries: () =>
      runQuery(`SELECT DISTINCT country FROM diet ORDER BY country ASC`, res =>
        res.rows.map(r => r.country)
      ),
    names: (parent, args) =>
      runQuery(
        `SELECT DISTINCT name from diet ${
          !!args.type ? `WHERE type='${args.type}'` : ''
        }`,
        res => res.rows.map(r => r.name)
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
    lifeExpRange: (parent, args) => ({
      min: runQuery(
        `SELECT MIN(life_expectancy) from (${buildLifeExpsQueryStr(
          args
        )}) AS SUBQUERY`,
        res => res.rows[0].min
      ),
      max: runQuery(
        `SELECT MAX(life_expectancy) from (${buildLifeExpsQueryStr(
          args
        )})  AS SUBQUERY`,
        res => res.rows[0].max
      ),
    }),
  },
};

module.exports = { typeDefs, resolvers };
