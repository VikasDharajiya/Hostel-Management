const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminSchema");
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Your email or password is wrong" });
    }

    const isMatch = admin?.password == password;

    if (!isMatch) {
      return res.status(401).json({ message: "Your email or password is wrong" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
   
    );

    res.status(200).json({
      status: true,
      data: {
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          mobile: admin.mobile,
          address: admin.address,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    res.json({status: true, admin});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, mobile, address } = req.body;

    const admin = await Admin.findById(req.admin._id).select('-password');

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (mobile) admin.mobile = mobile;
    if (address) admin.address = address;

    await admin.save();

    res.json({status: true,admin});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, adminId } = req.body;
    const admin = await Admin.findById(adminId);
    const isMatch = admin.password == currentPassword;
    if (!isMatch) {
      return res.status(400).json({status: false, error: {message: "Current password is incorrect"} });
    }

    admin.password = newPassword;
    await admin.save();
    res.status(200).json({status:true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};