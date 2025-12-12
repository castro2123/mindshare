const express = require("express");
const router = express.Router();
const SchoolController = require("../controllers/school");
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");

// Apenas admins podem criar escolas
router.post("/", authMiddleware, authorizeRoles("admin"), SchoolController.create);

// Qualquer usuário autenticado pode listar escolas
router.get("/", SchoolController.getAll);
router.get("/:id", authMiddleware, SchoolController.getById);

module.exports = router;
