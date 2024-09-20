const PORT = process.env.PORT || 3001;
const express = require('express');
const cors = require('cors');
const authRoutes = require("./src/routes/authRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
// const verificationRoutes = require("./src/routes/verificationRoute");
// const adminRoutes = require("./src/routes/adminRoutes");
const path = require('path');
require('dotenv').config();
// DB Connection
require("./src/config/dbConnection")();

const app = express();

// Enable CORS for all routes
app.use(cors());


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '/src/public')));

// Middlewares
app.use(express.json())

// ROUTERS
app.use('/api/auth',authRoutes);

app.use('/api',profileRoutes);

// app.use('/api',verificationRoutes);

// app.use('/api/admin',adminRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
