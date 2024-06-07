const express = require("express");
const {
  createMessage,
  getMessages,
  deleteChatroom,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages);
router.delete("/:chatId", deleteChatroom);

module.exports = router;
