const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/login.controller.js');

router.get('/', getUser);

module.exports = router;