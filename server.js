var http = require('http');
var app = require('./app');

var port = 5000;
var server = http.createServer(app);

server.listen(port, () => console.log('Project started on port 5000' ));
