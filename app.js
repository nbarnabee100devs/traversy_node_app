const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;

const db = require("./config/db");
db.connectDB();
// use db.client for all your db.client needs

// sets up logging in the console window, but only while in development mode
const morgan = require("morgan");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// sets up templating engine, static handling and request parsing
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views");

// Routes
app.use("/", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
