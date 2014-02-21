
var models = require('../models');

/*
 * GET login page.
 */

exports.view = function(req, res){

		res.render('login', { 'projects': projects });

};