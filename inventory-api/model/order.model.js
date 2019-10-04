const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'newUser',
      required: true
    },
    product: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true }
    ],
    quantity: { type: Number, default: 1 }
  },
  {
    timestamps: {
      createdAt: 'created_at'
    }
  }
);

module.exports = mongoose.model('Order', orderSchema);
