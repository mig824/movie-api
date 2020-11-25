const { MongoDataSource } = require('apollo-datasource-mongodb');

class MovieDB extends MongoDataSource {
  async getMovie(imdbID) {
    try {
      const movie = await this.model.find({ imdb_id: imdbID });
      console.log(movie);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async updateThumbs(liked, imdbID) {
    try {
      if (liked) {
        const dbRes = await this.model.updateOne(
          { imdb_id: imdbID },
          { $inc: { thumbs_up: 1 } }
        );
        console.log('%s docs modified', dbRes.nModified);
      } else {
        const dbRes = await this.model.updateOne(
          { imdb_id: imdbID },
          { $inc: { thumbs_down: 1 } }
        );
        console.log('%s docs modified', dbRes.nModified);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}

module.exports = MovieDB;
