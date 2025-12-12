const mongoose = require("../db");

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  // Uma escola possui vários cursos
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
}, { timestamps: true });

module.exports = mongoose.model("School", schoolSchema);
