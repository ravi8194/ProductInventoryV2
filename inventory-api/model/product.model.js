var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const productDataSchema = new Schema(
  {
    productName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    seller: {
      type: String,
      required: true
    },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    status: {
      type: String,
      required: true
    },
    isArchived: {
      type: Boolean,
      default: false,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    productImage: { type: String, required: true }
  },
  {
    timestamps: {
      createdAt: 'created_at'
    }
  }
);

var Products = mongoose.model('product', productDataSchema);
module.exports = Products;
