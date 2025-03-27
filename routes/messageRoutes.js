const express = require('express');
const { saveMessage } = require('../controllers/messageController');

const router = express.Router();

router.post('/message', saveMessage); // POST route for saving messages

module.exports = router;
