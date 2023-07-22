/** Routes for Assignments. */

// const jsonschema = require("jsonschema");
import { Router } from "express";
import { assignTask } from "../controllers/assignments";

const router = new Router();

// assign Task to Clients 
router.put("/:taskId", ensureLoggedIn, assignTask);

export default router;
