// createMessage
// getMessages

const messageModel = require("../models/messageModel");
const chatModel = require("../models/chatModel");

// createMessage
const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new messageModel({
    chatId,
    senderId,
    text,
  });

  try {
    const response = await message.save();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create message. Please try again later." });
  }
};

// getMessages
const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteChatroom = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Remove all messages associated with the chat
    await messageModel.deleteMany({ chat: chatId });

    // Remove the individual chat
    await chatModel.findByIdAndRemove(chatId);

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { createMessage, getMessages, deleteChatroom };
