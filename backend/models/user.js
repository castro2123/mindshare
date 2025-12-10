const mongoose = require('../db');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    course: String,
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    reputation: { type: Number, default: 0 },
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exchange' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
