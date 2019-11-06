var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
  
var ResetPasswordSchema = new mongoose.Schema({
  toekn: {
        type: String,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    expire:{
        type:Date
      
    
    }
});

module.exports = mongoose.model('ResetPassword', ResetPasswordSchema);