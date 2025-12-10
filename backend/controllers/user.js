const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

// Registro
exports.register = async (req, res) => {
    try {
        const { name, email, password, course } = req.body;

        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email já registrado" });

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar usuário
        const user = new User({ name, email, password: hashedPassword, course });
        await user.save();

        res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica usuário
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Não existe o utilizador!" });

        // Verifica senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Senha incorreta!" });

        // Cria token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

        // Salva token em cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // true se estiver usando HTTPS
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ message: "Login realizado com sucesso", user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProfile = async(req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // não retorna senha
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Logout
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logout realizado com sucesso" });
};
