var express         = require('express'),
    routes          = express.Router();
var authController  = require('../controllers/google.auth.controller');
var passport	    = require('passport');

routes.post('/google-auth',authController.verify);


module.exports = routes;