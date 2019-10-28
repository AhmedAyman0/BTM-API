var express         = require('express'),
    routes          = express.Router();
var shopController  = require('../controllers/shop.controller');
var passport	    = require('passport');
 
routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});
routes.get('/shops',shopController.getAll);
routes.get('/shops/:id',shopController.getById);
routes.put('/shops/:id',shopController.updateShop);
routes.post('/shops',shopController.createShop);
;
 
module.exports = routes;