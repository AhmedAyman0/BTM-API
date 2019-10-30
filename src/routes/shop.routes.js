var express         = require('express'),
    routes          = express.Router();
var shopController  = require('../controllers/shop.controller');
var passport	    = require('passport');
 

routes.get('/shops',shopController.getAll);
routes.get('/shops/:id',shopController.getById);
routes.put('/shops/:id',shopController.updateShop);
routes.post('/shops',shopController.createShop);
routes.delete('/shops/:id',shopController.deleteShop);
routes.get('/shops/user/:id',shopController.getShopByUser);

;
 
module.exports = routes;