/** Routes for Tasks. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getClientsAssignedTasks,
} from "../controllers/task.controller.js";
import { ensureLoggedIn, ensureUserIsAdmin } from "../middlewares/auth.js";
const router = new Router();

// get all tasks
router.get("/allTasks", ensureLoggedIn, ensureUserIsAdmin, getAllTasks);

// get all of a Client's tasks
router.get("/allTasks", ensureLoggedIn, getClientsAssignedTasks);

// // get single task with task ID
// router.get("/task-details", ensureLoggedIn, getTaskDetails);

// create Task with optional Assignment
router.post("/", ensureLoggedIn, createTask);

export default router;
