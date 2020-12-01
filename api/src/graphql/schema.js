const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Movie {
    id: ID!
    imdb_id: String
    title: String
    director: String
    actors: [String]
    release_year: String
    description: String
    runtime: String
  }

  type StoredMovie {
    id: ID!
    imdb_id: String
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
      imdb_id: String!
      title: String!
    ): UpdateThumbsResponse
  }
`;

module.exports = typeDefs;
