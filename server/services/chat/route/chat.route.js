import express from "express";
import {
  createConv,
  getConversation,
  getMessages,
  saveMessage,
  updateConv,
} from "../controller/chat.controller.js";

const chatRoute = express.Router();

chatRoute.post("/create-conv", createConv);
chatRoute.put("/update-conv", updateConv);
chatRoute.post("/create-msg", saveMessage);
chatRoute.get("/get-conv", getConversation);
chatRoute.get("/get-message/:conversationId", getMessages);

export default chatRoute;
