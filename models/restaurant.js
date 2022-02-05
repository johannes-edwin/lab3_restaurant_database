const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  building: String,
  zipcode: String,
  street: String,
});

const RestaurantSchema = new mongoose.Schema({
  restaurant_id: Number,
  name: String,
  cuisine: String,
  city: String,
  address: AddressSchema,
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
