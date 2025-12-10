const mongoose = require('../db');

const messageSchema = new mongoose.Schema({
    exchange_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Exchange' },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
