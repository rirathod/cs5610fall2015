var express = require('express');
var app = express();

var Guid = require('guid');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/', function(req, res){
  var response = 'Main Page...Go to current_url/index.html to view website landing page';
  res.send(response);
});		
app.use(express.static(__dirname + '/public'));

app.listen(port, ipaddress);