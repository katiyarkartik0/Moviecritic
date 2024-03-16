const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    date: { type: Date },
    reviews:[{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
    averageRating: { type: Number },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

