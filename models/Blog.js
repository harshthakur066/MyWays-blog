const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const blogSchema = new mongoose.Schema({
  name: String,
  userId: String,
  image: String,
  summary: String,
  content: String,
  likes: { type: Number, default: 0, min: 0 },
  comments: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Blog", blogSchema);
