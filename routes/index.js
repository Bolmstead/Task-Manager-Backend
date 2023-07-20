import { Router } from "express";
// import assignmentRoutes from "./assignment.routes";
// import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes.js";
// import userRoutes from "./user.routes";

const router = Router();

// router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
// router.use("/auth", authRoutes);
// router.use("/assignment", assignmentRoutes);

export default router;
