var express = require('express');
var path = require('path');
var http = require('http');
var spotify = require('spotify-web-api-node');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

require(__dirname + '/routes/router.js')(app, spotify);

var server = http.createServer(app).listen(3000, function(){
	console.log("Server is on, listening on: 3000");
})