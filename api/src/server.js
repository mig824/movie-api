const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const MovieAPI = require('./graphql/data-sources/movie-api');
const MovieDB = require('./graphql/data-sources/movie-db');
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

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: 'http://localhost:8888',
  },
});

app.listen(PORT, () => {
  console.log(`\nGraphQL IDE: http://localhost:${PORT}${server.graphqlPath}\n`);
});
