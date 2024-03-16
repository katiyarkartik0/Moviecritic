const mongoose = require("mongoose");
const Movie = require("../models/movie");
const Review = require("../models/review");

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        console.log(movies)
        return res.status(200).json({ movies });
    } catch (error) {
        return res.status(500).json({ msg: JSON.stringify(error) });
    }
};

const getMovie = async (req, res) => {
    const { movieId } = req.params;
    try {
        const movie = await Movie.findOne({ _id: new mongoose.Types.ObjectId(movieId) });
        return res.status(200).json({ movie });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: JSON.stringify(error) });
    }
};

const createMovie = async (req, res) => {
    const { name, date } = req.body;
    try {
        const movie = new Movie({ name, date });
        movie.save();
        return res.status(200).json({ msg: "Movie created Successfully!" });
    }
    catch (error) {
        return res.status(500).json({ msg: JSON.stringify(error) });
    }
}

const deleteMovie = async (req, res) => {
    const { movieId } = req.params;
    try {
        const { reviews } = await Movie.find({ _id: movieId });
        await Review.deleteMany({ _id: { $in: reviews } })
        await Movie.deleteOne({ _id: movieId })
        return res.status(200).json({ msg: "Movie deleted successfully with corresponding reviews!" });
    }
    catch (error) {
        return res.status(500).json({ msg: JSON.stringify(error) });
    }
}

const updateMovie = async (req, res) => {
    const { _id, name, date } = req.body;
    try {
        await Movie.findByIdAndUpdate(_id, { name, date });
        return res.status(200).json({ msg: "Movie updated Successfully!" });
    }
    catch (error) {
        return res.status(500).json({ msg: JSON.stringify(error) });
    }
}


module.exports = {
    getMovies,
    getMovie,
    deleteMovie,
    updateMovie,
    createMovie
};