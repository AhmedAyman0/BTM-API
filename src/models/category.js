var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  
var CategorySchema = new mongoose.Schema({
  name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        
    },
    imgUrl:{
        type:String,
        default:'https://www.louisianabelieves.com/images/default-source/buttons/webgraphics_category-button.png?sfvrsn=6'
    },
},{toJSON:{virtuals:true}});
 
CategorySchema.virtual('shops',{
  ref: 'Shop',
  localField: '_id',
  foreignField:'category',
  justOne:false
})


 
module.exports = mongoose.model('Category', CategorySchema);