var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var landingScheme = new Schema({
    
    tag : String,
    title:String,
    message:String,
    action:String,
    image:String
  
});

module.exports = mongoose.model('landing', landingScheme)