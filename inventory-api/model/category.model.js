var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const categoryDataSchema = new Schema(
  {
    category_name: { type: String, required: true },
    parent_id: [this]
  },
  {
    timestamps: {
      createdAt: 'created_at'
    }
  }
);

var Category = mongoose.model('Category', categoryDataSchema);
module.exports = Category;
