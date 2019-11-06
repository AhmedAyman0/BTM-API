var express         = require('express'),
    routes          = express.Router();
var shopController  = require('../controllers/shop.controller');
var passport	    = require('passport');
var multer  = require('multer');
var mime = require('mime-types');
var crypto = require('crypto');
var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') +'.'+ mime.extension(file.mimetype))
      })
    }
  })

var upload = multer({storage:storage});


routes.get('/shops',shopController.getAll);
routes.get('/shops/:id',shopController.getById);
routes.put('/shops/:id',shopController.updateShop);
routes.post('/shops',upload.single('imgUrl'),shopController.createShop);
routes.delete('/shops/:id',shopController.deleteShop);
routes.get('/shops/user/:id',shopController.getShopByUser);

;
 
module.exports = routes;