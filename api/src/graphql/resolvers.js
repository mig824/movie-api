module.exports = {
  Query: {
    movie: (_, { title }, { dataSources }) => {
      return dataSources.movieAPI.getMovie(title);
    },
    thumbs: (_, { imdb_id }, { dataSources }) => {
      return dataSources.movieDB.getThumbs(imdb_id);
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
        const { imdb_id, title, thumbs_up, thumbs_down } = dbRes;
        return {
          status: 'OK',
          message: 'Thumbs updated successfully',
          updated_doc: { imdb_id, title, thumbs_up, thumbs_down },
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
