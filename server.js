const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// Payment Gateway Placeholder Route
app.post('/api/checkout/process-payment', (req, res) => {
    const { amount, phone, paymentMethod } = req.body;
    res.status(200).json({
        success: true,
        message: 'Payment endpoint hit. Integrate Telebirr/CBE Birr/Stripe here.'
    });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
