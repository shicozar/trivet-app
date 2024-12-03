const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Image = require('../models/Image');

const JWT_SECRET = "HimanshuDangwal"

// Signup
const signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ email, password: hashedPassword });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created!', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Login
// const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found!' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials!' });
//         }

//         const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ message: 'Logged in successfully!', token });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Something went wrong' });
//     }
// };

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).populate('images'); // Populate images associated with the user
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log("Logged in successfully");
        res.status(200).json({
            message: 'Logged in successfully!',
            token,
            images: user.images, // Include user's images in the response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


// Fetch user images
const fetchImages = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('images');
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json({ images: user.images });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch images' });
    }
};

// Upload image (for demonstration)
const uploadImage = async (req, res) => {
    const { userId, imageUrl } = req.body;

    try {
        const newImage = new Image({ userId, url: imageUrl });
        await newImage.save();

        const user = await User.findById(userId);
        user.images.push(newImage);
        await user.save();

        res.status(200).json({ message: 'Image uploaded successfully!', image: newImage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to upload image' });
    }
};

module.exports = { signup, login, fetchImages, uploadImage };
