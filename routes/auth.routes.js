/** Routes for Authorization. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";

const router = new Router();

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */
router.post("/signup", signup);

/** POST /auth/register:   { username, password, isClient } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */
router.post("/login", login);

export default router;
