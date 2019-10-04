var express = require('express');
var router = express.Router();
const categoryController = require('../controller/category.controller');


router.get('/', categoryController.categorylist);

router.get('/subCategory/:id', categoryController.subCategorylist);

router.post('/add', categoryController.create);

module.exports = router;
