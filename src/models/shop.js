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
        type:Object,

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
  ShopSchema.set('toObject', { virtuals: true });
  ShopSchema.set('toJSON', { virtuals: true });
 


 
module.exports = mongoose.model('Shop', ShopSchema);