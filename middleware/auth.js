// Here we are writing a function that has access to the request and response objects (middleware in a nutshell) and controls what we can access if we are or are not logged in.
// To be specific, anyone who's not logged in should be redirected away from the dashboard to the login page, and anyone who is logged in should be redirected away from the login page to the dashboard.

module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      // user is logged in, so move on to the next step
      return next();
    } else {
      res.redirect("/");
    }
  },

  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/dashboard");
    } else {
      return next();
    }
  },
};
