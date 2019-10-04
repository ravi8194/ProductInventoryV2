const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const producRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');
const orderRoute = require('./routes/order.routes');

const PORT = require('./config/config').PORT;
const db = require('./config/database');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads/', express.static('uploads'));
app.use(cors());

app.use('/product', producRoutes);
app.use('/users', userRoutes);
app.use('/order', orderRoute);
app.use('/categories', categoryRoutes);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

db();
module.exports = app;
