var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
  
var ShopSchema = new mongoose.Schema({
  name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        
    },
  belongsTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    items:[
        {
            type : Schema.Types.ObjectId,
            ref  : 'Item'
        }
    ]
});
 


 
module.exports = mongoose.model('Shop', ShopSchema);