const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = require("./review");

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    // enum: [ "Action", "Adventure", "Drama" ],
    // default: 'Drama'
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: [reviewSchema],
});

const Movie = model("Movie", movieSchema);
module.exports = Movie;
