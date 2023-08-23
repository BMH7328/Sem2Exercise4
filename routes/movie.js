const express = require("express");
const router = express.Router();

// import model into router
const Movie = require("../models/movie");

/* list all the movies */
router.get("/", async (req, res) => {
  const { genre, rating, release_year } = req.query;
  let filter = {};
  /* old method */
  // if (genre) {
  //   list = await Movie.find({ genre: genre });
  // } else if (rating) {
  //   list = await Movie.find({ rating: { $gt: rating } });
  // } else if (release_year) {
  //   list = await Movie.find({ release_year: { $gt: release_year } });
  // } else {
  //   list = await Movie.find();
  // }

  /* better filtering method */
  if (genre || rating || release_year) {
    if (genre) {
      filter.genre = genre; // { genre: genre }
    }
    if (rating) {
      filter.rating = { $gt: rating }; // { rating: { $gt: rating } }
    }
    if (release_year) {
      filter.release_year = { $gt: release_year }; // { release_year: { $gt: release_year } }
    }
  }

  res.send(await Movie.find(filter));
});

/* get specific movie by id */
router.get("/:id", async (req, res) => {
  const data = await Movie.findOne({ _id: req.params.id });
  res.send(data);
});

/* create new movie route */
router.post("/", async (req, res) => {
  // create a placeholder for a new movie
  const newMovie = new Movie({
    title: req.body.title,
    director: req.body.director,
    release_year: req.body.release_year,
    genre: req.body.genre,
    rating: req.body.rating,
  });
  // save the movie into mongodb
  await newMovie.save();
  res.send(newMovie);
});

/* update a movie */
router.put("/:id", async (req, res) => {
  // get movie id
  const movie_id = req.params.id;
  // update the movie
  const updatedMovie = await Movie.findByIdAndUpdate(movie_id, req.body, {
    // new: true, // return the modified data
  });
  res.send(updatedMovie);
});

/* delete a movie */
router.delete("/:id", async (req, res) => {
  // get movie id
  const movie_id = req.params.id;
  // delete the movie
  const deletedMovie = await Movie.findByIdAndDelete(movie_id);
  res.send(deletedMovie);
});

module.exports = router;
