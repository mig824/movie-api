module.exports = {
  Query: {
    movie: (_, { title }, { dataSources }) =>
      dataSources.movieAPI.getMovie(title),
  },
};
