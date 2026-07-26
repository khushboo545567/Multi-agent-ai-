import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

const createConv = async (req, res) => {
  try {
    const user = JSON.parse(req.headers["x-user"]);
    const userId = user.userId;
    const conversation = await Conversation.create({
      userId: userId,
    });
    console.log("converstaion creation ", conversation);
    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `create conversation error ${error}` });
  }
};

const updateConv = async (req, res) => {
  try {
    const { conversationId, title } = req.body;

    if (!conversationId || !title) {
      return res.status(400).json({
        message: "conversationId and title are required",
      });
    }

    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { title },
      { new: true, runValidators: true },
    );

    if (!updatedConversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    return res.status(200).json(updatedConversation);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to update conversation",
    });
  }
};

const getConversation = async (req, res) => {
  try {
    const user = JSON.parse(req.headers["x-user"]);
    const userId = user.userId;

    const conversation = await Conversation.find({
      userId: userId,
    }).sort({ updatedAt: -1 });

    return res.status(200).json(conversation);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get conversation error  ${error}` });
  }
};

const saveMessage = async (req, res) => {
  try {
    const { conversationId, role, content } = req.body;
    console.log("send message data ", conversationId, role, content);
    if (!conversationId || !role || !content) {
      return res.status(400).json({ message: "all fields are reqired" });
    }
    const message = await Message.create({
      conversationId,
      content,
      role,
    });
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: `save message error ${error}` });
  }
};

const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversationId,
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: `get messages error ${error}` });
  }
};

export { createConv, getConversation, getMessages, saveMessage, updateConv };
