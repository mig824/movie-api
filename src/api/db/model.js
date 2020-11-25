const { connect, model, Schema, String, Number } = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

(async () => {
  try {
    await connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'LikedMovies',
    });
    console.log('Connection Status: [ OK ]');
  } catch (err) {
    console.log('Connection Status: [ FAIL ]');
    throw new Error(err);
  }
})();

const MovieSchema = new Schema({
  imdb_id: { type: String, required: true },
  title: { type: String, required: true },
  thumbs_up: Number,
  thumbs_down: Number,
});

module.exports = model('Movie', MovieSchema);
