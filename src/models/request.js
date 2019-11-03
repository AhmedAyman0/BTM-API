var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
  
var RequestSchema = new mongoose.Schema({
  isPending: {
        type: Boolean,
        default:true,
    },
    from:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Request', RequestSchema);