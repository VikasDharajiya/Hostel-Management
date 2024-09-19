const Room = require('../models/room');
const User = require('../models/user');


exports.createRoom = async (req, res) => {
    try {
      const { roomNumber, capacity } = req.body;
      const room = new Room({ roomNumber, capacity });
      await room.save();
      res.status(201).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.getAllRooms = async (req, res) => {
    try {
      const rooms = await Room.find().populate('assignedUsers', 'name email');
      res.status(200).json(rooms);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.updateRoom = async (req, res) => {
    try {
      const { id, roomNumber, capacity } = req.body;
      const room = await Room.findById(id);
      if (!room) return res.status(404).json({ error: 'Room not found' });
  
      room.roomNumber = roomNumber;
      room.capacity = capacity;
      await room.save();
  
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.deleteRoom = async (req, res) => {
    try {
      const { id } = req.params;
      await Room.findByIdAndDelete(id);
      res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.assignUsersToRoom = async (req, res) => {
    try {
      const { roomId, userIds } = req.body;
      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ error: 'Room not found' });
  
      if (room.assignedUsers.length + userIds.length > room.capacity) {
        return res.status(400).json({ error: 'Room capacity exceeded' });
      }
  
      room.assignedUsers = [...new Set([...room.assignedUsers, ...userIds])];
      await room.save();
  
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.removeUserFromRoom = async (req, res) => {
    try {
      const { roomId, userId } = req.body;
      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ error: 'Room not found' });
  
      room.assignedUsers = room.assignedUsers.filter(user => user.toString() !== userId);
      await room.save();
  
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.getUnassignedUsers = async (req, res) => {
    try {
      const assignedUserIds = (await Room.find().select('assignedUsers')).flatMap(room => room.assignedUsers);
      const unassignedUsers = await User.find({ _id: { $nin: assignedUserIds } });
      res.status(200).json(unassignedUsers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };