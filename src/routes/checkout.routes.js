var express         = require('express'),
    routes          = express.Router();
var checkOutController  = require('../controllers/checkout.controller');
var passport	    = require('passport');
 

routes.get('/checkouts',checkOutController.getAll);
routes.get('/stats/checkouts',checkOutController.checkOutsStats);
routes.get('/checkouts/:id',checkOutController.getById);
routes.get('/checkouts/user/:id',checkOutController.getForUser);
routes.put('/checkouts/:id',checkOutController.updateCheckOut);
routes.post('/checkouts',checkOutController.createCheckOut);
routes.delete('/checkouts/:id',checkOutController.deleteCheckOut);

;
 
module.exports = routes;