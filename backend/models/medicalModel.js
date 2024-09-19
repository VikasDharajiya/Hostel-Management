const mongoose = require("mongoose");

const medicalSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
   
    studentEmail: {
      type: String,
      required: true,
    },
    roomID: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  
    illness: {
      type: String,
      required: true,
    },
    otherMention: {
      type: String,
    },
    sickPeriod: {
      type: Number,
      required: true,
    },
   
    appointmentTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Medical", medicalSchema);
