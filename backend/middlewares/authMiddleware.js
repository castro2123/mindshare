// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

function authMiddleware(req, res, next) {
  const token = req.cookies.token; // pega o cookie
  if (!token) return res.status(401).json({ message: 'Acesso negado. Faça login.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // id e role do usuário
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = authMiddleware;
