const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
// const config = require("config");
// const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, "123qwe");
//   return token;
// };

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: new passwordComplexity({
      min: 8,
      max: 30,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
    }),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
