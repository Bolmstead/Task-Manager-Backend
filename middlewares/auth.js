import jwt from "jsonwebtoken";

function authenticateJWT(req, res, next) {
  try {
    const payload = jwt.verify(req.body.token, process.env.JWT_SECRET);
    req.user = payload;
    console.log("made it to authenticateJWT");
    return next();
  } catch (error) {
    console.log("made it to error");

    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    // const e = new ExpressError("Unauthorized", 401);
    let e = { error: "error" };
    return next(e);
  } else {
    return next();
  }
}
export { authenticateJWT, ensureLoggedIn };
