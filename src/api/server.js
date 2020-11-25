const { ApolloServer } = require('apollo-server');
const typeDefs = require('./gql/schema');
require('dotenv').config();

const resolvers = require('./gql/resolvers');
const MovieAPI = require('./gql/data-sources/movie-api');
const API_KEY = process.env.API_KEY;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    movieAPI: new MovieAPI(),
  }),
  context: () => ({
    apiKey: API_KEY,
  }),
});

(async () => {
  const { url } = await server.listen();
  console.log(`\nGraphQL IDE --> ${url}\n`);
})();
