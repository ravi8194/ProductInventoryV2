const jwt = require('jsonwebtoken');

const SecretKey = require('../config/config');

module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(header, SecretKey.JWT_kEY);
    req.userData = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};
