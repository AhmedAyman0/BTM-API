var express         = require('express'),
    routes          = express.Router();
var userController  = require('../controllers/user.controller');
var passport	    = require('passport');
 
routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});
 
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.get('/users',userController.getAll);
routes.get('/users/:id',userController.getById);
routes.put('/users/:id',userController.updateUser);
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});
 
module.exports = routes;