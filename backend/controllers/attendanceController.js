const Attendance = require('../models/attendance');
const User = require('../models/user');

exports.getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.body;
    const users = await User.find().select('-password');
    const attendanceRecords = await Attendance.find({ date: new Date(date) });

    const userAttendance = users.map(user => {
      const record = attendanceRecords.find(record => record.userId.toString() === user._id.toString());
      return {
        ...user.toObject(),
        attendanceStatus: record ? record.status : 'absent'
      };
    });

    res.json(userAttendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { date, attendance } = req.body;

    for (const record of attendance) {
      const { userId, status } = record;
      await Attendance.findOneAndUpdate(
        { userId, date: new Date(date) },
        { status },
        { upsert: true, new: true }
      );
    }

    res.json({ message: 'Attendance updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};