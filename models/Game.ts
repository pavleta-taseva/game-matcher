import { Schema, model, models } from 'mongoose';

const GameSchema = new Schema(
  {
    id: { type: String },
    added: { type: Number },
    background_image: String,
    genres: [{ id: Number, name: String, slug: String }],
    metacritic: Number,
    name: String,
    parent_platforms: [
      { platform: { id: Number, name: String, slug: String } },
    ],
    platforms: [{ platform: { id: Number, name: String, slug: 'String' } }],
    playtime: Number,
    rating: Number,
    rating_top: Number,
    ratings: [{ id: Number, title: String, count: Number, percent: Number }],
    ratings_count: Number,
    released: String,
    reviews_count: Number,
    score: Number,
    short_screenshots: [{ id: Number, image: String }],
    slug: String,
    stores: [{ store: { id: Number, name: String, slug: String } }],
    tags: [
      {
        id: Number,
        name: String,
        slug: String,
        language: String,
        games_count: Number,
      },
    ],
    addedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    updated: String,
  },
  {
    timestamps: true,
  }
);

const Game = models.Game || model('Game', GameSchema);

export default Game;
