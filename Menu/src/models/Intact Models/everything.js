const { urlencoded } = require("express");
const mongoose = require("mongoose"); 




const addOnSchema = new mongoose.Schema({
    name : {type : String, required : true},
    displayName : {type : String, required:true}, 
    price : {type : Number, required:true}, 
    availability: {type: Boolean, required:true},
})

const addOnsUniversalSchema = new mongoose.Schema({
    name : {type : String, required : true}, 
    addOn : [addOnSchema],                 
})



const addOns = mongoose.model('addOns', addOnSchema);  
const addOnsUniversal = mongoose.model('addOnsUniversal', addOnsUniversalSchema); 
module.exports = addOnSchema; 



const tagsSchema = new mongoose.Schema({

    name : {type : String, required : true},
    displayName : {type: String, required : true},
    imageURL : {type : String, required : true},
    category : {type : String, required : true} 
})


const universalTagsSchema = new mongoose.Schema({
    name : {type : String, required : true}, 
    tags : [tagsSchema],
})


const Menu = mongoose.model('tags', tagsScehma); 
module.exports = tagsSchema; 

const menuItemSchema = new mongoose.Schema({
    name : {type : String, required : true},
    displayName : {type : String, required:true}, 
    description : {type : String, required:false},
    price : {type : Number, required:true},
    availability: {type: Boolean, required:true}, 
    isVeg : {type : Boolean, required:true}, 
    addOns : [addOnSchema], 
    tags : [String], // this should be a list of object ids?    
    kitchen : {type : id},  // this should be a object ids?   \
    imageUrl : {type : String}   
})

const menuItems = mongoose.model('menuItems', menuItemSchema); 
module.exports = menuItemSchema; 


const menuItemSchema = require("./menuItems.js"); 
const menuSchema = new mongoose.Schema({
    name : {type : String, required:true},
    displayName : {type : String, required:true}, 
    items : [menuItemSchema] 
})

const Menu = mongoose.model('Menu', menuSchema); 
module.exports = Menu;

const menuIdSchema = new mongoose.Schema({
    universalTagsId : // it is a mongoose object type,
    universalTagsId : // it is a mongoose onject type, 
    universalMenuId : // it is a mongoose object type,
    menusListId : // again a mongoose object type
})

