const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  street: String,
  postalCode: String,
  city: String,
  province: String,
  country: String
});

const UserSchema = new Schema({
  email_address: String,
  password: String,  
  first_name: String,
  last_name: String,
  phone_number: String,
  delivery_address: AddressSchema,
  image: String,
});

module.exports = mongoose.model('users', UserSchema);