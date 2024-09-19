const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authenticate = require("../middleware/authenticate");

router.post('/date', authenticate, attendanceController.getAttendanceByDate);
router.put('/update', authenticate, attendanceController.updateAttendance);

module.exports = router;
