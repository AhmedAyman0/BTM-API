var express     = require('express');
var bodyParser  = require('body-parser');
var passport	= require('passport');
var socket = require('socket.io');
var mongoose    = require('mongoose');
var config      = require('./config/config');
var port        = process.env.PORT || 5000; 
var cors        = require('cors');
 
var app = express();
app.use(cors());
 
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);
 
// Demo Route (GET http://localhost:5000)
app.get('/', function(req, res) {
  return res.send('Hello! The API is at http://localhost:' + port + '/api');
});
 
var userRoutes = require('./routes/user.routes');
var shopRoutes = require('./routes/shop.routes');
var categoryRoutes = require('./routes/category.routes');
var itemRoutes = require('./routes/item.routes');
var requestRoutes = require('./routes/request.routes');
var checkOuttRoutes = require('./routes/checkout.routes');
var notifyRoutes = require('./routes/notification.routes');
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', shopRoutes);
app.use('/api', itemRoutes);
app.use('/api', requestRoutes);
app.use('/api', checkOuttRoutes);
app.use('/api', notifyRoutes);
 
mongoose.connect(config.db, { useNewUrlParser: true , useCreateIndex: true});
 
const connection = mongoose.connection;
 
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
 
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});
 
// Start the server
let server=app.listen(port);
console.log('Listining: http://localhost:' + port);

//--------------------------------socket--------------------------------//

let io = socket(server);

io.on('connection', (socket) => {
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  });
 
  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', {user: nickname, event: 'joined'});    
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
  });
});
 
var port = process.env.PORT || 3001;
 