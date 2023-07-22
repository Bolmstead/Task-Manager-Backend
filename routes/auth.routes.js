/** Routes for Authorization. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = new Router();

// Create User and Log User in
router.post("/register", register);

// Login to site
router.post("/login", login);

export default router;
