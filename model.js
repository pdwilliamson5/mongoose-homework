var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017//scraper');

mongoose.connections.on('error', function(){
    console.error('MongoDB Connnection Error. Make sure MongoDB is running.');

});

var ListingsSchema = new mongoose.Schema({
    title:String,
    headlines:{type:String, lowercase:true},
    summary:Array,
    URl:String,
});

module.exports = mongoose.model("Listings", ListingsSchema);