const User = require('../model/user');

module.exports = {
  list: function(condition) {
    return User.find(condition);
  },
  login: function(userName) {
    return User.find({ userName: userName });
  },
  signUp: function(data) {
    return User.create(data);
  },
  delete: function(id) {
    return User.deleteOne({ _id: id });
  },
  upsertUser: async function(data) {
    var query = {
        email: data.email
      },
      update = { userName: data.userName, role: 'user' },
      options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const result = await User.findOneAndUpdate(query, update, options);
    console.log(result);
    return result;
  }
};
