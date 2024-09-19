const express = require("express");
const router = express.Router();
const { createAccommodation, getAllAccommodations } = require("../controllers/accommodationController");

router.post("/", createAccommodation);

router.get("/", getAllAccommodations);


module.exports = router;
