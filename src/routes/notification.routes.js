var express         = require('express'),
    routes          = express.Router();
var norificationController  = require('../controllers/notification.controller');
var passport	    = require('passport');
 


routes.post('/notify',norificationController.sendNotification);


;
 
module.exports = routes;