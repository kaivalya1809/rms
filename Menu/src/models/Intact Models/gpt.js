const mongoose = require("mongoose");

// Define add-on schema
const addOnSchema = new mongoose.Schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true }
});

// Define universal add-ons schema
const addOnsUniversalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    addOns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddOns'}] // Reference the add-on schema
}); 

// Define tags schema
const tagsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    imageURL: { type: String, required: true },
    category: { type: String, required: true }
});

// Define universal tags schema
const universalTagsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }] // Reference the 'Tags' model
});

// Define menu item schema
const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    description: { type: String }, 
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true },
    isVeg: { type: Boolean, required: true },
    addOns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddOns' }], // Reference the add-on schema
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }], // Reference the 'Tags' model
    kitchen: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen' }, // Assuming there's a 'Kitchen' model
    imageUrl: { type: String }
});

// Define menu schema
const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItems' }] // Reference the 'MenuItems' model
});

// Define menu ID schema
const menuIdSchema = new mongoose.Schema({
    universalAddOnsId: { type: mongoose.Schema.Types.ObjectId, ref: 'AddOnsUniversal' },
    universalTagsId: { type: mongoose.Schema.Types.ObjectId, ref: 'TagsUniversal', required: true },
    universalMenuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
    menusListId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true }]
});

// Define models
const AddOns = mongoose.model('AddOns', addOnSchema);
const AddOnsUniversal = mongoose.model('AddOnsUniversal', addOnsUniversalSchema);
const Tags = mongoose.model('Tags', tagsSchema);
const TagsUniversal = mongoose.model('TagsUniversal', universalTagsSchema);
const MenuItems = mongoose.model('MenuItems', menuItemSchema);
const Menu = mongoose.model('Menu', menuSchema);
const MenuIds = mongoose.model('MenuIds', menuIdSchema);

module.exports = {
    AddOns,
    AddOnsUniversal,
    Tags,
    TagsUniversal,
    MenuItems,
    Menu,
    MenuIds,
    addOnSchema,
    addOnsUniversalSchema,
    tagsSchema,
    universalTagsSchema,
    menuItemSchema,
    menuSchema,
    menuIdSchema
};
