import { Router } from "express";
import assignmentRoutes from "./assignment.routes.js";
import authRoutes from "./auth.routes.js";
import taskRoutes from "./task.routes.js";
import userRoutes from "./user.routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/auth", authRoutes);
router.use("/assignments", assignmentRoutes);

export default router;
