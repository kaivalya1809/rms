const { urlencoded } = require("express");
const mongoose = require("mongoose");

// Importing required schemas for referencing
const AddOnsUniversal = require("./addOnsUniversal.js");
const TagsUniversal = require("./tagsUniversal.js");
const Menu = require("./menu.js");

const menuIdSchema = new mongoose.Schema({
    universalAddOnsId: { type: mongoose.Schema.Types.ObjectId, ref: 'AddOnsUniversal' },
    universalTagsId: { type: mongoose.Schema.Types.ObjectId, ref: 'TagsUniversal', required: true },
    universalMenuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    menusListId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true }]
});

module.exports = mongoose.model('MenuIds', menuIdSchema);




