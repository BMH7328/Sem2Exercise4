const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tvshowSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  premiere_year: {
    type: Number,
    required: true,
  },
  end_year: {
    type: Number,
  },
  seasons: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String], // Array
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Tvshow = model("Tvshow", tvshowSchema);
module.exports = Tvshow;
