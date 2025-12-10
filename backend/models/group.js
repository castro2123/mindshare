const mongoose = require('../db');

const groupSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    category: String,
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
    date: Date,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
