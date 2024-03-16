const express = require("express");
const reviewRoutes = express.Router();
const bodyParser = require("body-parser");
const { getReviews, updateReview, deleteReview, createReview } = require("../controllers/review");

reviewRoutes.use(bodyParser.urlencoded({ extended: false }));
reviewRoutes.use(bodyParser.json());

reviewRoutes.get("/getReviews/:movieId", getReviews);
reviewRoutes.put("/updateReview", updateReview)
reviewRoutes.delete("/deleteReview/:movieId", deleteReview)
reviewRoutes.post("/createReview", createReview)

module.exports = { reviewRoutes };