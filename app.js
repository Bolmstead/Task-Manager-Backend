"use strict";

import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import { authenticateJWT } from "./middlewares/auth.js";
import "./models/task.model.js";
import "./models/user.model.js";
import "./models/assignment.model.js";

import { ExpressError } from "./expressError.js";
import routes from "./routes/index.js";

// const error = require("../api/middlewares/error");

// import { authenticateJWT } from "./middleware/auth";
// import productsRoutes from "./routes/tasksRoutes";

import morgan from "morgan";
// import initializePassport from "./config/passport-config.js"
// import passport from "passport"
// initializePassport(passport)

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(json());
app.use(morgan("tiny"));
app.use(urlencoded({ extended: true }));
app.use(authenticateJWT);
app.use("/", routes);
// if error is not an instanceOf APIError, convert it.
// app.use(error.converter);

// catch 404 and forward to error handler
// app.use(error.notFound);

// app.use(authenticateJWT);

// app.use("/products", productsRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new ExpressError(`Not Found`, 404));
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "development") {
    console.error(err.stack);
  }
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export default app;
