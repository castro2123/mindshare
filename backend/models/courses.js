const mongoose = require("../db");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
