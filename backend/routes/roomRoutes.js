const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authenticate = require('../middleware/authenticate');

router.post('/create', authenticate, roomController.createRoom);
router.get('/all', authenticate, roomController.getAllRooms);
router.put('/update', authenticate, roomController.updateRoom);
router.delete('/delete/:id', authenticate, roomController.deleteRoom);
router.put('/assign', authenticate, roomController.assignUsersToRoom);
router.put('/remove-user', authenticate, roomController.removeUserFromRoom);
router.get('/unassigned-users', authenticate, roomController.getUnassignedUsers);

module.exports = router;
