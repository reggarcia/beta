
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , cons = require('consolidate')
  , less = require('less');

var app = express();

app.engine('dust', cons.dust);

app.configure('development', function(){
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dust');
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);

});


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/contact', routes.contact);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server running on port " + app.get('port'));
});
