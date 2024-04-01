// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const WebSocket = require('ws');




const { PartialOrder, Order } = require("./models/orders.js"); // Import your mongoose schema file

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
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

// Websocket Start
const wss = new WebSocket.Server({ port: 8080 });

// Array to store connected WebSocket clients
const clients = [];

// WebSocket connection event handler
wss.on('connection', (ws) => {
    console.log('A client connected');
    
    // Add the client to the clients array
    clients.push(ws);

    // Handle messages from clients
    ws.on('message', (message) => {
        console.log('Received message from client:', message);
    });
});

// Function to send data to all connected clients
function sendToAllClients(data) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Websocket End

async function sendToKOT(body){
    data = { items : [] } ; 
    for (const item of body.items) {
        array = item.split(".") ; 
        current = {} ; 

        menuItemId = array[0]; 
        const menuItemIdBSON = new mongoose.Types.ObjectId(menuItemId); 
        const collectionMenuItem = connection.collection('menuItems');
        const menuItem = await collectionMenuItem.findOne({ _id: menuItemIdBSON });
        current.itemName = menuItem.name; 
        current.kitchen = menuItem.kitchen; 
        current.instructions = array[2]; 
        current.table = body.table;  


        addOns = [] ; 
        if (array[1]){
            addOnIds = array[1].split("-") ; 
            const collectionAddOn = connection.collection('AddOns');
            for (const addOnId of addOnIds){
                const addOnIdBSON = new mongoose.Types.ObjectId(addOnId); 
                const addOn = await collectionAddOn.findOne({ _id: addOnIdBSON }); 
                addOns.push(addOn.name); 
            }
        }
        current.addOns = addOns; 

        data.items.push(current); 
    }

    console.log(data); 
    sendToAllClients(data) ; 
}
// createOrder endpoint
app.post("/createOrder", async (req, res) => {

    
    const partialOrder = req.body;

    const newPartialOrder = new PartialOrder(partialOrder); 

    
    newPartialOrder.save()
        .then ( savedPartialOrder=> {
            console.log("Partial Order Saved", savedPartialOrder); 
            const order = {}; order.partialOrders = [savedPartialOrder]; 
            const newOrder = new Order(order); 
            newOrder.save()
                .then((savedOrder =>{
                    console.log("Order Saved: ", savedOrder); 
                }))
                .catch((error) =>{
                    console.log("Error: ", error);                 
                })
        })  
        .catch ( error =>{
            console.log("Error saving user", error);
        })
    
    res.json(newPartialOrder);

    // KOT interaction:
    sendToKOT(req.body); 
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
