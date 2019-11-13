var express         = require('express'),
    routes          = express.Router();
var itemController  = require('../controllers/item.controller');
var passport	    = require('passport');
 

routes.get('/items',itemController.getAll);
routes.get('/stats/items',itemController.itemsStats);
routes.get('/items/:id',itemController.getById);
routes.put('/items/:id',itemController.updateItem);
routes.post('/items',itemController.createItem);
routes.delete('/items/:id',itemController.deleteItem);

;
 
module.exports = routes;