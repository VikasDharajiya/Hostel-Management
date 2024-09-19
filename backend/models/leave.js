const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentID: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  leaveType: {
    type: String,
    required: true,
  },
  leaveReason: String,
  inDate: {
    type: Date,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  parentEmail: {
    type: String,
    required: true,
  },
  outDate: {
    type: Date,
    required: true,
  },

  contactNo: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending", 
  },
});

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
