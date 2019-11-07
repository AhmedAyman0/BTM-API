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
    imgUrl:{
        type:String,
        default:'assets/imgs/item.png'
    },
    price:{
        type:Number,
        default:10.0
    }
,
  shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    count:{
        type:Number,
        required:true,
        default:1
    },
    inStock:{
        type:Boolean,
        default:true,
    },
    description:{
        type:String,
        required:false,
    }
});
 


 
module.exports = mongoose.model('Item', ItemSchema);