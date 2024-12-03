const express = require('express');
const { signup, login, fetchImages, uploadImage } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/images/:userId', fetchImages); // Fetch images after login
router.post('/upload-image', uploadImage); // Upload image to the user's profile

module.exports = router;
