var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/WhiteBoardDB');

app.use(express.static(__dirname + '/public'));

app.listen(3000);