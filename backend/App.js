require('dotenv').config();
const mongoose = require('./db'); 
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Rotas
const authRoutes = require('./routes/user');
const schoolRoutes = require("./routes/school"); 
const courseRoutes = require("./routes/courses");

// Middlewares
app.use(express.json()); // necessário para ler JSON no corpo
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // frontend
  credentials: true
}));

// Conectar ao MongoDB e criar coleções
mongoose.connection.once('open', async () => {
    console.log('MongoDB Atlas conectado com sucesso!');

    const User = require('./models/user');
    const School = require('./models/school');
    const Course = require('./models/courses');
    const Service = require('./models/service');
    const Group = require('./models/group');
    const Exchange = require('./models/exchange');
    const Message = require('./models/message');

    try {
        await User.createCollection();
        await School.createCollection();
        await Course.createCollection();
        await Service.createCollection();
        await Group.createCollection();
        await Exchange.createCollection();
        await Message.createCollection();
        console.log('Todas as coleções criadas com sucesso!');
    } catch (err) {
        console.error('Erro ao criar coleções:', err);
    }
});

// Rotas de autenticação e perfil
app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/courses', courseRoutes);

// Rota pública de teste
app.get('/', (req, res) => {
    res.send('Servidor MindShare funcionando com MongoDB Atlas!');
});

// Middleware de tratamento de erros (opcional, mas recomendado)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
