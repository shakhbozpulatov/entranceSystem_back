const { User } = require("../model/user");
const express = require("express");
const Joi = require("joi");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email yoki parol noto`g`ri");
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(400).send("Email yoki parol noto`g`ri");
  }

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  res.header("x-auth-token", token).send(true);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;