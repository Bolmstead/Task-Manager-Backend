/** Routes for Authorization. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";

const router = new Router();

// Create User and Log User in
router.post("/signup", signup);

// Login to site
router.post("/login", login);

export default router;
