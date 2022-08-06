// Basic express configuration
const express = require("express");
const app = express();

// Environmental variables
require("dotenv").config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;

// Database connection
const connectDB = require("./config/db");
connectDB();

// sets up logging in the console window, but only while in development mode
const morgan = require("morgan");
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// sets up templating engine, static file handling and request parsing
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views"); // Here is where I could specify another location for the "views" documents
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions & session storage
const session = require("express-session");
const MongoStore = require("connect-mongo");
app.use(
  session({
    secret: "super secret signal",
    // Don't save a session if nothing is modified
    resave: false,
    // Don't create a session until something is stored
    saveUninitialized: false,
    // store the session token in the database
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,
      // autodelete the token when the session is finished
      autoRemove: "native",
    }),
  })
);

// Passport config & taking into use
const passport = require("passport");
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Mommy, where do routes come from?
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

/* DB connection for when I was trying to work with vanilla MongoDB.  If I had continued this route, db.client would have given me access to the database methods. */
/*
const db = require("./config/db");
db.connectDB();
*/
