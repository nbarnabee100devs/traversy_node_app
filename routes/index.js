// The home for top-level routes

const express = require("express");
const router = express.Router();

// Login/Landing page
// GET /
// Note that I must specify the layout, since I did not define it globally in app.js

router.get("/", (req, res) => {
  res.render("login.ejs", { layout: "./layouts/main" });
});

// Dashboard
// GET /dashboard

router.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs", { layout: "./layouts/main" });
});

module.exports = router;
