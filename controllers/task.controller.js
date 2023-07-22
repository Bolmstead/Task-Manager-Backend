import jsonschema from "jsonschema";
import Task from "../models/task.model.js";
import Assignement from "../models/assignement.model.js";

import taskSchema from "../schemas/task.schema.json" assert { type: "json" };

/**
 * Create new Task
 * @public
 */
export async function createTask(req, res, next) {
  try {
    console.log("req.body", req.body);
    const result = jsonschema.validate(req.body, taskSchema, {
      required: true,
    });
    console.log(
      "🚀 ~ file: task.controller.js:24 ~ createTask ~ result.valid:",
      result.valid
    );
    if (result.valid) {
      const newTask = new Task({ ...req.body });
      await newTask.save();

      return res.json({
        status: "success",
        message: "Task created",
      });
    } else {
      const errors = [];
      if (result.errors) {
        for (let err of result.errors) {
          errors.push(err);
        }
      }
      return res.json({
        status: "error",
        errors: errors,
      });
    }
  } catch (error) {
    return res.json({ status: "error", error });
  }
}

/**
 * Get task
 * @public
 */
export async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find()
      .populate("assignments")
      .sort({ createdAt: -1 });
    console.log(
      "🚀 ~ file: task.controller.js:60 ~ getAllTasks ~ tasks:",
      tasks
    );

    return res.json(tasks);
  } catch (error) {
    console.log(
      "🚀 ~ file: task.controller.js:63 ~ getAllTasks ~ error:",
      error
    );
    return next(error);
  }
}

/**
 * Get task details
 * @public
 */
export async function getClientsAssignedTasks(req, res) {
  try {
    if (req.user.username === req.body.username || !req.user.isClient) {
      let foundClient = await User.findOne({ username: req.body.username });
      if (foundClient) {
        const tasks = await Assignement.find({})
        .populate("assignments")
        .sort({ createdAt: -1 });
      console.log(
        "🚀 ~ file: task.controller.js:60 ~ getAllTasks ~ tasks:",
        tasks
      );
      } else {
        return next(new ExpressError(`Client not found`, 400));

      }

    }

    return res.json(tasks);
  } catch (error) {
    console.log(
      "🚀 ~ file: task.controller.js:63 ~ getAllTasks ~ error:",
      error
    );
    return next(error);
  }
}
