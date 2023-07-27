/** Routes for Users. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import {
  getAllClients,
  getUserDetails,
} from "../controllers/user.controller.js";
import { ensureLoggedIn, ensureUserIsAdmin } from "../middlewares/auth.js";

const router = new Router();

/** GET => [{ user },{ user },...]
 *
 * Provides all clients
 *
 * Authorization required: admin
 */
router.get("/all-clients", ensureLoggedIn, ensureUserIsAdmin, getAllClients);

/** GET [username] => { user }
 *
 * Provides requested client information. Can only be requested by that client
 *
 * Authorization required: correct client
 */
router.get("/:username", ensureLoggedIn, getUserDetails);

export default router;
