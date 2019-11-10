var express         = require('express'),
    routes          = express.Router();
var checkOutController  = require('../controllers/checkout.controller');
var passport	    = require('passport');
 

routes.get('/checkOuts',checkOutController.getAll);
routes.get('/checkOuts/:id',checkOutController.getById);
routes.put('/checkOuts/:id',checkOutController.updateCheckOut);
routes.post('/checkOuts',checkOutController.createCheckOut);
routes.delete('/checkOuts/:id',checkOutController.deleteCheckOut);

;
 
module.exports = routes;