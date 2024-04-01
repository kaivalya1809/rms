const { urlencoded } = require("express");
const mongoose = require("mongoose");

// Importing AddOns and Tags schemas for referencing
const AddOns = require("./addOns.js");
const Tags = require("./tags.js");

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    description: { type: String }, 
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true },
    isVeg: { type: Boolean, required: true },
    addOns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddOns' }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
    kitchen: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen' },
    imageUrl: { type: String }
});

module.exports = mongoose.model('MenuItems', menuItemSchema);
