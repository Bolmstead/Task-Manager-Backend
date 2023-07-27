import jsonschema from "jsonschema";
import { ExpressError } from "../expressError.js";
import Assignment from "../models/assignment.model.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import taskSchema from "../schemas/task.schema.json" assert { type: "json" };

export async function createTask(req, res, next) {
  try {
    const result = jsonschema.validate(req.body, taskSchema, {
      required: true,
    });

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

      const newTask = new Task({ ...req.body });

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
    console.log(error);

    return next(err);
  }
}

export async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find()
      .populate("assignments")
      .sort({ createdAt: -1 });

    return res.json(tasks);
  } catch (error) {
    console.log(error);
    return next(err);
  }
}

/**
 * Get task details

 */
export async function getClientsTasks(req, res) {
  try {
    if (req.user.username === req.body.username || !req.user.isClient) {
      const foundClient = await User.findOne({ username: req.body.username });
      if (foundClient) {
        const tasks = await Assignment.find({})
          .populate("assignments")
          .sort({ createdAt: -1 });
      } else {
        return next(new ExpressError(`Client not found`, 400));
      }
    }

    return res.json(tasks);
  } catch (error) {
    console.log(error);
    return next(err);
  }
}

export async function getTaskDetails(req, res) {
  try {
    const foundTask = await Task.findById(req.params.id).populate(
      "assignments"
    );
    if (foundTask) {
      const tasks = await Assignment.find({})
        .populate("assignments")
        .sort({ createdAt: -1 });
    } else {
      return next(new ExpressError(`Client not found`, 400));
    }

    return res.json(tasks);
  } catch (error) {
    console.log(error);
    return next(err);
  }
}
