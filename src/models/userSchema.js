const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique constraint for emails
  password: { type: String, required: true }, // Required field for password
  profileImage: { type: String }, // profileImage location
  gender: { type: String, enum: ['male', 'female', 'other'] },
  verificationStatus: { type: String, enum: ['not_verified', 'verified'], default: 'not_verified' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Roles as an array of strings, default to 'user'
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
  },
  createdAt: { type: Date, default: Date.now } // Auto-generated creation timestamp
});

module.exports = mongoose.model('users', userSchema);