const User = require('../models/userSchema');

const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Fetch the user from the database
        const user = await User.findById(userId);
        // console.log(user);
        
        // Check if the user exists and has the admin role
        if (user && user.role.includes('admin')) {
            return next(); // User is admin, proceed to the next middleware/route handler
        }

        // User is not admin
        return res.status(403).json({ error: 'Access denied: Admins only' });
    } catch (error) {
        console.error('Error checking admin role:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = isAdmin;