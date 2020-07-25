const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("../config/dbcfg");
// const crypto = require("crypto").randomBytes(256).toString("hex");

const userSchema = new Schema({
  userUser: {
    type: String,
    required: true,
    unique: true
  },
  emailUser: {
    type: String,
    required: true,
    unique: true
  },
  passwordUser: {
    type: String,
    required: true
  },
  typeAccountUser: {
    type: String,
    default: "normal",
  },
  createdAtUser: {
    type: Date,
    default: new Date(Date.now())
  },
  updatedAtUser: {
    type: Date
  },
  statusUser: {
    type: Number,
    default: 1
  }
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({
      _id: this._id,
      typeAcc: this.typeAccountUser,
      user: this.userUser,
      email: this.emailUser
    },
    crypto.secret, {
      expiresIn: "6h"
    }
  );
  return token;
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.passwordUser);
};

const User = mongoose.model("User", userSchema);

function validate(user) {
  const schema = {
    userUser: joi.string().required(),
    emailUser: joi.string().required().email(),
    passwordUser: joi.string().required(),
    typeAccountUser: joi.string(),
    createdAtUser: joi.date(),
    statusUser: joi.number()
  }
  return joi.validate(user, schema);
}

exports.User = User;
exports.validate = validate;