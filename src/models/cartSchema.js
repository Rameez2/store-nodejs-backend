const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Cart Item schema
const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId, // Reference to the Product model
    ref: 'products',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
}, { _id: false }); // Prevents creating an extra _id for each item

// Define Cart schema
const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // Reference to the User model
    ref: 'users',
    required: true
  },
  items: [cartItemSchema], // Array of cart items
  // totalPrice: {
  //   type: Number,
  //   required: true,
  //   default: 0 // Can be calculated using middleware or business logic
  // },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update `updatedAt` before save
cartSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the Cart model
module.exports = mongoose.model('carts', cartSchema);
