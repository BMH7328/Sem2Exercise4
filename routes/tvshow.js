const express = require("express");
const router = express.Router();

// import model into router
const tvshow = require("../models/tvshow");

/* list all the movies */
router.get("/", async (req, res) => {
  const { genre, rating, premiere_year } = req.query;
  let filter = {};
  /* better filtering method */
  if ([genre] || rating || premiere_year) {
    if (genre) {
      filter.genre = genre; // { genre: genre }
    }
    if (rating) {
      filter.rating = { $gt: rating }; // { rating: { $gt: rating } }
    }
    if (premiere_year) {
      filter.premiere_year = { $gt: premiere_year }; // { release_year: { $gt: release_year } }
    }
  }

  res.send(await tvshow.find(filter));
});

router.get("/:id", async (req, res) => {
  const onetvshow = await tvshow.findOne({ _id: req.params.id });
  res.send(onetvshow);
});

module.exports = router;
