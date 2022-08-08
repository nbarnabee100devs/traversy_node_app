// Routes for adding stories

const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Story = require("../models/Story");

// Add route to the "Show all stories" page
// GET /stories (recall that the "stories") is implied; if it wasn't "stories" these routes wouldn't be getting called in the first place

router.get("/", ensureAuth, async (req, res) => {
  try {
    let stories = await Story.find({ status: "public" })
      .populate("user") // adds the key/values of the associated user documents to the story documents
      .sort({ createdAt: -1 })
      .lean();
    console.log(stories);
    res.render("./stories/index.ejs", {
      layout: "./layouts/main.ejs",
      stories,
    });
  } catch (error) {
    console.log(error);
    let stories = [];
    res.render("error/500", { layout: "./layouts/main.ejs" });
  }
});

// Add route to POST a story (process the form)
// POST /stories

router.post("/", ensureAuth, async (req, res) => {
  try {
    // note that req.user returns an object containing the MongoDB ObjectId associated with said user
    // we attach it to the req.body so that the two documents will be associated in the database
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    res.render("error/500", { layout: "./layouts/main.ejs" });
  }
});

// Add route to the "add a story" page
// GET

router.get("/add", ensureAuth, (req, res) => {
  res.render("./stories/add.ejs", {
    layout: "./layouts/main.ejs",
  });
});

module.exports = router;
