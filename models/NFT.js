const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const NFTSchema = new Schema({
  title: { type: String, required: true},
  author: { type: String, required: true},
  description: String,
  price: Number,
  volume: Number,
  imageURL: { type: String, default: "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"},
  owner: String // New field for the owner's wallet address
});

module.exports = mongoose.model('NFT', NFTSchema);