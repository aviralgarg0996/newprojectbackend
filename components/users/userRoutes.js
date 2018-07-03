const express = require('express');
const router = express.Router();
const userController = require('./userController');




router.post('/signup', userController.signup);
router.post('/fetchTest', userController.fetchTest);

module.exports = router;