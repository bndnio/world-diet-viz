const { gql } = require('apollo-server');

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
  }

  type Element {
    group: Group
    key: String
    value: Int
  }

  type YearElement {
    year: Int!
    elements: [Element!]!
  }

  type CountryElement {
    name: String!
    elements: [Element!]!
  }

  type CountryYears {
    country: String!
    years: [YearElement]!
  }

  type YearCountries {
    year: Int!
    countries: [CountryElement!]!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    elementByYearCountry: [YearCountries!]
    elementByCountryYear: [CountryYears!]
  }
`;

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

module.exports = { typeDefs, resolvers };
