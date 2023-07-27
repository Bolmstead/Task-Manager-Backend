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

/** GET => [{ task },{ task },...]
 *
 * Only need to provide Client's username in URL parameter
 *
 * Authorization required: admin
 */
router.get("/all", ensureLoggedIn, ensureUserIsAdmin, getAllTasks);

/** GET [username] => [{ task },{ task },...]
 *
 * Only need to provide Client's username in URL parameter
 *
 * Authorization required: admin or correct client
 */
router.get(
  "/all-clients-tasks/:username",
  ensureLoggedIn,
  ensureUserIsAdminOrCorrectClient,
  getClientsTasks
);

/** GET [username] => { task }
 *
 * Authorization required: admin or correct client
 */
router.get(
  "/task-details/:id",
  ensureLoggedIn,
  ensureUserIsAdminOrCorrectClient,
  getTaskDetails
);

/** POST / Payload: { task } => { task }
 *
 * task payload should be { title, description, status, assignedClientUsernames }
 *
 * Returns { status, message}
 *
 * Authorization required: admin
 */ router.post("/", ensureLoggedIn, ensureUserIsAdmin, createTask);

export default router;
