const express = require("express");
const router = express.Router();
const {
  createMentoringRequest,
  getAllMentoringRequests,
  updateMentoringRequestStatus,
} = require("../controllers/mentoringController");

router.post("/", createMentoringRequest);

router.get("/", getAllMentoringRequests);

router.patch("/:id/status", updateMentoringRequestStatus);

module.exports = router;
