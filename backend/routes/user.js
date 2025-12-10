const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // middleware JWT
const userController = require('../controllers/user');

// Rotas de autenticação
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getProfile);
router.post('/logout', userController.logout);

module.exports = router;
