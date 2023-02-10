// REQUIRE EXPRESS LIBRARY
const { Router } = require('express');
// REQUIRE OUR ANIMAL MODEL
const Animal = require('../models/Animal.js');
// REQUIRE OUR ORDER MODEL
const Order = require('../models/Order.js');
// INSTANCIATE AN EXPRESS ROUTE
const router = Router();

// A GET REQUEST TO FIND ALL ANIMALS
router.get('/', async (req, res, next) => {
  try {
    const entries = await Animal.find();
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

// A GET REQUEST TO FIND ANIMAL BY ID
router.get('/animal/:id', async (req, res, next) => {
  try {
    const entry = await Animal.findById(req.params.id);
    res.json(entry);
  } catch (err) {
    next(err);
  }
});

// A GET REQUEST TO FIND ALL ORDERS
router.get('/orders', async (req, res, next) => {
  try {
    const entries = await Order.find();
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

// A GET REQUEST TO FIND ORDER BY ID
router.get('/order/:id', async (req, res, next) => {
  try {
    const entry = await Order.findById(req.params.id);
    res.json(entry);
  } catch (err) {
    next(err);
  }
});

// A POST REQUEST TO ADD AN ORDER
router.post('/order/add/', async (req, res, next) => {
  try {
    const order = new Order({order: req.body});
    const createdOrder = await order.save();
    res.json(createdOrder);
  } catch (error) {
    console.log(error.name);
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

// EXPORT OUR ROUTER
module.exports = router;
