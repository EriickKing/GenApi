const {
  User,
  validate
} = require("../models/userModel");
const errorHandler = require("../src/errors");
const func = require("../src/functions");
const bcrypt = require("bcryptjs");
const userController = {};


userController.createUser = async (req, res) => {
  try {
    errorHandler.ValidateJoi(req, res, validate);
    let user = await User.findOne({
      emailUser: req.body.emailUser
    });
    if (user)
      return res.status(400).json({
        success: false,
        message: "Email is already exist"
      });

    user = new User({
      userUser: req.body.userUser,
      emailUser: req.body.emailUser,
      passwordUser: req.body.passwordUser
    });

    const salt = await bcrypt.genSalt(10);
    user.passwordUser = await bcrypt.hash(user.passwordUser, salt);
    func.Save(res, user);


  } catch (err) {
    return err;
  }
}

userController.loginUser = async (req, res) => {
  let user = await User.findOne({
    emailUser: req.body.emailUser
  })

  if (!user)
    return res.status(400).json({
      success: false,
      message: "Email doesn't exist"
    })

  const validPassword = await user.comparePassword(req.body.passwordUser);
  if (!validPassword)
    return res.status(400).json({
      success: false,
      message: "Incorrect Password"
    });
  const token = user.generateAuthToken();
  res.status(200).json({
    success: true,
    token: token,
    user: user
  });
}

module.exports = userController;