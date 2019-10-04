const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String },
  role: { type: String, required: true }
});

module.exports = mongoose.model('newUser', userSchema);
