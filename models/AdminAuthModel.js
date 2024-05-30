const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");

const adminAuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminAuthSchema.statics.adminSignup = async function (name, email, password) {
  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const admin = await this.create({ name, email, password: hash });
  return admin;
};

adminAuthSchema.statics.adminLogin = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const admin = await this.findOne({ email });
  if (!admin) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return admin;
};

module.exports = mongoose.model("AdminAuth", adminAuthSchema);
