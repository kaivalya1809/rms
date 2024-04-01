const express = require("express");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/myapp", { useNewUrlParser: true, useUnifiedTopology: true });

// Import and export schemas
module.exports = {
    AddOns: require('./addOns.js'),
    AddOnsUniversal: require('./addOnsUniversal.js'),
    Tags: require('./tags.js'),
    TagsUniversal: require('./tagsUniversal.js'),
    MenuItems: require('./menuItems.js'),
    Menu: require('./menu.js'),
    MenuIds: require('./menuIds.js'),
    urlencoded: express.urlencoded({ extended: true })
};
