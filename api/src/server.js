const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolvers');
const MovieAPI = require('./gql/data-sources/movie-api');
const MovieDB = require('./gql/data-sources/movie-db');
const MovieModel = require('./db/movie-model');
const { API_KEY, MONGO_URI, PORT } = process.env;

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'Liked_Movies',
    });
    console.log('Mongo Connection Status: [ OK ]\n');
  } catch (err) {
    console.log('Mongo Connection Status: [ FAIL ]\n');
    throw new Error(err);
  }
})();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    movieAPI: new MovieAPI(),
    movieDB: new MovieDB(MovieModel),
  }),
  context: () => ({
    apiKey: API_KEY,
  }),
});

(async () => {
  const { url } = await server.listen({ port: PORT });
  console.log(`\nGraphQL IDE --> ${url}\n`);
})();
