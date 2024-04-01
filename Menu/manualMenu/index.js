const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Connect to MongoDB
const uri = "mongodb+srv://kaivalya1809:showpassword1234@cluster0.1wxigjc.mongodb.net/project";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const connection = mongoose.createConnection(uri, options);

connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

connection.on("error", (err) => {
    console.error("Connection error:", err);
});



// Middleware
app.use(bodyParser.json());
app.use(cors());


app.get("/getcategories", async (req, res) => {
    try {
        const collection = connection.collection('Tags');

        const allTags = await collection.find({}).toArray();

        const tagsData = allTags.map(tag => ({
            objectId: tag._id,
            name: tag.displayName,
            imageURL: tag.imageURL
        }));

        res.json(tagsData); 
    } catch (error) {
        console.error("Error retrieving tags:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.get("/getitems/:category", async (req, res) => {
    try {
        const objectId = '660552467e9d7eca6659b859'; // Hardcoded objectId
        
        console.log("part 1");
        const objectIdAsObjectId = new mongoose.Types.ObjectId(objectId); // Convert string objectId to BSON ObjectId

        const collectionMenu = connection.collection('Menu');
        const menu = await collectionMenu.findOne({ _id: objectIdAsObjectId }); // Query using the converted objectId

        if (!menu) {
            return res.status(404).json({ error: 'Menu not found' });
        }

        const items = [];
        const collectionItem = connection.collection('menuItems');
        const collectionAddOn = connection.collection('AddOns'); 
        for (const itemId of menu.items) {
            const idBSON = new mongoose.Types.ObjectId(itemId); // Convert string objectId to BSON ObjectId
            const item = await collectionItem.findOne({ _id: idBSON });
            if (item) {
                if (item.tags.includes(req.params.category)){
                    let addOns = []; 
                    for (const addOnId of item.addOns){
                        addOnIdBSON = new mongoose.Types.ObjectId(addOnId); 
                        const addOnComplete = await collectionAddOn.findOne({_id : addOnIdBSON}); 
                        addOns.push(addOnComplete); 
                    }   
                    console.log(addOns); 
                    item.addOns = addOns; 
                    items.push(item);
                }
            }
        }

        // Send the retrieved items as a JSON response
        res.json({ items });
        // Send the retrieved menu as a JSON response
    } catch (error) {
        console.error("Error retrieving menu:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});






// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
