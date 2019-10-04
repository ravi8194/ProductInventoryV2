const categoryService = require('../service/category.service');

module.exports = {
  create: function(req, res) {
    const postData = req.body;
    if (!postData || postData === undefined || postData === null) {
      return res.json({
        status: true,
        message: 'Please provide category details first'
      });
    }

    return categoryService
      .create(postData)
      .then(result => {
        if (result) {
          return res.json({
            status: true,
            category: {
              id: result._id
            }
          });
        } else {
          return res.json({
            status: true,
            message: 'Error occured while creating new category'
          });
        }
      })
      .catch(err => {
        console.log(err);
        return res.json({
          status: false,
          message: 'Error occured while creating new category'
        });
      });
  },
  categorylist: function(req, res) {
    return categoryService
      .categorylist()
      .then(result => {
        if (result.length) {
          return res.json({
            status: true,
            category: result
          });
        } else {
          return res.json({
            status: true,
            category: [],
            message: 'No category record found'
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  subCategorylist: function(req, res) {
    const categoryId = req.params.id;
    return categoryService
      .subCategorylist(categoryId)
      .then(result => {
        if (result.length) {
          return res.json({
            status: true,
            category: result
          });
        } else {
          return res.json({
            status: true,
            category: [],
            message: 'No category record found'
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  update: function(req, res) {
    console.log('request' + req);
    const postData = req.body;
    const categoryId = req.params.id;
    if (!postData || postData === undefined || postData === null) {
      return res.json({
        status: true,
        message: 'Please provide prduct detail first'
      });
    }

    if (!categoryId) {
      return res.json({
        status: true,
        message: 'Please provide category id first'
      });
    }

    return categoryService
      .update(categoryId, postData)
      .then(category => {
        if (category) {
          return res.json({
            status: true,
            category: category
          });
        } else {
          return res.json({
            status: true,
            message: 'Error occured while updating category'
          });
        }
      })
      .catch(function(err) {
        console.log(err);
        return res.json({
          status: false,
          message: 'Error occured while updating hero'
        });
      });
  },
  delete: function(req, res) {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.json({
        status: true,
        message: 'Please provide category id first'
      });
    }

    return categoryService
      .delete(categoryId)
      .then(result => {
        if (result) {
          return res.json({
            status: true,
            message: 'category deleted'
          });
        } else {
          return res.json({
            status: true,
            message: 'Error occured while deleting category'
          });
        }
      })
      .catch(err => {
        console.log(err);
        return res.json({
          status: false,
          message: 'Error occured while deleting new category'
        });
      });
  },
  getById: function(req, res) {
    const categoryId = req.params.id;
    return categoryService
      .getById(categoryId)
      .then(result => {
        if (result) {
          return res.json({
            status: true,
            category: result
          });
        } else {
          return res.json({
            status: true,
            category: [],
            message: 'No category record found'
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
