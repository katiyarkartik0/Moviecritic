const express = require("express");
const movieRoutes = express.Router();
const bodyParser = require("body-parser");
const { getMovies, getMovie, updateMovie, deleteMovie, createMovie } = require("../controllers/movie");

movieRoutes.use(bodyParser.urlencoded({ extended: false }));
movieRoutes.use(bodyParser.json());

movieRoutes.get("/getAll", getMovies);
movieRoutes.get("/get/:movieId", getMovie);
movieRoutes.put("/update", updateMovie)
movieRoutes.delete("/delete/:movieId", deleteMovie)
movieRoutes.post("/create", createMovie)

module.exports = { movieRoutes };