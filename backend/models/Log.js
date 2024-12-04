const mongoose = require('mongoose');

// Define the Log schema
const logSchema = new mongoose.Schema({
    url: { type: String, required: true },
    vulnerability: { type: [String], default: [] },  // Array to store vulnerabilities detected
    status: { type: String, required: true },
    payload: { type: String, default: "" },  // Store the payload used for testing
    testedAt: { type: Date, default: Date.now }  // Automatically store the current date/time
}, {versionKey:false});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
