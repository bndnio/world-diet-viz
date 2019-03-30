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
    MACRONUTRIENT
    FOODGROUP
    OTHER
  }

  type Item {
    group: Group
    key: String
    value: Int
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
    itemByYearCountry: [YearCountries!]
    itemByCountryYear: [CountryYears!]
  }
`;

const queryString = `SELECT DISTINCT area, year_code, item, value 
  FROM undiet
  WHERE area = 'Canada' AND
    element_code = '664'
  ORDER BY area, year_code;`;

const aggregateItemByCountryYear = res => {
  const { rows } = res;
  const countryGrouped = rows.reduce(
    (acc, row) => ({
      ...acc,
      [row.area]: {
        ...(acc[row.area] || {}),
        [row.year_code]: [
          ...((acc[row.area] && acc[row.area][row.year_code]) || []),
          {
            group: groupMap(row.item),
            key: row.item,
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

const aggregateItemByYearCountry = res => {
  const { rows } = res;
  const yearGrouped = rows.reduce(
    (acc, row) => ({
      ...acc,
      [row.year_code]: {
        ...(acc[row.year_code] || {}),
        [row.area]: [
          ...((acc[row.year_code] && acc[row.year_code][row.area]) || []),
          {
            group: groupMap(row.item),
            key: row.item,
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

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    itemByCountryYear: () => runQuery(queryString, aggregateItemByCountryYear),
    itemByYearCountry: () => runQuery(queryString, aggregateItemByYearCountry),
  },
};

module.exports = { typeDefs, resolvers };
