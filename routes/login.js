
var models = require('../models');

/*
 * GET login page.
 */

exports.view = function(req, res){

	models.Project
		.find()
		.sort('date')
		.exec(renderProjects);

	function renderProjects(err, projects) {
		res.render('index', { 'projects': projects });
	}

};