import jsonschema from "jsonschema";
import { ExpressError } from "../expressError.js";
import Assignment from "../models/assignment.model.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import taskSchema from "../schemas/task.schema.json" assert { type: "json" };

/**
 * Create new Task

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
      const { assignedClientUsernames } = req.body;

      const assignedClients = [];

      for (let clientUsername of assignedClientUsernames) {
        const client = await User.findOne({ username: clientUsername });
        if (!client) {
          throw {
            status: "error",
            errors: `Unable to find client: ${clientUsername}`,
          };
        } else {
          assignedClients.push(client);
        }
      }

      console.log("assignedClients:", assignedClients);
      const newTask = new Task({ ...req.body });
      console.log(
        "🚀 ~ file: task.controller.js:42 ~ createTask ~ newTask:",
        newTask
      );

      for (let client of assignedClients) {
        const newAssignment = new Assignment({ task: newTask, user: client });
        await newAssignment.save();
        client.assignments.push(newAssignment);
        await client.save();
        newTask.assignments.push(newAssignment);
      }

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
      throw new ExpressError(`Validation Error: ${errors}`, 400);
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: task.controller.js:62 ~ createTask ~ error:",
      error
    );

    return next(err);
  }
}

/**
 * Get task

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
      "🚀 ~ file: task.controller.js:63213232233 ~ getAllTasks ~ error:",
      error
    );
    return next(err);
  }
}

/**
 * Get task details

 */
export async function getClientsTasks(req, res) {
  try {
    if (req.user.username === req.body.username || !req.user.isClient) {
      let foundClient = await User.findOne({ username: req.body.username });
      if (foundClient) {
        const tasks = await Assignment.find({})
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
      "🚀 ~ file: task.controller.js:62343 ~ getAllTasks ~ error:",
      error
    );
    return next(err);
  }
}

/**
 * Get task details

 */
export async function getTaskDetails(req, res) {
  try {
    let foundTask = await Task.findById(req.params.id).populate("assignments");
    if (foundClient) {
      const tasks = await Assignment.find({})
        .populate("assignments")
        .sort({ createdAt: -1 });
      console.log(
        "🚀 ~ file: task.controller.js:60 ~ getAllTasks ~ tasks:",
        tasks
      );
    } else {
      return next(new ExpressError(`Client not found`, 400));
    }

    return res.json(tasks);
  } catch (error) {
    console.log(
      "🚀 ~ file: task.controller.js:613 ~ getAllTasks ~ error:",
      error
    );
    return next(err);
  }
}
