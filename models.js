
var Mongoose = require('mongoose');


var MomentsSchema = new Mongoose.Schema({
  // fields are defined here
  "id": Number,
  "location": String,
  "imgsrc": String,
  "numPhotos": Number,
  "heart": String

});

exports.Moments = Mongoose.model('Moments', MomentsSchema);


