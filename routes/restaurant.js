const express = require("express");

const restaurantController = require("../controllers/restaurant");

restaurantRouter = express.Router();

restaurantRouter.get("/", restaurantController.fetchAll);
restaurantRouter.get("/cuisine/:type", restaurantController.fetchByCuisine);
restaurantRouter.get(
  "/Delicatessen",
  restaurantController.fetchByDelicatessenCuisine
);

module.exports = restaurantRouter;
