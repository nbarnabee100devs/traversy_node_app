// Routes related to authentication
// Recall that the first part of the path ("/auth") is specified in app.js

const express = require("express");
const router = express.Router();
const passport = require("passport");

// Google authentication
// GET /auth/google

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Google auth callback
// GET /auth/google/callback
// The passport.authenticate is acting as middleware here

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
