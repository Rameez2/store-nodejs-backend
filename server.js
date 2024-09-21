const PORT = process.env.PORT || 3001;
const express = require('express');
const cors = require('cors');
const authRoutes = require("./src/routes/authRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const productRoutes = require("./src/routes/productRoutes");
const adminProducts = require("./src/routes/admin/AdminProductRoutes");
const adminUsers = require("./src/routes/admin/AdminUserRoutes");
const path = require('path');
require('dotenv').config();
const connectDB = require("./src/config/dbConnection"); // Import the connectDB function

const app = express();

// Allow all origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '/src/public'))); 

// Middlewares
app.use(express.json());

// ROUTERS
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', productRoutes);
// ADMIN ROUTES
app.use('/api/admin', adminProducts);
app.use('/api/admin', adminUsers);


// Try to connect to MongoDB
connectDB().then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
    // Do not exit, just log the error. The function will terminate naturally after handling the request
});

// Start the server (for local testing, on Vercel this is handled per request)
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
