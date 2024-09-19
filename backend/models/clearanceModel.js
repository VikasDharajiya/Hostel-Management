const mongoose = require("mongoose");

const clearanceSchema = new mongoose.Schema(
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
    registrationYear: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  
    handOverDate: {
      type: Date,
      required: true,
    },
    otherNotes: {
      type: String,
    },
    certified: {
      type: Boolean,
      required: true,
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

module.exports = mongoose.model("Clearance", clearanceSchema);
