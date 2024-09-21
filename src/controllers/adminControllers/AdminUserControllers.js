const User = require("../../models/userSchema");

// Get User
exports.AdminGetUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find({}, '-password'); // Exclude password field from the result

        // If no users are found
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        return res.status(200).json({ msg: 'Users retrieved successfully', users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Update User
exports.AdminUpdateUser = async (req, res) => {
    const { userId, name, email, role } = req.body; // Get ID and updated values from the request body

    try {
        // Find the user by ID
        let user = await User.findById(userId);

        // If the user isn't found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the fields only if they are provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role; // Only allow admins to change the role

        // Save the updated user to the database
        await user.save();

        return res.status(200).json({ msg: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Delete User
exports.AdminDeleteUser = async (req, res) => {
    const { id } = req.params; // Get the user ID from request params

    try {
        // Find the user by ID and delete them
        const deletedUser = await User.findByIdAndDelete(id);

        // If the user wasn't found
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ msg: 'User deleted successfully', user: deletedUser });

    } catch (error) {
        console.error('Error deleting user:', error.message);
        return res.status(500).json({ error: 'Server error' });
    }
};
