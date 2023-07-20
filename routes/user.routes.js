/** Routes for Users. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import { createUser } from "../controllers/users";

const router = new Router();

// create User with data in request's body
router.post("/", createUser);

export default router;
