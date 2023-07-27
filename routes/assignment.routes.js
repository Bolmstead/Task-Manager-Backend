/** Routes for Assignments. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import {
  editAssignmentDetails,
  getAllAssignments,
  getAllClientAssignments,
  getAssignmentDetails,
} from "../controllers/assignment.controller.js";
import {
  ensureLoggedIn,
  ensureUserIsAdmin,
  ensureUserIsAdminOrCorrectClient,
} from "../middlewares/auth.js";

const router = new Router();

/** GET => [{ assignment },{ assignment },...]
 *
 * Also provides nested Task and User information for each Assignment
 *
 * Authorization required: admin
 */ router.get("/all", ensureLoggedIn, ensureUserIsAdmin, getAllAssignments);

/** GET [assignmentId] => [{ assignment },{ assignment },...]
 *
 * Also provides nested Task and User information for each Assignment
 *
 * Authorization required: admin or correct client
 */
router.get(
  "/all/:clientId",
  ensureLoggedIn,
  ensureUserIsAdminOrCorrectClient,
  getAllClientAssignments
);

/** GET [assignmentId] => { assignment }
 *
 * Also provides nested Task and User information for each Assignment
 *
 * Authorization required: admin or correct client
 */ router.get(
  "/details/:id",
  ensureLoggedIn,
  ensureUserIsAdminOrCorrectClient,
  getAssignmentDetails
);

/** PUT [assignmentId] => { assignment }
 *
 * Edits assignment based on payload body: {status, response, fileUploads}
 *
 * Authorization required: admin or correct client
 */
router.put(
  "/edit/:id",
  ensureLoggedIn,
  ensureUserIsAdminOrCorrectClient,
  editAssignmentDetails
);

export default router;
