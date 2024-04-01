const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // Import path module


const AddOns = require("./addOns.js");
const AddOnsUniversal = require("./addOnsUniversal.js");


const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://kaivalya1809:showpassword1234@cluster0.1wxigjc.mongodb.net/project0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connected to MongoDB");
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Respond to preflight requests for the /add-ons route
app.options("/add-ons", cors());

// Route to handle adding new add-ons
app.post("/add-ons", async (req, res) => {
    try {
        // Extract add-on data and universal add-ons list ObjectId from request body
        let { name, displayName, price, availability, universalAddOnsListId } = req.body;

        // Check if universalAddOnsListId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(universalAddOnsListId)) {
            // Generate a random ObjectId if the provided universalAddOnsListId is invalid
            universalAddOnsListId = generateRandomObjectId();
        }

        // Create new add-on document
        const newAddOn = new AddOns({ name, displayName, price, availability });
        await newAddOn.save();

        // Find the universal add-ons list based on its ObjectId
        let universalAddOnsList = await AddOnsUniversal.findById(universalAddOnsListId);

        // If the universal add-ons list is not found, create a new one
        if (!universalAddOnsList) {
            universalAddOnsList = new AddOnsUniversal({ name : "Sample Universal ID", addOns: [] });
        }

        // Add the new add-on to the universal add-ons list
        universalAddOnsList.addOns.push(newAddOn);
        await universalAddOnsList.save();

        // Send response
        res.status(201).json(newAddOn);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add Add-On" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
