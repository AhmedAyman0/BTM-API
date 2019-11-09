var User = require("../models/user");
var ResetPassword = require("../models/forgetPassword");
var jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

var crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");
var config = require("../config/config");
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "mailtopassowrd@gmail.com", // generated ethereal user
    pass: "Ahmedayman12" // generated ethereal password
  }
});
function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, avatar: user.avatar, role: user.role },
    config.jwtSecret,
    {
      expiresIn: 8640 // 86400 expires in 24 hours
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

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: "user does not exits!" });
    }
    let paylod = {
      id: user._id,
      email: user.email
    };
    // current password hash from the database, and combine it
    // with the user's created date to make a very unique secret key!
    let secret = user.password;
    let token = jwt.sign(paylod, secret);
    let mailOptions = {
      from: "e7tiaty2001@gmail.com",
      to: user.email,
      subject: "Reset your account password",
      html:
        "<h4><b>Reset Password</b></h4>" +
        "<p>To reset your password, complete this form:</p>" +
        "<a href=" +
        "https://shrieking-ghost-72713.herokuapp.com/" +
        "reset/" +
        user.id +
        "/" +
        token +
        '>' +
        "click here" +
        "</a>" +
        "<br><br>" +
        "<p>--Team</p>"
    };
    let mailSent = transporter.sendMail(mailOptions, function(err, info) {
      if (err) console.log(err);
      else console.log(info);
      return res
        .status(200)
        .json({ msg: "email sent with info to reset password" });
    }); //sending mail to the user where he can reset password.User id and the token generated are sent as params in a link
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });

  }
};

exports.SaveNewPassword = async (req, res) => {
  const userId = req.body.userId;
  const token = req.body.token;
  const password = req.body.password;
  try {
    let user = await User.findById(userId);
    user.password = password;
    await User.findByIdAndUpdate(userId,user);
    return res.status(200).json({ msg: "Password Updated Successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });

  }
};
