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

var myMomentsSchema = new Mongoose.Schema({
  // fields are defined here
  "id": Number,
  "location": String,
  "imgsrc": String,
  "numPhotos": Number,
  "heart": String

});
exports.myMoments = Mongoose.model('myMoments', myMomentsSchema);

var FavoritesSchema = new Mongoose.Schema({
  // fields are defined here
  "id": Number,
  "location": String,
  "imgsrc": String,
  "numPhotos": Number,
  "heart": String
});
exports.Favorites = Mongoose.model('Favorites', FavoritesSchema);

// Model: User

User = new Schema({
  'username': { type: String, validate: [validatePresenceOf, 'a username is require'], index: {unique:true}},
  'hashed_password': String,
  'salt': String
});

User.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

User.virtual('password')
  .set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() { return this._password });


User.method('authenticate', function(plainText){
  return this.encryptPassword(plainText) === this.hashed_password;
});

User.method('makeSalt', function() {
  return Math.round((new Date().valueOf() * Math.random())) + '';
});

User.method('encryptPassword', function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
});

User.pre('save', function(next) {
  if (!validatePresenceOf(this.password)) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

mongoose.model('User', User);

fn();





