// The home for top-level routes

const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const mongoose = require("mongoose");
const User = require("../models/User");
const Story = require("../models/Story");

// Login/Landing page
// GET /
// Note that I must specify the layout, since I did not define it globally in app.js
// We are also including the ensureGuest middleware, which will redirect anyone who's logged in from the login page to the dashboard page

router.get("/", ensureGuest, (req, res) => {
  res.render("login.ejs", { layout: "./layouts/login" });
});

// Dashboard
// GET /dashboard
// We are including the ensureAuth middleware, which will redirect anyone who's not logged in from the dashboard to the login page (because people who aren't logged in should not be able to access the dashboard)

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    // with mongoose, .lean() will return an array of JSON objects
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard.ejs", {
      layout: "./layouts/main",
      name: currentUser.firstName,
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500", {
      layout: "./layouts/main",
    });
  }
});

module.exports = router;
