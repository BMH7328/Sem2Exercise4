const express = require("express");
const router = express.Router();

// import model into router
const Tvshow = require("../models/tvshow");

/* list all the tvshows */
router.get("/", async (req, res) => {
  const { premiere_year, genre, rating } = req.query;
  let filter = {};
  if (genre || rating || premiere_year) {
    if (genre) {
      filter.genre = { $in: genre.split(",") }; // { genre: { $in: genre } }
    }
    if (rating) {
      filter.rating = { $gt: rating }; // { rating: { $gt: rating } }
    }
    if (premiere_year) {
      filter.premiere_year = { $gt: premiere_year }; // { premiere_year: { $gt: release_year } }
    }
  }
  const list = await Tvshow.find(filter);
  res.send(list);
});

/* get specific tvshow by id */
router.get("/:id", async (req, res) => {
  const data = await Tvshow.findOne({ _id: req.params.id });
  res.send(data);
});

router.post("/", async (req, res) => {
  // create a placeholder for a new movie
  const newTvshow = new Tvshow({
    title: req.body.title,
    creator: req.body.creator,
    premiere_year: req.body.premiere_year,
    end_year: req.body.end_year,
    seasons: req.body.seasons,
    genre: req.body.genre,
    rating: req.body.rating,
  });
  // save the movie into mongodb
  await newTvshow.save();
  res.send(newTvshow);
});

router.put("/:id", async (req, res) => {
  // get movie id
  const tvshow_id = req.params.id;
  // update the movie
  const updatedTvshow = await Tvshow.findByIdAndUpdate(tvshow_id, req.body, {
    // new: true, // return the modified data
  });
  res.send(updatedTvshow);
});

router.delete("/:id", async (req, res) => {
  // get movie id
  const tvshow_id = req.params.id;
  // delete the movie
  const deletedTvshow = await Tvshow.findByIdAndDelete(tvshow_id);
  res.send(deletedTvshow);
});

module.exports = router;
