import jwt from "jsonwebtoken";

function authenticateJWT(req, res, next) {
  // If JWT is provided and is verified, add the payload to the req object
  try {
    console.log("made it to authenticateJWT");
    console.log(req.headers);
    const payload = jwt.verify(req.body.token, process.env.JWT_SECRET);
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
  if (!req.user) {
    console.log("made it to ensureLoggedIn");
    // const e = new ExpressError("Unauthorized", 401);
    let e = { error: "error" };
    return next(e);
  } else {
    return next();
  }
}
export { authenticateJWT, ensureLoggedIn };
