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

  type MovieThumbs {
    imdb_id: String
    title: String
    thumbs_up: Int
    thumbs_down: Int
  }

  type UpdateThumbsResponse {
    status: String!
    message: String
    updated_doc: MovieThumbs
  }

  type Query {
    movie(title: String!): Movie
    thumbs(imdb_id: ID!): MovieThumbs
  }

  type Mutation {
    update_thumbs(
      is_liked: Boolean!
      imdb_id: ID!
      title: String!
    ): UpdateThumbsResponse
  }
`;

module.exports = typeDefs;
