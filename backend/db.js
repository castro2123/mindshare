const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO;

mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB Atlas connected successfully');
});

module.exports = mongoose;

//npm install mongodb