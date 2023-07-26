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

// get all Assignments
router.get("/all", ensureLoggedIn, ensureUserIsAdmin, getAllAssignments);

// get client's Assignments
router.get(
  "/all/:clientId",
  ensureLoggedIn,
  ensureUserIsAdminOrCorrectClient,
  getAllClientAssignments
);

// get details on a Task Assignment
router.get(
  "/details/:id",
  ensureLoggedIn,
  ensureUserIsAdminOrCorrectClient,
  getAssignmentDetails
);

// Edit Assignment Details
router.put("/edit/:id", ensureLoggedIn, editAssignmentDetails);

export default router;
