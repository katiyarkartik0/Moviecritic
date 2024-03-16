const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
    {
        movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
        reviewerName: { type: String },
        rating: { type: Number },
        commment: { type: Number }
    },
    { timestamps: true }
);

const Review = mongoose.model("ShowTime", reviewSchema);

module.exports = Review;