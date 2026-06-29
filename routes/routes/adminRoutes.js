const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add a new product (Admin Only Placeholder)
router.post('/products', async (req, res) => {
    const { title, description, price, image, category } = req.body;
    try {
        const newProduct = new Product({ title, description, price, image, category });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
