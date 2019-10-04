const mongoose = require('mongoose');

const Order = require('../model/order.model');

module.exports = {
  get: (req, res, next) => {
    Order.find({})
      .select('quantity product user _id')
      .populate('product', 'productName price productImage rating')
      .exec()
      .then(doc => {
        const response = {
          count: doc.length,
          success: true,
          order: doc.map(doc => {
            return {
              quantity: doc.quantity,
              product: doc.product,
              _id: doc._id
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json({ error: err });
        console.log(err);
      });
  },
  create: (req, res, next) => {
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId,
      user: req.body.userId
    });
    order
      .save()
      .then(result => {
        res.status(201).json({
          success: true,
          message: 'product ordered successfully',
          createOrder: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },
  getById: (req, res, next) => {
    const id = req.params.id;
    Order.find({ user: id })
      .select('quantity product _id created_at user')
      .populate('product', 'productName price productImage rating seller')
      .populate()
      .exec()
      .then(doc => {
        const response = {
          count: doc.length,
          success: true,
          order: doc.map(doc => {
            let total = 0;
            for (let i of doc.product) {
              total += i.price;
            }
            return {
              quantity: doc.quantity,
              product: doc.product,
              totalPrice: total,
              _id: doc._id,
              user: doc.user,
              orderedDate: doc.created_at
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json({ error: err });
        console.log(err);
      });
  },
  calculateTotal: data => {
    console.log(data);
    let total = 0;
    for (let i of data) {
      total += i.price;
    }
    return total;
  }
};
