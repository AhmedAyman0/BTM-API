var User = require("../models/user");
var ResetPassword = require("../models/forgetPassword");
var jwt = require("jsonwebtoken");
let bcrypt = require('bcrypt');

var crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
var config = require("../config/config");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "e7tiaty2001@gmail.com", // generated ethereal user
    pass: "realismydna123" // generated ethereal password
  }
});

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email,avatar:user.avatar, role: user.role },
    config.jwtSecret,
    {
      expiresIn: 200 // 86400 expires in 24 hours
    }
  );
}

exports.registerUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "You need to send email and password" });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }

    if (user) {
      return res.status(400).json({ msg: "The user already exists" });
    }

    console.log(req.files);
    let newUser = User(req.body);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).json({ msg: err });
      }
      return res.status(201).json(user);
    });
  });
};

exports.loginUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ msg: "You need to send email and password" });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).send({ msg: err });
    }

    if (!user) {
      return res.status(400).json({ msg: "The user does not exist" });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        return res.status(200).json({
          token: createToken(user),
          user: user
        });
      } else {
        return res
          .status(400)
          .json({ msg: "The email and password don't match." });
      }
    });
  });
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.find().populate("shops");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("shops")
      .populate("requestsTo")
      .populate("requestsFrom");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body).populate(
      "shops"
    );

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.resetPassword = (req, res) => {
    console.log(req.body.email)
  User.findOne({
     email: req.body.email  //checking if the email address sent by client is present in the db(valid)
  }).then(function(user) {
    if (!user) {
      return res.status(500).json({msg: "No user found with that email address."});
    }
    ResetPassword.findOne({
  user: user._id 
    }).then(async function(resetPassword) {
      if (resetPassword)
      try {
        await ResetPassword.findByIdAndDelete(resetPassword._id);

      } catch (error) {
          console.log(error);
      }
      let token = crypto.randomBytes(32).toString("hex");
      bcrypt.hash(token, null, null, function(err, hash) {
        //hashing the password to store in the db node.js
        ResetPassword.create({
          user: user._id,
          resetPasswordToken: hash,
          expire: moment.utc().add(config.tokenExpiry, "seconds")
        }).then(function(item) {
          if (!item)
            return throwFailed(
              res,
              "Oops problem in creating new password record"
            );
          let mailOptions = {
            from: "e7tiaty2001@gmail.com",
            to: user.email,
            subject: "Reset your account password",
            html:
              "<h4><b>Reset Password</b></h4>" +
              "<p>To reset your password, complete this form:</p>" +
              "<a href=" +
              config.clientUrl +
              "reset/" +
              user.id +
              "/" +
              token +
              '">' +
              config.clientUrl +
              "reset/" +
              user.id +
              "/" +
              token +
              "</a>" +
              "<br><br>" +
              "<p>--Team</p>"
          };
          let mailSent = sendMail(mailOptions); //sending mail to the user where he can reset password.User id and the token generated are sent as params in a link
          if (mailSent) {
            return res.json({
              success: true,
              message: "Check your mail to reset your password."
            });
          } else {
            return throwFailed(error, "Unable to send email.");
          }
        }).catch(err=>console.log(err));
      });
    });
  });
};

exports.SaveNewPassword = (req, ress) => {
  const userId = req.body.userId;
  const token = req.body.token;
  const password = req.body.password;
  ResetPassword.findOne({ where: { user: userId} })
    .then(function(resetPassword) {
      if (!resetPassword) {
        return throwFailed(res, "Invalid or expired reset token.");
      }
      bcrypt.compare(token, resetPassword.token, function(
        errBcrypt,
        resBcrypt
      ) {
        // the token and the hashed token in the db are verified befor updating the password
        let expireTime = moment.utc(resetPassword.expire);
        let currentTime = new Date();
        bcrypt.hash(password, null, null, function(err, hash) {
          User.update(
            {
              password: hash
            },
            { where: { id: userId } }
          ).then(() => {
            ResetPassword.update(
              {
                status: 1
              },
              { where: { id: resetPassword.id } }
            ).then(msg => {
              if (!msg) throw err;
              else
                res.json({
                  success: true,
                  message: "Password Updated successfully."
                });
            });
          });
        });
      });
    })
    .catch(error => throwFailed(error, ""));
};
