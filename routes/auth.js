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
// The passport.authenticate method is acting as middleware here

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// Logout user
// /GET  /auth/logout
// Passport attaches a logout method on the request object once we've logged in, and that's what we call here.
// Invoking logout() will remove the req.user property and clear the login session

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
