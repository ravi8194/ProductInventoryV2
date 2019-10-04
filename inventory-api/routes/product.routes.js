const express = require('express');
const multer = require('multer');
const router = express.Router();

var productController = require('../controller/product.controller');
const checkAuth = require('../middleware/check-auth');
const productValidate = require('../middleware/productValidation.middleware')
  .productValidate;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var destPath = './uploads/images/';
    cb(null, destPath);
  },
  filename: function(req, file, cb) {
    cb(
      null,
      new Date().toDateString() +
        Math.floor(1000 + Math.random() * 9000) +
        file.originalname
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    //reject file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/', checkAuth, productController.list);

router.post(
  '/add',
  checkAuth,
  upload.single('productImage'),
  productValidate,
  productController.create
);

router.post(
  '/update/:id',
  checkAuth,
  upload.single('productImage'),
  productValidate,
  productController.update
);

router.delete('/delete/:id', checkAuth, productController.delete);
router.put('/softDelete', checkAuth, productController.softDelete);
router.get('/:id', productController.getById);

module.exports = router;
