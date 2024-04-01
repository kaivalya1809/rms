const { urlencoded } = require("express");
const mongoose = require("mongoose");
const Tags = require("./tags");

const universalTagsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }]
});

module.exports = mongoose.model('TagsUniversal', universalTagsSchema);
