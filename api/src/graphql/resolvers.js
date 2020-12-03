module.exports = {
  Query: {
    movie: async (_, { title }, { dataSources }) => {
      const {
        Title,
        Director,
        Actors,
        Released,
        Plot,
        imdbID,
        Runtime,
      } = await dataSources.movieAPI.getMovie(title);

      return {
        id: imdbID,
        title: Title,
        director: Director,
        actors: Actors === 'N/A' || undefined ? [] : Actors.split(', '),
        release_year: Released,
        description: Plot,
        runtime: Runtime,
      };
    },
    stored_movies: async (_, __, { dataSources }) => {
      const movies = await dataSources.movieDB.getStoredMovies();

      return movies.map(({ imdb_id, title, thumbs_down, thumbs_up }) => ({
        id: imdb_id,
        title,
        thumbs_down,
        thumbs_up,
      }));
    },
  },
  Mutation: {
    update_thumbs: async (_, { is_liked, id, title }, { dataSources }) => {
      const dbRes = await dataSources.movieDB.updateThumbs(is_liked, id, title);

      if (dbRes) {
        return {
          status: 'OK',
          message: 'Thumbs updated successfully',
          modified_doc: {
            id: dbRes.imdb_id,
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
