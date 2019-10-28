const isEmail = require("validator").isEmail;
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    enum: ["user", "admin", "shop owner"],
    default: "user",
    trim: true,

    validate: [isEmail, "Invalid mail "]
  },
  password: {
    type: String,
    required: true
  },
  shops: [{ type: Schema.Types.ObjectId, ref: "Shop" }],
  banned: {
    type: Boolean,
    default:false,
    required: false
  }
});

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

UserSchema.pre("findOneAndUpdate", function(next) {
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
