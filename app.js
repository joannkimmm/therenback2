
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var moments = require('./routes/moments');
var mymoments = require('./routes/mymoments');
var favorites = require('./routes/favorites');
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
app.use(express.cookieDecoder());
app.use(express.session());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
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
app.get('/mymoments', mymoments.view);
app.get('/favorites', favorites.view);

// app.get('/project/:id', project.projectInfo);
// app.post('/project/new', project.addProject);
// app.post('/project/:id/delete', project.deleteProject);
// Example route
// app.get('/users', user.list);

app.configure('development', function() {
	app.set('db-uri', 'mongodb': 'therenback2.herokuapp.com')
});

var db = mongoose.connect(app.set('db-uri'));

function mongoStoreConnectionArgs(){
	return {
		dbname: db.db.databaseName,
		host: db.db.serverConfig.host,
		port: db.db.serverConfig.port,
		username: db.uri.username,
		password: db.uri.password 
	};
}

app.use(express.session({
	store: mongoStore(mongoStoreConnectionArgs())
}));


function loadUser(req, res, next) {
  if (req.session.user_id) {
    User.findById(req.session.user_id, function(err, user) {
      if (user) {
        req.currentUser = user;
        next();
      } else {
        res.redirect('./static/signup.html');
      }
    });
  } else if (req.cookies.logintoken) {
    authenticateFromLoginToken(req, res, next);
  } else {
    res.redirect('./static/signup.html');
  }
}

app.get('/', loadUser, function(req, res) {
	res.redirect('./static/home.html');
});

app.post('./static/login.html', function (req, res) {
	var post = req.body;
	if (post.user == 'john' && post.password == 'johnspassword') {
		req.session.user_id = johns_user_id_here;
		res.redirect('./static/home.html');
	} else {
		res.send('Invalid Username or Password');
	}
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
