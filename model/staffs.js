const mongoose = require("mongoose");
const Joi = require("joi");

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 12,
    maxlength: 12,
  },
  experience: {
    type: Number,
    required: true,
  },
});

function validateStaffs(staff) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
    phone: Joi.string().required().min(12).max(12),
    experience: Joi.number().required(),
  });

  return schema.validate(staff);
}

const Staff = mongoose.model("Staff", staffSchema);

exports.Staff = Staff;
exports.validate = validateStaffs;
