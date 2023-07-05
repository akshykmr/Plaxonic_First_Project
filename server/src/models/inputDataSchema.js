const mongoose = require('mongoose');

const inputDataSchema = new mongoose.Schema({
    Car_Name :  String,
    Car_Modal :  String,
    Purchase_Year : Number,
    Transmission : String,
    Fuel_Type :  String,
    Car_Image :  String,
});

const Entry = mongoose.model('Entry', inputDataSchema);
 module.exports = Entry;


