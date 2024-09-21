const Product = require("../../models/productSchema");

// Get Products
exports.AdminGetProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Retrieve all products from the database
        return res.status(200).json(products); // Respond with the products
    } catch (error) {
        console.error('Error retrieving products:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Upload Product
exports.AdminUploadProduct = async (req, res) => {
    try {
        // Validate the required fields from the request body
        const { name, description, price, category, stock, imageUrl } = req.body;

        // Basic validation
        if (!name || !price || !category || stock === undefined) {
            return res.status(400).json({ error: 'Please provide all required fields: name, price, category, stock' });
        }

        // Create a new product
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
            userId: req.user._id
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Return success response
        return res.status(201).json({ msg: 'Product uploaded successfully', product: savedProduct });

    } catch (error) {
        console.error('Error uploading product:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Update Product
exports.AdminUpdateProduct = async (req, res) => {
    const { productId , name, description, price, category, stock, imageUrl } = req.body; // Get ID and new values from request body

    try {
        // Construct an object with only the fields that are provided
        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = price;
        if (category) updateData.category = category;
        if (stock !== undefined) updateData.stock = stock; // Include stock if explicitly provided
        if (imageUrl) updateData.imageUrl = imageUrl;

        // Find the product by ID and update it with the new values
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true } // Options: return the updated document and run validation
        );

        // If the product wasn't found
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ msg: 'Product updated successfully', product: updatedProduct });

    } catch (error) {
        console.error('Error updating product:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Delete Product
exports.AdminDeleteProduct = async (req, res) => {
    const { id } = req.params; // Get product ID from request parameters

    try {
        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(id);

        // If the product wasn't found
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ msg: 'Product deleted successfully', product: deletedProduct });

    } catch (error) {
        console.error('Error deleting product:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};