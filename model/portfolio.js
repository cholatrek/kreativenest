var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
   
  
  title : String,
  eventDetails : String,
  instagramLink:String,
  datePosted:Date,
  youtubeLink:String,
  portfolioImage:String

 
});


module.exports = mongoose.model('portfolio', portfolioSchema);