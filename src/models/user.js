const isEmail = require("validator").isEmail;
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

const Roles = {Customer : "customer" ,Admin: "admin" , ShopOwner :"shop owner"}
Object.freeze(Roles);

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,

    validate: [isEmail, "Invalid mail "]
  },
  banned:{
    type:Boolean,
    default:false
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type:String,
    enum: Object.values(Roles),
    default: Roles.Customer
  }
  

},{toJSON:{virtuals:true}});

UserSchema.virtual('shops',{
  ref: 'Shop',
  localField: '_id',
  foreignField:'belongsTo',
  justOne:false
})

UserSchema.virtual('requestsTo',{
  ref: 'Request',
  localField: '_id',
  foreignField:'from',
  justOne:false
})
UserSchema.virtual('requestsFrom',{
  ref: 'Request',
  localField: '_id',
  foreignField:'to',
  justOne:false
})

UserSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });
UserSchema.pre("findOneAndUpdate", function(next) {
  delete this._update.shops;
  console.log(this._update)
  if(this._update.password.length>20) return next();
  let salt = bcrypt.genSaltSync(10);
  this._update.password = bcrypt.hashSync(this._update.password, salt);
  next()
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
