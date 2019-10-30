var express         = require('express'),
    routes          = express.Router();
var categoryController  = require('../controllers/category.controller');
var passport	    = require('passport');
 

routes.get('/category',categoryController.getAll);
routes.get('/category/:id',categoryController.getById);
routes.put('/category/:id',categoryController.updateCategory);
routes.post('/category',categoryController.createCategory);
routes.delete('/category/:id',categoryController.deleteCategory);
;
 
module.exports = routes;