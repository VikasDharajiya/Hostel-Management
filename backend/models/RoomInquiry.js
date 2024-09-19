const mongoose = require("mongoose");

const roomInquirySchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    inquireType: {
      type: String,
      enum: ["Immediate Solution", "Suggestion"],
      required: true,
    },
    inquiriesCategory: {
      type: String,
      enum: [
        "Room Change",
        "New Room Request for Friend",
        "Roommate Problem",
        "Room Services",
        "Other",
      ],
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
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

module.exports = mongoose.model("RoomInquiry", roomInquirySchema);
