const mongoose = require('mongoose');
const productService = require('../service/product.service');
const Product = require('../model/product.model');

module.exports = {
  create: function(req, response, next) {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      productName: req.body.productName,
      price: req.body.price,
      rating: req.body.rating,
      seller: req.body.seller,
      status: req.body.status,
      description: req.body.description,
      category: req.body.category,
      subCategory: req.body.subCategory,
      productImage: 'http://localhost:7000/' + req.file.path
    });

    if (!product || product === undefined || product === null) {
      return response.json({
        success: false,
        message: 'Please provide Product Information...'
      });
    }
    return productService
      .create(product)
      .then(result => {
        console.log(result);
        response.status(201).json({
          message: 'Create Product Successfully',
          success: true,
          createProduct: {
            userId: result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        return response.json({
          success: false,
          message: 'Error occured while creating new product'
        });
      });
  },

  list: function(req, res) {
    const page = req.query.pageNo * 1 || 1;
    const limit = req.query.size * 1 || 100;
    var category = [];
    let conditions = {};
    let userOptions = [{ isArchived: false }];
    var totalCount = 1;
    if (req.userData.role === 'admin' || req.userData.role === 'user') {
      userOptions.push({});
    } else {
      userOptions.push({ seller: req.userData.userId });
    }

    if (req.query && req.query.category) {
      var category = JSON.parse(req.query.category);
      let categoryId = category.map(data => mongoose.Types.ObjectId(data));
      if (categoryId.length) {
        let cat = { subCategory: { $in: categoryId } };
        userOptions.push(cat);
      }
    }
    if (req.query && req.query.user) {
      var user = JSON.parse(req.query.user);
      if (user.length) {
        let id = { seller: { $in: user } };
        userOptions.push(id);
      }
    }
    conditions = { $and: userOptions };
    productService.list(conditions).count((err, count) => {
      if (err) {
        return err;
      } else {
        totalCount = count;
        return productService
          .list(conditions)
          .skip((page - 1) * limit)
          .limit(limit)
          .then(result => {
            if (result.length) {
              return res.json({
                success: true,
                message: 'products fetched',
                pageCount: Math.ceil(totalCount / limit),
                product: result.map(product => {
                  return {
                    _id: product._id,
                    productName: product.productName,
                    price: product.price,
                    rating: product.rating,
                    productImage: product.productImage,
                    description: product.description,
                    category: product.category,
                    seller: product.seller
                  };
                })
              });
            } else {
              return res.json({
                success: true,
                product: [],
                message: 'No product record found'
              });
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    });
  },
  update: function(req, res) {
    let postData = req.body;
    if (req.file) {
      postData.productImage = 'http://localhost:7000/' + req.file.path;
    }
    const productId = req.params.id;
    if (!postData || postData === undefined || postData === null) {
      return res.json({
        success: true,
        message: 'Please provide prduct detail first'
      });
    }

    if (!productId) {
      return res.json({
        success: true,
        message: 'Please provide product id first'
      });
    }

    return productService
      .update(productId, postData)
      .then(product => {
        if (product) {
          return res.json({
            success: true,
            message: 'Product data updated',
            product: {
              id: product.id,
              productName: product.productName,
              price: product.price,
              rating: product.rating
            }
          });
        } else {
          return res.json({
            success: true,
            message: 'Error occured while updating product'
          });
        }
      })
      .catch(function(err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Error occured while updating product'
        });
      });
  },
  delete: function(req, res) {
    const productId = req.params.id;

    if (!productId) {
      return res.json({
        success: true,
        message: 'Please provide product id first'
      });
    }

    return productService
      .delete(productId)
      .then(result => {
        if (result) {
          return res.json({
            success: true,
            message: 'product deleted'
          });
        } else {
          return res.json({
            success: true,
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
  },
  softDelete: function(req, res) {
    let data = { isArchived: req.body.value };
    const productId = req.body._id;

    if (!productId) {
      return res.json({
        success: true,
        message: 'Please provide product id first'
      });
    }

    return productService
      .update(productId, data)
      .then(product => {
        if (product) {
          return res.json({
            success: true,
            message: 'Product updated',
            product: {
              id: product.id,
              productName: product.productName,
              price: product.price,
              rating: product.rating
            }
          });
        } else {
          return res.json({
            success: true,
            message: 'Error occured while updating product'
          });
        }
      })
      .catch(function(err) {
        console.log(err);
        return res.json({
          success: false,
          message: 'Error occured while updating product'
        });
      });
  },
  getById: function(req, res) {
    const productId = req.params.id;
    return productService
      .getById(productId)
      .then(result => {
        if (result) {
          return res.json({
            success: true,
            product: result
          });
        } else {
          return res.json({
            success: true,
            product: [],
            message: 'No product record found'
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
