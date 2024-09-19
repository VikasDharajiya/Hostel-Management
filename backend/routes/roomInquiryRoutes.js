const express = require("express");
const router = express.Router();
const roomInquiryController = require("../controllers/roomInquiryController");

router.post("/", roomInquiryController.createRoomInquiry);

router.get("/", roomInquiryController.getAllRoomInquiries);

router.get("/:id", roomInquiryController.getRoomInquiryById);

router.put("/:id", roomInquiryController.updateRoomInquiry);

router.delete("/:id", roomInquiryController.deleteRoomInquiry);

router.patch("/:id/status", roomInquiryController.updateRoomInquiry);

module.exports = router;
