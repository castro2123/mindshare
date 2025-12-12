const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/course");
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");

// Apenas admins podem criar cursos
router.post("/", authMiddleware, authorizeRoles("admin"), CourseController.create);

// Qualquer usuário autenticado pode listar cursos
router.get("/", authMiddleware, CourseController.getAll);
router.get("/byschool/:schoolId", CourseController.getBySchool);

module.exports = router;
