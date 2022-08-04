const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;
const db = require("./config/db");

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

db.connectDB();

// use db.client for all your db.client needs
