const express = require("express");
const router = express.Router();
const {
  createCleaningRequest,
  getAllCleaningRequests,
  updateCleaningRequestStatus,
} = require("../controllers/cleaningController");

router.post("/", createCleaningRequest);

router.get("/", getAllCleaningRequests);

router.patch("/:id/status", updateCleaningRequestStatus);


module.exports = router;
