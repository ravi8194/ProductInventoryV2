const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const orderController = require('../controller/orderController');

router.post('/create', checkAuth, orderController.create);

router.get('/:id', checkAuth, orderController.getById);

module.exports = router;
