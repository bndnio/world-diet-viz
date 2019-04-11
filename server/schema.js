const { gql } = require('apollo-server');
const runQuery = require('./db');

const db_items = [
  'Aquatic Plants',
  'Rice (Milled Equivalent)',
  'Olives (including preserved)',
  'Cassava and products',
  'Milk - Excluding Butter',
  'Barley and products',
  'Roots, Other',
  'Population',
  'Sunflower seed',
  'Lemons, Limes and products',
  'Spices, Other',
  'Marine Fish, Other',
  'Offals, Edible',
  'Rape and Mustard Oil',
  'Sweet potatoes',
  'Pimento',
  'Fish, Seafood',
  'Sugar & Sweeteners',
  'Groundnuts (Shelled Eq)',
  'Starchy Roots',
  'Sweeteners, Other',
  'Bananas',
  'Crustaceans',
  'Sugar Crops',
  'Vegetal Products',
  'Mutton & Goat Meat',
  'Cephalopods',
  'Palm kernels',
  'Grand Total',
  'Sorghum and products',
  'Fish, Body Oil',
  'Palmkernel Oil',
  'Soyabeans',
  'Maize and products',
  'Coconuts - Incl Copra',
  'Sesame seed',
  'Oilcrops',
  'Freshwater Fish',
  'Cereals, Other',
  'Vegetables',
  'Wheat and products',
  'Potatoes and products',
  'Oilcrops Oil, Other',
  'Meat',
  'Infant food',
  'Vegetable Oils',
  'Butter, Ghee',
  'Eggs',
  'Rye and products',
  'Vegetables, Other',
  'Demersal Fish',
  'Molluscs, Other',
  'Pulses',
  'Yams',
  'Groundnut Oil',
  'Fruits - Excluding Wine',
  'Offals',
  'Honey',
  'Cottonseed Oil',
  'Oats',
  'Grapefruit and products',
  'Maize Germ Oil',
  'Aquatic Animals, Others',
  'Millet and products',
  'Animal Products',
  'Poultry Meat',
  'Peas',
  'Alcohol, Non-Food',
  'Meat, Aquatic Mammals',
  'Beverages, Alcoholic',
  'Cloves',
  'Ricebran Oil',
  'Dates',
  'Tomatoes and products',
  'Wine',
  'Sesameseed Oil',
  'Cottonseed',
  'Sugar non-centrifugal',
  'Beer',
  'Sunflowerseed Oil',
  'Cream',
  'Plantains',
  'Pelagic Fish',
  'Treenuts',
  'Grapes and products (excl wine)',
  'Aquatic Products, Other',
];

const FoodGroup = [
  'Cereals and grains',
  'Pulses',
  'Starchy roots',
  'Fruits and vegetables',
  'Oils & fats',
  'Sugar',
  'Meat',
  'Dairy & eggs',
  'Alcoholic beverages',
];

const groupMap = item => {
  // if (FoodGroup.includes(item)) return 'FOODGROUP';
  // else return 'OTHER';
  return 'OTHER';
};

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

  type Item {
    country: String!
    year: Int!
    type: Group!
    key: String!
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
  }
`;

const queryString = `SELECT DISTINCT country, year, type, name, value 
  FROM diet
  WHERE country='Canada'
  ORDER BY country, year;`;

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
            key: row.name,
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
            key: row.name,
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
    itemByYearCountry(parent, args) {
      return runQuery(buildQueryStr(args), aggregateItemByYearCountry);
    },
    itemByCountryYear: args =>
      runQuery(
        `SELECT DISTINCT country, year, type, name, value FROM diet ` +
          args.countries.length >
          0 &&
          `WHERE country='${args.countries[0]}' ${args.countries.length > 1 &&
            args.countries.slice(1).map(c => `OR country='${c}' `)}` +
            `ORDER BY country, year;`,
        aggregateItemByCountryYear
      ),
    countries() {
      return runQuery(`SELECT DISTINCT country FROM diet`, res =>
        res.rows.map(r => r.country)
      );
    },
  },
};

module.exports = { typeDefs, resolvers };
