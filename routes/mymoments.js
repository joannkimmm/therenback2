var data = require('../mymoments.json');
var models = require('../models.js');

exports.view = function(req, res){
  console.log(data);
  res.render('mymoments');
};

exports.view = function(req, res){
  res.render('mymoments', data);
};