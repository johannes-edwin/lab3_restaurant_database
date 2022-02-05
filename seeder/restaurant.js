const Restaurant = require("../models/restaurant");
const restaurants = require("./data").restaurants

exports.run = () => {
  try {
    console.log("[STARTED] Seeding Restaurants Data");
    restaurants.map(async (restaurant) => {
      await (new Restaurant(restaurant)).save()
    })
    console.log("[FINISH] Seeding Restaurants Data");
  } catch (error) {
    console.log(error.message);
  }
}
