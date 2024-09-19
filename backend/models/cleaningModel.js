const mongoose = require("mongoose");

const cleaningSchema = new mongoose.Schema(
  {
    accommodationBlock: {
      type: String,
      required: true,
    },
    roomID: {
      type: String,
      required: true,
    },
    studentID: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
    },
    requestDate: {
      type: Date,
      required: true,
    },
   
    cleaningLevel: {
      type: String,
      required: true,
    },
    mention: {
      type: String,
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

module.exports = mongoose.model("Cleaning", cleaningSchema);
