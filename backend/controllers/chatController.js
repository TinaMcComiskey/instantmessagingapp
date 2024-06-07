// createChat
// findUserChats
// findChat

const chatModel = require("../models/chatModel");

const createChat = async (req, res) => {
  const { userIds } = req.body;

  if (!Array.isArray(userIds) || userIds.length < 2) {
    return res.status(400).json({ error: 'userIds must be an array with at least two user IDs' });
  }

  try {
    const chat = await chatModel.findOne({
      members: { $all: userIds },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      members: userIds,
    });

    const response = await newChat.save();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUserChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


module.exports = { createChat, findUserChats, findChat };
