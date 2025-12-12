const Course = require("../models/courses");
const School = require("../models/school");

module.exports = {
  async create(req, res) {
    try {
      const { name, school } = req.body;

      // Verifica se a escola existe
      const schoolFound = await School.findById(school);
      if (!schoolFound) return res.status(404).json({ error: "Escola não encontrada" });

      // Cria o curso
      const course = await Course.create({ name, school });

      // Adiciona o curso na escola
      schoolFound.courses.push(course._id);
      await schoolFound.save();

      res.json(course);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    const courses = await Course.find().populate("school");
    res.json(courses);
  },

  async getBySchool(req, res) {
    const courses = await Course.find({ school: req.params.schoolId });
    res.json(courses);
  }
};
