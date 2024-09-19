const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const adminController = require("../controllers/adminController");

router.post("/login", adminController.login);
router.get("/profile", authenticate, adminController.getProfile);
router.put("/profile", authenticate, adminController.updateProfile);
router.put("/password", authenticate, adminController.updatePassword);
module.exports = router;
