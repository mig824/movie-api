const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String
    director: String
    actors: [String]
    release_year: String
    description: String
    runtime: String
  }

  type StoredMovie {
    id: ID!
    title: String
    thumbs_up: Int
    thumbs_down: Int
  }

  type UpdateThumbsResponse {
    status: String!
    message: String
    modified_doc: StoredMovie
  }

  type Query {
    movie(title: String!): Movie
    stored_movies: [StoredMovie]
  }

  type Mutation {
    update_thumbs(
      is_liked: Boolean!
      id: ID!
      title: String!
    ): UpdateThumbsResponse
  }
`;

module.exports = typeDefs;
