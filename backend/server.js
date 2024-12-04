const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);  // Register the routes

const PORT = process.env.PORT||5000;
const DB_URI = "mongodb://localhost:27017/automatedTesting";

// MongoDB connection
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
