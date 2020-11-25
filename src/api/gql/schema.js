const { gql } = require('apollo-server');

const typeDefs = gql`
  type Movie {
    id: String
    title: String
    director: String
    actors: [String]
    release_year: String
    description: String
    runtime: String
  }

  type LikeMovieResponse {
    success: Boolean!
    message: String
  }

  type Query {
    movie(title: String!): Movie
  }

  type Mutation {
    like_movie(id: ID!): LikeMovieResponse
  }
`;

module.exports = typeDefs;
