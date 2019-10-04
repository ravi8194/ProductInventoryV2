const category = require('../model/category.model');

module.exports = {
    create: function(data) {
        return category.create(data);
    },
    getById: function(id) {
        return category.findById(id);
    },
    update: function(id, data) {
        return category.findByIdAndUpdate(id, data, {new: true});
    },
    delete: function(id) {
        return category.deleteOne({_id: id});
    },
    categorylist: function() {
        return category.find({"parent_id" : null});
    },
    subCategorylist: function(id) {
        return category.find({"parent_id": id})
    }
};