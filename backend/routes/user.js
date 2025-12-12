const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

// Registro student/admin
router.post('/register', UserController.register);

// Login
router.post('/login', UserController.login);

// Logout
router.post('/logout', UserController.logout);

// Perfil (autenticado)
router.get('/profile', authMiddleware, UserController.getProfile);

module.exports = router;
