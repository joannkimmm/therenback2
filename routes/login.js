
var models = require('../models');

/*
 * GET login page.
 */

exports.view = function(req, res){
	res.render('login', function(err, html) {
    	console.log(html);
    	res.send('done');
  }));
};