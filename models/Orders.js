const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const subProductsSchema = new Schema({
    product_id: ObjectId,
    amount: Number
  });

const OrderSchema = new Schema({
  user_id: ObjectId,
  order_time: Date,
  nfts: [subProductsSchema],
  total_price: Number,
  status: {
    type: String,
    enum: ['unpaid', 'paid','delivered','ont the way']
  }});

module.exports = mongoose.model('orders', OrderSchema);