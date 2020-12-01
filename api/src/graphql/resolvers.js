module.exports = {
  Query: {
    movie: (_, { title }, { dataSources }) => {
      return dataSources.movieAPI.getMovie(title);
    },
    stored_movies: (_, __, { dataSources }) => {
      return dataSources.movieDB.getStoredMovies();
    },
  },
  Mutation: {
    update_thumbs: async (_, { is_liked, imdb_id, title }, { dataSources }) => {
      const dbRes = await dataSources.movieDB.updateThumbs(
        is_liked,
        imdb_id,
        title
      );

      if (dbRes) {
        return {
          status: 'OK',
          message: 'Thumbs updated successfully',
          modified_doc: {
            id: dbRes.imdb_id,
            imdb_id: dbRes.imdb_id,
            title: dbRes.title,
            thumbs_up: dbRes.thumbs_up,
            thumbs_down: dbRes.thumbs_down,
          },
        };
      } else {
        return {
          status: 'FAIL',
          message: 'Failed to update thumbs',
        };
      }
    },
  },
};
