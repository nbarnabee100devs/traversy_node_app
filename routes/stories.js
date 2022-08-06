// Routes for adding stories

const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Story = require("../models/Story");

// Add route to the "add a story" page
// GET

router.get("/add", ensureAuth, (req, res) => {
  res.render("./stories/add.ejs", {
    layout: "./layouts/main.ejs",
  });
});

module.exports = router;
