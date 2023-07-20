import jsonschema from "jsonschema";
import Task from "../models/task.model.js";
import taskSchema from "../schemas/task.schema.json" assert { type: "json" };

/**
 * Register and Login User
 */
export async function register(req, res, next) {
  try {
    console.log("req.body", req.body);
    const result = jsonschema.validate(req.body, taskSchema, {
      required: true,
    });
    console.log(
      "🚀 ~ file: task.controller.js:24 ~ createTask ~ result:",
      result
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
 * Login User
 */
export async function login(req, res, next) {
  return res.json("");
}
