
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var moments = require('./routes/moments');
// var mymoments = require('./routes/mymoments');
var project = require('./routes/project');


// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'therenback';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



// static page routes
app.get('/', function(req, res) {
	res.sendfile('./static/index.html');
});
app.get('/login', function(req, res) {
	res.sendfile('./static/login.html');
});
app.get('/tutorial', function(req, res) {
	res.sendfile('./static/tutorial.html');
});
app.get('/tutorial1', function(req, res) {
	res.sendfile('./static/tutorial1.html');
});
app.get('/home', function(req, res) {
	res.sendfile('./static/home.html');
});
app.get('/camera', function(req, res) {
	res.sendfile('./static/camera.html');
});
app.get('/help', function(req, res) {
	res.sendfile('./static/help.html');
});
app.get('/sethome', function(req, res) {
	res.sendfile('./static/sethome.html');
});
app.get('/bank', function(req, res) {
	res.sendfile('./static/bank.html');
});
app.get('/account', function(req, res) {
	res.sendfile('./static/account.html');
});
app.get('/filler', function(req, res) {
	res.sendfile('./static/filler.html');
});

// json/ handlebars routes

app.get('/moments', moments.view);
app.get('/moments/:id', moments.glyphChange);
app.get('/project/:id', project.projectInfo);
app.post('/project/new', project.addProject);
app.post('/project/:id/delete', project.deleteProject);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
