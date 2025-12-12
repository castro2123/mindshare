const School = require("../models/school");

module.exports = {
  async create(req, res) {
    try {
      const school = await School.create(req.body);
      res.json(school);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    const schools = await School.find().populate("courses");
    res.json(schools);
  },

  async getById(req, res) {
    const school = await School.findById(req.params.id).populate("courses");
    if (!school) return res.status(404).json({ error: "Escola não encontrada" });
    res.json(school);
  }
};
