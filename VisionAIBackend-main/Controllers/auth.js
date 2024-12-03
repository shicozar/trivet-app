const crypto = require('crypto')
const secretKey = process.env.secretKey;
const Customer = require('../Models/Customer')
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const foundUser = await Customer.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await foundUser.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const data = {
            user: { id: foundUser._id }
        };
        const authToken = jwt.sign(data, secretKey, { expiresIn: '1h' });

        res.status(200).json({ success: true, authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};