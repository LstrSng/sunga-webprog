const User = require('../models/User');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens

const getUserType = (user, fallback = 'viewer') => (user.type || user.role || fallback).toLowerCase();
const createUsername = (user, email) =>
    user.username?.trim() ||
    email.split('@')[0] ||
    `${user.firstName || ''}${user.lastName || ''}`.trim().toLowerCase();

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude the password field
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        // Ensure the password is included in the request body
        if (!req.body.password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const email = req.body.email?.trim().toLowerCase();
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const type = getUserType(req.body, 'editor');
        const username = createUsername(req.body, email);

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the user with the hashed password
        const user = await User.create({
            ...req.body,
            firstName: req.body.firstName?.trim(),
            lastName: req.body.lastName?.trim(),
            age: String(req.body.age || '').trim(),
            gender: req.body.gender?.trim(),
            contactNumber: req.body.contactNumber?.trim(),
            email,
            username,
            type,
            role: type,
            password: hashedPassword,
            address: req.body.address?.trim() || 'N/A',
            isActive: req.body.isActive ?? true
        });

        res.status(201).json(user);
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern || {})[0] || 'account';
            const message =
                field === 'email'
                    ? 'An account with this email already exists.'
                    : 'An account with this username already exists.';

            return res.status(409).json({ message });
        }

        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        // Check if the password is being updated
        if (req.body.password) {
            // Hash the new password
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        // Update the user with the new data
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { password } = req.body;
        const email = req.body.email?.trim().toLowerCase();

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user is active
        if (!user.isActive) {
            return res.status(403).json({
                message: 'Your account is inactive. Please contact support.'
            });
        }

        const userType = getUserType(user);
        if (userType === 'viewer') {
            return res.status(403).json({
                message: 'Viewers are not allowed to log in.'
            });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, type: userType }, // Include type in the token
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            type: userType,
            role: userType,
            firstName: user.firstName
        }); // Include type in the response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};
