const User = require('../models/user');
const School = require('../models/school');
const Course = require('../models/courses');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ChaveSecreta';


// =========================
// 📌 REGISTO
// =========================
exports.register = async (req, res) => {
    try {
        const { name, email, password, school, course, role } = req.body;

        // Verifica se já existe usuário com o email
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email já registado" });

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'student', 
            school: school || null,
            course: course || null
        });

        // Se for student, valida escola e curso
        // Se for student, valida escola e curso
        if (user.role === 'student') {
            // Verifica escola
            const schoolFound = await School.findById(school);
            if (!schoolFound)
                return res.status(400).json({ message: "Escola inválida" });

            // Verifica curso
            const courseFound = await Course.findById(course);
            if (!courseFound)
                return res.status(400).json({ message: "Curso inválido" });

            // Verifica se o curso pertence à escola
            if (courseFound.school.toString() !== schoolFound._id.toString()) {
                return res.status(400).json({
                    message: "O curso selecionado não pertence à escola informada"
                });
            }
        }


        await user.save();
        res.status(201).json({ message: "Utilizador registado com sucesso", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// =========================
// 📌 LOGIN
// =========================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica usuário
        const user = await User.findOne({ email }).populate("school course");
        if (!user)
            return res.status(400).json({ message: "Não existe o utilizador!" });

        // Verifica senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Senha incorreta!" });

        // Cria token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Salva token em cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            message: "Login realizado com sucesso",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                school: user.school,
                course: user.course
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// =========================
// 📌 PERFIL
// =========================
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate("school course");

        if (!user)
            return res.status(404).json({ message: 'Utilizador não encontrado' });

        res.json(user);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// =========================
// 📌 LOGOUT
// =========================
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logout realizado com sucesso" });
};
