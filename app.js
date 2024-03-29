
/**
 * Module dependencies.
 */

// express global installieren: sudo npm -g install express
    // Projekt erzeugen: express --help / express -s
// NODE_ENV=development
// NODE_ENV=production
// Module für node http://jiyinyiyong.github.io/nipster/

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var db = require('./db');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
    res.render('angular');
});

app.get('/articles', function(req, res) {
    res.send(db);
});

app.get('/articles/:id', function(req, res) {
    res.send(db[req.params.id - 1]);
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
