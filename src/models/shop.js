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
    imgUrl:{
        type:String,

    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

},{toJSON:{virtuals:true}});

ShopSchema.virtual('items',{
    ref: 'Item',
    localField: '_id',
    foreignField:'shop',
    justOne:false
  });
  
 


 
module.exports = mongoose.model('Shop', ShopSchema);