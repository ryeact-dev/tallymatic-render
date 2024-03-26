const express = require('express');
const {
  createEvent,
  getAllEvents,
} = require('../controllers/event.controller');
const { verifyToken } = require('../lib/helpers/verifyToken');

const router = express.Router();

router.get('/', verifyToken, getAllEvents);

router.post('/create-event', verifyToken, createEvent);

module.exports = router;
