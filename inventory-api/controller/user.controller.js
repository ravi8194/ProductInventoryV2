const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../model/user');

const SecretKey = require('../config/config');

const userService = require('../service/user.service');
const googleValidate = require('../middleware/google-auth');

module.exports = {
  List: (req, res, next) => {
    return userService
      .list({ role: 'seller' })
      .then(result => {
        if (result.length) {
          return res.json({
            success: true,
            message: 'users fetched',
            user: result.map(user => {
              return {
                id: user._id,
                userName: user.userName
              };
            })
          });
        } else {
          return res.json({
            success: true,
            user: [],
            message: 'No user record found'
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  Login: (req, res, next) => {
    userService
      .login(req.body.userName)
      .then(user => {
        if (user.length < 1) {
          return res.json({
            success: 0,
            message: 'Invalid Username or Password...'
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Invalid Username or Password...'
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                userName: user[0].userName,
                email: user[0].email,
                userId: user[0]._id,
                role: user[0].role
              },
              SecretKey.JWT_kEY,
              {
                expiresIn: '1h'
              }
            );
            return res.status(200).json({
              success: true,
              message: 'Auth Successful',
              Token: token
            });
          }
          res.status(404).json({
            success: false,
            message: 'Auth failed'
          });
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  },
  SocialLogin: (req, res, next) => {
    let login = req.body;
    googleValidate
      .getGoogleUser(login.authToken)
      .then(user => {
        const data = {
          userName: user.name,
          email: user.email,
          googleId: user.id,
          role: 'user'
        };
        userService
          .upsertUser(data)
          .then(result => {
            const token = jwt.sign(
              {
                userName: result.userName,
                email: result.email,
                role: result.role,
                userId: result._id
              },
              SecretKey.JWT_kEY,
              {
                expiresIn: '1h'
              }
            );
            return res.status(200).json({
              success: true,
              message: 'Auth Successful',
              token: token
            });
          })
          .catch(e => {
            console.log(e);
            throw new Error(e);
          });
      })
      .catch(e => {
        console.log(e);
        throw new Error(e);
      });
  },

  Signup: (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = new User({
          userName: req.body.userName,
          email: req.body.email,
          password: hash,
          role: req.body.role
        });
        userService
          .signUp(user)
          .then(result => {
            res.status(201).json({
              message: 'User Signup Successful',
              success: true
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err,
              success: false,
              message: 'signup failed'
            });
          });
      }
    });
  },
  Delete: (req, res, next) => {
    const id = req.params.userId;
    userService
      .delete(id)
      .exec()
      .then(result => {
        if (result) {
          return res.json({
            success: true,
            message: 'user deleted'
          });
        } else {
          return res.json({
            success: false,
            message: 'Error occured while deleting product'
          });
        }
      })
      .catch(err => {
        console.log(err);
        return res.json({
          success: false,
          message: 'Error occured while deleting new product'
        });
      });
  }
};
