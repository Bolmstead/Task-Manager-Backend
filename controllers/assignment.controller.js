import { ExpressError } from "../expressError.js";
import Assignment from "../models/assignment.model.js";
import User from "../models/user.model.js";

/**
 * Get all Assignments
 * @public
 */
export async function getAllAssignments(req, res) {
  try {
    const assignments = await Assignment.find()
      .populate("task")
      .populate("user")
      .sort({ createdAt: -1 });

    return res.json(assignments);
  } catch (error) {
    console.log(
      "🚀 ~ file: task.controller.js:63 ~ getAllTasks ~ error:",
      error
    );
    throw new ExpressError(error);
  }
}

/**
 * Get all Clients Assignments
 * @public
 */
export async function getAllClientAssignments(req, res) {
  try {
    const client = await User.find({ username: req.user.username })
      .populate("assignments")
      .populate("user")
      .sort({ createdAt: -1 });

    return res.json(assignments);
  } catch (error) {
    console.log(
      "🚀 ~ file: task.controller.js:63 ~ getAllTasks ~ error:",
      error
    );
    throw new ExpressError(error);
  }
}

/**
 * Get task details
 * @public
 */
export async function getAssignmentDetails(req, res) {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("user")
      .populate("task")
      .sort({ createdAt: -1 });

    return res.json(assignment);
  } catch (error) {
    console.log(
      "🚀 ~ file: task.controller.js:63 ~ getAllTasks ~ error:",
      error
    );
    throw new ExpressError(error);
  }
}

// /**
//  * Get task details
//  * @public
//  */
// export async function getTaskDetails(req, res) {
//   try {
//       let foundTask = await Task.findById(req.params.id).populate("assignments");
//       if (foundClient) {
//         const tasks = await Assignment.find({})
//           .populate("assignments")
//           .sort({ createdAt: -1 });
//         console.log(
//           "🚀 ~ file: task.controller.js:60 ~ getAllTasks ~ tasks:",
//           tasks
//         );
//       } else {
//         return next(new ExpressError(`Client not found`, 400));
//       }

//     return res.json(tasks);
//   } catch (error) {
//     console.log(
//       "🚀 ~ file: task.controller.js:63 ~ getAllTasks ~ error:",
//       error
//     );
//     throw new ExpressError(error);
//   }
// }
