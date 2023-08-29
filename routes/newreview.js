const express = require("express");
const router = express.Router();

const Newreview = require("../models/newreview");

// get all the reviews (regardless of movie or tvshow)
router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(await Newreview.find().populate("movie").populate("tvshow"));
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// create new review for movie
router.post("/movie/:id", async (req, res) => {
  try {
    // get movie id
    const movie_id = req.params.id;
    // create a new review
    const newReview = new Newreview({
      movie: movie_id,
      username: req.body.username,
      email: req.body.email,
      content: req.body.content,
      rating: req.body.rating,
    });
    // save the review data
    await newReview.save();
    // send out the review data
    res.status(200).send(newReview);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

// create new review for tvshow
router.post("/tvshow/:id", async (req, res) => {
  try {
    // get tvshow id
    const tvshow_id = req.params.id;
    // create a new review
    const newReview = new Newreview({
      tvshow: tvshow_id,
      username: req.body.username,
      email: req.body.email,
      content: req.body.content,
      rating: req.body.rating,
    });
    // save the review data
    await newReview.save();
    // send out the review data
    res.status(200).send(newReview);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
