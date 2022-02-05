const restaurantSeeder = require("./restaurant");

require("../db/connection");

restaurantSeeder.run();

process.exitCode = 1;
