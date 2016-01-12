#!/usr/bin/env node

var express= require('express');
var path= require('path');
var debug = require('debug')('iot_api:server');
var http = require('http');
var fs = require('fs');

var app= express();
app.set('current_state','off');
var server = http.createServer(app);

// ROUTES

require('./route/index.js')(fs,app,path);
require('./route/api.js')(fs,app,path);


// Stuff

var normalizePort= (val)=> {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

var onError= (error)=> {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

var onListening= ()=> {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


// Other stuff

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



// ############# WebSockets

var io = require('socket.io').listen(server);
require('./stuff/socket_stuff.js')(io,app);