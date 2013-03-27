
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , cons = require('consolidate')
  , less = require('less');

var app = express();

app.engine('dust', cons.dust);

app.configure(function(){
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

app.get('/', function(req, res) {
  res.render('index', {
    title: "testing out dust with express"
  });
});
app.get('/:viewName', function(req,res) {
  res.render(req.params.viewName, {
    title: "random views"
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server running on port " + app.get('port'));
});
