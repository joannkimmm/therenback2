var data = require('../favorites.json');
var models = require('../models.js');

exports.view = function(req, res){
  console.log(data);
  res.render('favorites');
};

exports.view = function(req, res){
  res.render('favorites', data);
};