const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const adminAuthRoutes = require("./routes/adminAuthRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/admin", adminAuthRoutes);

app.get("/", function (req, res) {
  res.send("welcome to cancraft admin panel backend!");
});

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
