const express = require("express");
const router = express.Router();
const {
  createMedicalRequest,
  getAllMedicalRequests,
  updateMedicalRequestStatus,
} = require("../controllers/medicalController");

router.post("/", createMedicalRequest);

router.get("/", getAllMedicalRequests);

router.patch("/:id/status", updateMedicalRequestStatus);


module.exports = router;
