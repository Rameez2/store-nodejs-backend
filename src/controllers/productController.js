const Product = require("../models/productSchema");

// Get Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Retrieve all products from the database
        return res.status(200).json(products); // Respond with the products
    } catch (error) {
        console.error('Error retrieving products:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};
