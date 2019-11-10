var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
  
var CheckOutSchema = new mongoose.Schema({
  isPending: {
        type: Boolean,
        default:true,
    },
    belongsTo:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
});
CheckOutSchema.virtual('requests',{
    ref: 'Request',
    localField: '_id',
    foreignField:'checkOut',
    justOne:false
  });
  CheckOutSchema.set('toObject', { virtuals: true });
  CheckOutSchema.set('toJSON', { virtuals: true });
 

module.exports = mongoose.model('CheckOut', CheckOutSchema);