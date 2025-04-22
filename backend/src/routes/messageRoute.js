const express = require("express");
const { protectRoute } = require("../middleware/authMiddleware");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.get("/users", protectRoute, messageController.getUserSidebar);
router.get("/:id", protectRoute, messageController.getMessage);

router.post("/send/:id",protectRoute,messageController.sendMessage)

module.exports = router;
