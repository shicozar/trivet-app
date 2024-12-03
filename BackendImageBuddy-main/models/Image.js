const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true }, // URL or base64 data of the image
    uploadedAt: { type: Date, default: Date.now },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
