var express = require('express');
var router = express.Router();
const userController = require('../controller/user.controller');

const userValidate = require('../middleware/userValidation.middleware');

router.get('/', userController.List);

router.post('/signup', userValidate.signupValidation, userController.Signup);

router.post('/login', userValidate.loginValidation, userController.Login);
router.post('/socialLogin', userController.SocialLogin);

router.delete('/:userId', userController.Delete);

module.exports = router;
