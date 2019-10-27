var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
  
var ItemSchema = new mongoose.Schema({
  name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        
    },
  shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    count:{
        type:Number,
        required:true,
    },
    inStock:{
        type:Boolean,
        required:true,
    },
    description:{
        type:String,
        required:false,
    }
});
 


 
module.exports = mongoose.model('Item', ItemSchema);