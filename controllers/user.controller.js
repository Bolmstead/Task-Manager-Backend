import { ExpressError } from "../expressError.js";
import User from "../models/user.model.js";

export async function getUserDetails(req, res, next) {
  try {
    const { username } = req.params;

    if (username !== req.user.username) {
      return next(new ExpressError(`Unauthorized`, 401));
    }

    const foundUser = await User.findOne({ username }).populate({
      path: "assignments",
      populate: {
        path: "task",
        model: "Task",
      },
    });

    if (foundUser) {
      foundUser.password = null;
      return res.json(foundUser);
    } else {
      return next(new ExpressError(`User not found`, 500));
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

export async function getAllClients(req, res, next) {
  try {
    const allClients = await User.find({ isClient: true });
    return res.json({ clients: allClients });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}
