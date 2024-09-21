const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      category: {
        type: String,
        required: true,
        trim: true
      },
      stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
      },
      imageUrl: {
        type: String,
        trim: true
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'users',
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
});

productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('products', productSchema);