// REQUIRE MONGOOSE LIBRARY
const mongoose = require('mongoose');
// INITIALIZE A SCHEMA
const { Schema } = mongoose;
// VARIABLES FOR SCHEMA
const requiredObject = { type: Object };
// DEFINING OUR logEntrySchema SCHEMA
const OrderSchema = new Schema(
  {
    order: requiredObject,
  },
  { timestamps: true }
);
// INSTANTIATE A MODEL WITH OUR SCHEMA
const Order = mongoose.model('orders', OrderSchema);
// EXPORT OUR MODEL
module.exports = Order;
