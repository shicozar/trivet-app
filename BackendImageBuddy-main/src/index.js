const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('../routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err));
