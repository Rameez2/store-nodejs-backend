const PORT = process.env.PORT || 3001;
const express = require('express');
const cors = require('cors');
const authRoutes = require("./src/routes/authRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const path = require('path');
require('dotenv').config();
const connectDB = require("./src/config/dbConnection"); // Import the connectDB function

const app = express();

// Allow all origins
app.use(cors({
    origin: '*',  // Allows requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Specify allowed methods if needed
    allowedHeaders: ['Content-Type', 'Authorization'],  // Specify allowed headers if needed
    optionsSuccessStatus: 200  // For legacy browser support
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '/src/public')));

// Middlewares
app.use(express.json())

// ROUTERS
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);

// Connect to MongoDB and start the server only if the connection succeeds
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Failed to connect to the database. Server not started.");
    process.exit(1);  // Exit process with failure code if DB connection fails
});
