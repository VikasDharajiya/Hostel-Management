const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Room = require("../models/room");
const crypto = require("crypto");

const generateOTP = () => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++ ) {
     OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "error", message: "Email is not registered" });
    }

    const otpCode = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); 

    user.otp = {
      code: otpCode,
      expiry: otpExpiry,
    };
    await user.save();

    res.json({ status: "success", message: "OTP sent successfully", otp: otpCode });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};


exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "error", message: "Email is not registered" });
    }

    if (user.otp.code !== otp || user.otp.expiry < new Date()) {
      return res.status(400).json({ status: "error", message: "Invalid or expired OTP" });
    }

    user.otp = undefined;
    await user.save();

    res.json({ status: "success", message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ status: "success", message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, gender, password, parentEmail, phone } = req.body;
    const user = new User({ name, email, gender, password, parentEmail, phone });
    await user.save();
    const userData = await User.findOne({ email, password });
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
     
    );

    let roomData = null;
    const room = await Room.findOne({ assignedUsers: userData._id });
    if (room) {
      roomData = {
        roomNumber: room.roomNumber,
        room_id: room._id,
        capacity: room.capacity,
        alloted_spots: room.assignedUsers.length
      };
    }

    res.json({
      status: "success",
      data: {
        token,
        user: {
          id: userData?._id,
          name: userData?.name,
          email: userData?.email,
          gender: userData?.gender,
          parentEmail: userData?.parentEmail,
          phone: userData?.phone,
          room: roomData
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    const token = jwt.sign(
      { id: user?._id, email: user?.email },
      process.env.JWT_SECRET,
     
    );

    if (user) {
      let roomData = null;
      const room = await Room.findOne({ assignedUsers: user._id });
      if (room) {
        roomData = {
          roomNumber: room.roomNumber,
          room_id: room._id,
          capacity: room.capacity,
          alloted_spots: room.assignedUsers.length
        };
      }

      res.json({
        status: "success",
        data: {
          token,
          user: {
            id: user?._id,
            name: user?.name,
            email: user?.email,
            gender: user?.gender,
            parentEmail: user?.parentEmail,
            phone: user?.phone,
            room: roomData
          }
        }
      });
    } else {
      res.status(401).json({ status: "error", message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ status: "success", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, gender, parentEmail, phone, userId } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, gender, parentEmail, phone },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.json({
      status: true,
      message:"User Updated Successfully",
      data: {
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          gender: updatedUser.gender,
          parentEmail: updatedUser.parentEmail,
          phone: updatedUser.phone
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    const isMatch = user?.password == (currentPassword);
    if (!isMatch) {
      return res.status(400).json({ status: "error", message: "Current password is incorrect" });
    }
    user.password = newPassword;
    await user.save();
    res.json({ status: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

