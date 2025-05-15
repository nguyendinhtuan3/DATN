const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const express = require("express");

const configureMiddleware = (app) => {
  // CORS
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  );

  // Express session
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

  // Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Body parser
  app.use(express.json());
};

module.exports = configureMiddleware;
