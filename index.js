import { ApolloServer, gql } from 'apollo-server';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID
    title: String
    author: String
    year: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`;
const dataSource = [
  { id: '1', title: 'The Awakening', author: 'Kate Chopin', year: 1894 },
  { id: '2', title: 'City of Glass', author: 'Paul Auster', year: 1925 },
  { id: '3', title: 'War & Peace', author: 'Tolstoy', year: 1869 },
  {
    id: '4',
    title: 'The Great  Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
  },
];
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => dataSource,
    book: (parent, args) => dataSource.find((book) => book.id === args.id),
  },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
