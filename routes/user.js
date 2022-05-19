const { User, validate } = require("../model/user");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("Mavjud bo`lgan foydalanuvchi");
  }

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt)

  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
