/** Routes for Authorization. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import { register, login } from "../controllers/auth";

const router = new Router();

// create User with data in request's body
router.post("/", register);

// create User with data in request's body
router.post("/", login);

export default router;
