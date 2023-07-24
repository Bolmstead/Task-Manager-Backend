/** Routes for Users. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import { getAllClients, getUserDetails } from "../controllers/user.controller.js";
import { ensureLoggedIn, ensureUserIsAdmin } from "../middlewares/auth.js";

const router = new Router();

// Get User Details
router.get("/all-clients", ensureLoggedIn, ensureUserIsAdmin, getAllClients);

// // Get User Details
router.get("/:username", ensureLoggedIn, getUserDetails);

export default router;
