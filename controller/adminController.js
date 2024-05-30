const Admin = require("../models/AdminAuthModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ADMIN_JWT_SCERET, { expiresIn: "3d" });
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.adminLogin(email, password);

    const token = createToken(admin._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const admin = await Admin.adminSignup(name, email, password);

    const token = createToken(admin._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { adminLogin, adminRegister };
