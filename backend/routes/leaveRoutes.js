const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

router.post("/", leaveController.createLeaveRequest);

router.get("/", leaveController.getAllLeaveRequests);

router.patch("/:id/status", leaveController.updateLeaveRequestStatus);

module.exports = router;
