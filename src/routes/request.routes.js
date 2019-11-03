var express         = require('express'),
    routes          = express.Router();
var requestController  = require('../controllers/request.controller');
var passport	    = require('passport');
 

routes.get('/requests',requestController.getAll);
routes.get('/requests/:id',requestController.getByIdFor);
routes.put('/requests/:id',requestController.updateRequest);
routes.post('/requests',requestController.createRequest);
routes.delete('/requests/:id',requestController.deleteRequest);

;
 
module.exports = routes;