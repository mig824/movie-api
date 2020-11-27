const { model, Schema } = require('mongoose');

const MovieSchema = new Schema(
  {
    imdb_id: { type: String, required: true },
    title: { type: String, required: true },
    thumbs_up: { type: Number, min: 0, default: 0 },
    thumbs_down: { type: Number, min: 0, default: 0 },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = model('Movie', MovieSchema);
