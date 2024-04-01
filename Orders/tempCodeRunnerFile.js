const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { PartialOrder, Order } = require("./models/orders.js"); // Import your mongoose schema file

const app = express();
const PORT = 5000;

// Connect to MongoDB
const uri = "mongodb+srv://kaivalya1809:showpassword1234@cluster0.1wxigjc.mongodb.net/project";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(uri, options); // Use mongoose.connect instead of mongoose.createConnection

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

connection.on("error", (err) => {
    console.error("Connection error:", err);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// createOrder endpoint
app.post("/createOrder", async (req, res) => {
    console.log(req.body);
    try {
    
        // Extract order details from the request body
        const { partialOrders } = req.body;

        // Create new partial orders
        const createdPartialOrders = await PartialOrder.create(partialOrders);

        // Create a new order with the created partial orders
        const newOrder = new Order({
            partialOrders: createdPartialOrders.map(partialOrder => partialOrder._id)
        });
        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder); // Return the created order
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
