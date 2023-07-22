/** Routes for Users. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import { getUserDetails } from "../controllers/user.controller.js";
import { ensureLoggedIn } from "../middlewares/auth.js";

const router = new Router();

// Get User Details
router.get("/:username", ensureLoggedIn, getUserDetails);

export default router;
