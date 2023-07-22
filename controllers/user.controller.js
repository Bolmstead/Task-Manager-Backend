import { ExpressError } from "../expressError.js";
import User from "../models/user.model.js";

/**
 * Login User
 */
export async function getUserDetails(req, res, next) {
  try {
    const { username } = req.params;
    console.log(
      "🚀 ~ file: auth.controller copy.js:12 ~ getUserDetails ~ username:",
      username
    );
    console.log(
      "🚀 ~ file: auth.controller copy.js:12 ~ getUserDetails ~ req.user.username:",
      req.user.username
    );

    if (username !== req.user.username) {
      return next(new ExpressError(`Unauthorized`, 401));
    }

    console.log("username matches param");
    let foundUser = await User.findOne({ username }).populate({
      path: "assignments",
      populate: {
        path: "task",
        model: "Task",
      },
    });
    console.log(
      "🚀 ~ file: user.controller.js:30 ~ foundUser ~ foundUser:",
      foundUser
    );

    if (foundUser) {
      foundUser.password = null;
      return res.json(foundUser);
    } else {
      return next(new ExpressError(`User not found`, 500));
    }
  } catch (error) {
    console.log("🚀 ~ file: auth.controller.js:134 ~ login ~ error:", error);
    return next(error);
  }
}
