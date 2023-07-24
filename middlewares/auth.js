import jwt from "jsonwebtoken";
import { ExpressError } from "../expressError.js";

function authenticateJWT(req, res, next) {
  // If JWT is provided and is verified, add the payload to the req object
  try {
    console.log("made it to authenticateJWT");
    console.log(req.headers);

    const token = req.headers.authorization.replace("Bearer ", "");
    console.log("🚀 ~ file: auth.js:11 ~ authenticateJWT ~ token:", token);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🚀 ~ file: auth.js:8 ~ authenticateJWT ~ payload:", payload);
    req.user = payload;
    return next();
  } catch (error) {
    // If no JWT provided, then continue without a payload in the req object
    console.log("🚀 ~ file: auth.js:11 ~ authenticateJWT ~ error:", error);
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    console.log("req.user in ensureloggedin", req.user);
    if (!req.user) {
      console.log("made it to ensureLoggedIn");
      throw new ExpressError("Unauthorized", 401);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

function ensureUserIsAdmin(req, res, next) {
  try {
    console.log("req.user in ensureUserIsAdmin", req.user);
    if (req.user.isClient) {
      throw new ExpressError("Unauthorized: User is not an Admin", 401);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}
function ensureUserIsAdminOrCorrectClient(req, res, next) {
  try {
    console.log("req.user in ensureUserIsAdmin", req.user);
    console.log("req.params", req.params);
    if (!req.user.isClient || req.user.username !== req.params.username) {
      throw new ExpressError("Unauthorized: User is not an Admin", 401);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

export {
  authenticateJWT,
  ensureLoggedIn,
  ensureUserIsAdmin,
  ensureUserIsAdminOrCorrectClient,
};
