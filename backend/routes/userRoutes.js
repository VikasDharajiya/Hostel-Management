
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/getAllUsers", userController.getAllUsers);
router.put("/update-profile", userController.updateProfile);
router.put("/change-password", userController.changePassword);
router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-otp", userController.verifyOTP);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
