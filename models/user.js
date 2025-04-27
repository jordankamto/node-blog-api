const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
    },
    userPosts: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
