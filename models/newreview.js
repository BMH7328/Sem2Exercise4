const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const newreviewSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
  },
  tvshow: {
    type: Schema.Types.ObjectId,
    ref: "Tvshow",
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  content: String, // short-hand
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // current_timestamp in mysql
  },
});

const Newreview = model("Newreview", newreviewSchema);
module.exports = Newreview;
