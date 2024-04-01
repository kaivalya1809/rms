const { urlencoded } = require("express");
// tags.js
const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    imageURL: { type: String, required: true },
    category: { type: String, required: true }
});

module.exports = mongoose.model('Tags', tagsSchema);
