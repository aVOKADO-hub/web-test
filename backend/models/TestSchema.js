const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    testName: { type: String, required: true },
    testDescription: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, {versionKey:false});

module.exports = mongoose.model('Test', TestSchema);
