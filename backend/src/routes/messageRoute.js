import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import * as messageController from "../controllers/messageController.js";

const router = express.Router();

router.get("/users", protectRoute, messageController.getUserSidebar);
router.get("/:id", protectRoute, messageController.getMessage);
router.post("/send/:id", protectRoute, messageController.sendMessage);

export default router;
