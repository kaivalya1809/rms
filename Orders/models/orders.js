// models/orders.js

const mongoose = require("mongoose");

// Define PartialOrder schema
// make sure to use mongoose object ids and references post testingmodels/orders.js
const partialOrderSchema = new mongoose.Schema({
    items: [{ type: String }],
    contact: { type: String, required: true },
    istable: { type: Boolean, required: true },
    table: { type: String },
    takeout: { type: String }
});

// Define Order schema
const orderSchema = new mongoose.Schema({
    partialOrders: [partialOrderSchema],
});

// Create PartialOrder model
const PartialOrder = mongoose.model('PartialOrder', partialOrderSchema);

// Create Order model
const Order = mongoose.model('Order', orderSchema);

// Export models
module.exports = { PartialOrder, Order };


















// How do I retrieve order required, see save is as 