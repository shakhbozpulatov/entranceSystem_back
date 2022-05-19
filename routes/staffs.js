const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Staff, validate } = require("../model/staffs");

router.get("/", async (req, res) => {
  const staffs = await Staff.find().sort("name");
  res.send(staffs);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let staff = new Staff({
    name: req.body.name,
    phone: req.body.phone,
    experience: req.body.experience,
  });
  staff = await staff.save();

  res.status(201).send(staff);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let staff = await Staff.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      experience: req.body.experience,
    },
    { new: true }
  );

  if (!staff) {
    return res.status(404).send("Berilgan ID ga teng bo'lgan toifa topilmadi");
  }

  res.send(staff);
});

router.delete("/:id", async (req, res) => {
  let staff = await Staff.findByIdAndDelete(req.params.id);
  if (!staff) {
    return res.status(404).send("Berilgan ID ga teng bo`lgan toifa topilmadi");
  }

  res.send(staff);
});

module.exports = router;
