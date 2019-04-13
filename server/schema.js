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

  type Item {
    country: String!
    year: Int!
    type: Group!
    name: String!
    value: Float!
  }

  type YearItem {
    year: Int!
    items: [Item!]!
  }

  type CountryItem {
    country: String!
    items: [Item!]!
  }

  type CountryYears {
    country: String!
    years: [YearItem]!
  }

  type YearCountries {
    year: Int!
    countries: [CountryItem!]!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    itemByYearCountry(
      years: [Int!]
      countries: [String!]
      type: Group
    ): [YearCountries!]
    itemByCountryYear(
      countries: [String!]
      years: [Int!]
      type: Group
    ): [CountryYears!]
    countries: [String!]!
    yearRange: Range!
    kcalRange: Range!
    names(type: Group): [String!]!
  }
`;

const aggregateItemByYearCountry = res => {
  const { rows } = res;
  const yearGrouped = rows.reduce(
    (acc, row) => ({
      ...acc,
      [row.year]: {
        ...(acc[row.year] || {}),
        [row.country]: [
          ...((acc[row.year] && acc[row.year][row.country]) || []),
          {
            country: row.country,
            year: row.year,
            type: row.type,
            name: row.name,
            value: row.value,
          },
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

const aggregateItemByCountryYear = res => {
  const { rows } = res;
  const countryGrouped = rows.reduce(
    (acc, row) => ({
      ...acc,
      [row.country]: {
        ...(acc[row.country] || {}),
        [row.year]: [
          ...((acc[row.country] && acc[row.country][row.year]) || []),
          {
            country: row.country,
            year: row.year,
            type: row.type,
            name: row.name,
            value: row.value,
          },
        ],
      },
    }),
    {}
  );
  const output = Object.entries(countryGrouped).map(([country, years]) => ({
    country,
    years: Object.entries(years).map(([year, items]) => ({
      year,
      items,
    })),
  }));
  return output;
};

const buildQueryStr = ({ countries = [], years = [], type = '' }) =>
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

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    itemByYearCountry: (parent, args) =>
      runQuery(buildQueryStr(args), aggregateItemByYearCountry),
    itemByCountryYear: (parent, args) =>
      runQuery(buildQueryStr(args), aggregateItemByCountryYear),
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
