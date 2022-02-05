const { check, validationResult } = require("express-validator");

const Restaurant = require("../models/restaurant");
const responseBuilder = require("../utils/response-builder");

const fetchAllBySort = async (req, res) => {
  const { sortBy } = req.query;

  const SORT_VALUE = {
    ASC: 1,
    DESC: -1,
  };

  if (!(sortBy in SORT_VALUE)) {
    return responseBuilder.BAD_REQUEST(
      res,
      "Sort parameter value not understandable!"
    );
  }

  try {
    const result = await Restaurant.find()
      .select("restaurant_id name cuisine city")
      .sort({ restaurant_id: SORT_VALUE[sortBy] });

    return responseBuilder.OK(res, result);
  } catch (error) {
    return responseBuilder.BAD_REQUEST(res, error.message);
  }
};

const fetchAllDetails = async (req, res) => {
  try {
    const result = await Restaurant.find();
    return responseBuilder.OK(res, result);
  } catch (error) {
    return responseBuilder.BAD_REQUEST(res, error.message);
  }
};

exports.fetchAll = async (req, res) => {
  await check("sortBy").notEmpty().run(req);

  const result = validationResult(req);
  if (result.isEmpty()) {
    return await fetchAllBySort(req, res);
  }
  return await fetchAllDetails(req, res);
};

exports.fetchByCuisine = async (req, res) => {
  const { type } = req.params;

  try {
    const result = await Restaurant.find({
      cuisine: type,
    });
    return responseBuilder.OK(res, result);
  } catch (error) {
    return responseBuilder.BAD_REQUEST(res, error.message);
  }
};

exports.fetchByDelicatessenCuisine = async (req, res) => {
  try {
    const result = await Restaurant.find({
      cuisine: "Delicatessen",
      city: { $ne: "Brooklyn" },
    })
      .select("restaurant_id name cuisine city -_id")
      .sort({ name: 1 });
    return responseBuilder.OK(res, result);
  } catch (error) {
    return responseBuilder.BAD_REQUEST(res, error.message);
  }
};
