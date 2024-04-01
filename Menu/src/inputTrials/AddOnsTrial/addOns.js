const { urlencoded } = require("express");
const mongoose = require("mongoose");

const addOnSchema = new mongoose.Schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true }
});

module.exports = mongoose.model('AddOns', addOnSchema);

