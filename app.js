// app.js
// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var server = require('http').Server(app);
var io = require('socket.io')(server);
//Import express-session
var session = require('express-session');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
server.listen(80);
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
// Set up Conversation service wrapper.
var conversation = new ConversationV1({
    username: '32204d2b-3d0e-482f-8b2e-260c150f76d8', // replace with username from service key
    password: 'diwBYdais1sW', // replace with password from service key
    path: {
        workspace_id: '893e4e9e-eb10-4ed5-a0fd-6bb2d2eaa232'
    }, // replace with workspace ID
    version_date: '2016-07-11'
});
// Start conversation with empty message.
//conversation.message({}, processResponse);
// Process the conversation response.
var watsonIn;
var watsonIntent;
var data;
// configuration =================
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());
// routes ======================================================================
// api ---------------------------------------------------------------------
// get all todos
app.get('/app/', function (req, res) {
    res.send('get');
});
// create todo and send back all todos after creation
app.post('/app/', function (req, res) {
    res.send('post');
});
// application -------------------------------------------------------------
app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load our public/index.html file
});
//Listen to Socket.IO connections.
//Start application logic after connection established
io.on('connection', function (socket) {
    console.log("User connected");
    socket.on('testing', function(){
        socket.emit("response", "Kuulin kyllä");
    });
});
