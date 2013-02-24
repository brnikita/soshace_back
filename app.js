var express = require('express'),
    http = require('http'),
    path = require('path'),
    actions = require('./actions');


var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 80);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.logger('dev'));
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});
http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

//Routes:
app.post('/save_post', actions.savePost);