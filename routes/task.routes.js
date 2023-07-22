/** Routes for Tasks. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import {
  createTask,
  getTaskDetails,
  getTasks,
} from "../controllers/task.controller.js";
import { ensureLoggedIn } from "../middlewares/auth.js";
const router = new Router();

// get all tasks matching search query params
router.get("/", ensureLoggedIn, getTasks);

// get single task with task ID
router.get("/task-details", ensureLoggedIn, getTaskDetails);

// create Task with optional Assignment
router.post("/", ensureLoggedIn, createTask);

export default router;
