const mongoose = require("mongoose");
const { urlencoded } = require("express");

const AddOns = require("./addOns.js"); 


const addOnsUniversalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    addOns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddOns'}] // Reference the add-on schema
}); 

module.exports = mongoose.model('AddOnsUniversal', addOnsUniversalSchema);
