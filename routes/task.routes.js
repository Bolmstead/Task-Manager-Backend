/** Routes for Tasks. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getClientsTasks,
  getTaskDetails,
} from "../controllers/task.controller.js";
import {
  ensureLoggedIn,
  ensureUserIsAdmin,
  ensureUserIsAdminOrCorrectClient,
} from "../middlewares/auth.js";
const router = new Router();

// get all tasks
router.get("/all", ensureLoggedIn, ensureUserIsAdmin, getAllTasks);

// get all of a Client's tasks
router.get(
  "/all-clients-tasks/:username",
  ensureLoggedIn,
  ensureUserIsAdminOrCorrectClient,
  getClientsTasks
);

// get single task with task ID
router.get(
  "/task-details/:id",
  ensureLoggedIn,
  ensureUserIsAdminOrCorrectClient,
  getTaskDetails
);

// create Task with optional Assignment
router.post("/", ensureLoggedIn, createTask);

export default router;
