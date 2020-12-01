const { MongoDataSource } = require('apollo-datasource-mongodb');

class MovieDB extends MongoDataSource {
  async getStoredMovies() {
    try {
      const movies = await this.model.find({});

      return movies.map(({ imdb_id, title, thumbs_down, thumbs_up }) => ({
        id: imdb_id,
        imdb_id,
        title,
        thumbs_down,
        thumbs_up,
      }));
    } catch (err) {
      console.log(err);

      throw new Error(err);
    }
  }

  async updateThumbs(isLiked, imdb_id, title) {
    try {
      if (isLiked) {
        const dbRes = await this.model.findOneAndUpdate(
          { imdb_id, title },
          { $inc: { thumbs_up: 1 } },
          { new: true, upsert: true, useFindAndModify: false }
        );
        console.log(dbRes.thumbs_up, 'thumbs up!');

        return dbRes;
      } else {
        const dbRes = await this.model.findOneAndUpdate(
          { imdb_id, title },
          { $inc: { thumbs_down: 1 } },
          { new: true, upsert: true, useFindAndModify: false }
        );
        console.log(dbRes.thumbs_down, 'thumbs down!');

        return dbRes;
      }
    } catch (err) {
      console.log(err);

      throw new Error(err);
    }
  }
}

module.exports = MovieDB;
