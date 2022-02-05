const express = require("express");

const restaurantRouter = require("./routes/restaurant");

require("dotenv").config();
require("./db/connection");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

app.use("/restaurants", restaurantRouter);
