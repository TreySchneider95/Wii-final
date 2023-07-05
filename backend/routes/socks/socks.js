const express = require('express');
const router = express.Router();
const sockController = require('./controller/sockController')

router.get('/', sockController.all)

module.exports = router