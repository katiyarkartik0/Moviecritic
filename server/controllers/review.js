const Movie = require("../models/movie");
const Review = require("../models/review");

const getReviews = async (req, res) => {
  const { movieId } = req.params;
  try {
    const { reviews } = await Movie.find({ _id: movieId });
    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const createReview = async (req, res) => {
  const { reviewerName, rating, comment, movieId } = req.body;
  try {
    const review = new Review({ reviewerName, rating, comment, movieId });
    const { _id: reviewId } = review.save();
    await Movie.findByIdAndUpdate(movieId, {
      $push: { reviews: reviewId },
    });

    const { reviews } = await Movie.findById({ _id: movieId });
    const totalating = reviews.reduce(
      (accumulator, { rating }) => accumulator + rating,
      0
    );
    await Movie.findByIdAndUpdate(movieId, {
      averageRating: totalating / reviews.length,
    });
    return res.status(200).json({ msg: "Review created Successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId, movieId } = req.params;
  try {
    await Movie.findByIdAndUpdate(movieId, {
      $pop: { reviews: reviewId },
    });
    await Review.deleteOne({ _id: reviewId });
    const { reviews } = await Movie.findById({ _id: movieId });
    const totalating = reviews.reduce(
      (accumulator, { rating }) => accumulator + rating,
      0
    );
    await Movie.findByIdAndUpdate(movieId, {
      averageRating: totalating / reviews.length,
    });
    return res.status(200).json({ msg: "Review deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const updateReview = async (req, res) => {
  const { reviewerName, rating, comment, movieId } = req.body;
  try {
    await Review.findByIdAndUpdate(movieId, { reviewerName, rating, comment });

    const { reviews } = await Movie.findById({ _id: movieId });
    const totalating = reviews.reduce(
      (accumulator, { rating }) => accumulator + rating,
      0
    );
    await Movie.findByIdAndUpdate(movieId, {
      averageRating: totalating / reviews.length,
    });
    return res.status(200).json({ msg: "Review updated Successfully!" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

module.exports = {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
};
