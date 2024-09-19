const express = require("express");
const router = express.Router();
const {
  createClearanceRequest,
  getAllClearanceRequests,
  updateClearanceRequestStatus,
} = require("../controllers/clearanceController");

router.post("/", createClearanceRequest);

router.get("/", getAllClearanceRequests);

router.patch("/:id/status", updateClearanceRequestStatus);

module.exports = router;
