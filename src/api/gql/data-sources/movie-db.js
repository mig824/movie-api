const { MongoDataSource } = require('apollo-datasource-mongodb');

class MovieDB extends MongoDataSource {
  async getThumbs(imdbID) {
    try {
      const movie = await this.model.find({ imdb_id: imdbID });
      const { imdb_id, title, thumbs_down, thumbs_up } = movie[0];
      return {
        imdb_id,
        title,
        thumbs_up,
        thumbs_down,
      };
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
