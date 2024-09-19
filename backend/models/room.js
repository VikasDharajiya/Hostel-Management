const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  assignedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
