const { urlencoded } = require("express");
const mongoose = require("mongoose");

const MenuItem = require("./menuItems.js");

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItems' }]
});

module.exports = mongoose.model('Menu', menuSchema);

