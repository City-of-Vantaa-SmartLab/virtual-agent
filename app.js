'use strict';

//Import Express module
var express = require('express');
//Import path module (packaged with Node.js)
var path = require('path');
//Import fs-extra
var fse = require('fs-extra');
//Import Socket.IO
var io = require('socket.io');
//Import express-session
var session = require('express-session');

//Create new instance of Express
var app = express();

//Import server side file for avatar app
var avatarApp = require('./avatar');


//Session setup
app.use(session({secret: 'secret', key: 'express.sid'}));
/*app.use(function(req, res){
  //res.end('<h2>Hello, your session id is ' + req.sessionID + '</h2>');
});*/

//Serve static html page from public directory
app.use(express.static(path.join(__dirname, 'public')));

//Set response to all GET calls
app.get('/', function(req,res){
  //Send html file
  console.log("Sending html to client");
  res.status(200).sendFile(path.join(__dirname, 'index.html'));

  //Default response from server
  //res.status(200).send("Default response from SpeechNode!");
});

//Set up http server and listen to port 8080
var server = require('http').createServer(app).listen(process.env.PORT || '8080', function(){
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit');
})
//Set socket.IO to listen to http server
var socketio = io.listen(server);


//Listen to Socket.IO connections.
//Start application logic after connection established
socketio.on('connection', function(socket){
  console.log("Socket connection ready");
  avatarApp.initApp();
});
