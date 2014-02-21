
var Mongoose = require('mongoose');


var MomentsSchema = new Mongoose.Schema({
  // fields are defined here
  "location": String,
  "imgsrc": String,
  "numPhotos": Number,
  "heart": String

});

exports.Moments = Mongoose.model('Moments', MomentsSchema);


