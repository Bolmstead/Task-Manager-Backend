import jwt from "jsonwebtoken";
import { ExpressError } from "../expressError.js";

function authenticateJWT(req, res, next) {
  // If JWT is provided and is verified, add the payload to the req object
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    // If no JWT provided, then continue without a payload in the req object
    console.log(error);
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    if (!req.user) {
      throw new ExpressError("Unauthorized", 401);
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

function ensureUserIsAdmin(req, res, next) {
  try {
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
    if (req.user.isClient) {
      if (req.user.username !== req.params.username) {
        throw new ExpressError("Unauthorized: User is not an Admin", 401);
      }
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
