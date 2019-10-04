const product = require('../model/product.model');

module.exports = {
    create: function(data) {
        return product.create(data);
    },
    getById: function(id) {
        return product.findById(id);
    },
    update: function(id, data) {
        return product.findByIdAndUpdate(id, data, {new: true});
    },
    delete: function(id) {
        return product.deleteOne({_id: id});
    },
    list: function(condition) {
        return product.find(condition);
    }
};