var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var mongoose = require("mongoose");
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/assignment';
var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.get('/', function(req, res){
//  var response = 'Main Page...Go to current_url/index.html to view website landing page';
//  res.send(response);
//});
app.use(express.static(__dirname + '/public'));

require('./public/assignment/server/app.js')(app, mongoose, db);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);