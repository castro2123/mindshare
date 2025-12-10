const mongoose = require('../db');

const exchangeSchema = new mongoose.Schema({
    service_offer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    service_request_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    scheduled_date: Date,
    status: { type: String, enum: ['pending', 'confirmed', 'canceled', 'completed'], default: 'pending' },
    rating: { type: Number, min: 0, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Exchange', exchangeSchema);
