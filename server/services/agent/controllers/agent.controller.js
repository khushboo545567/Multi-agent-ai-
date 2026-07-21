import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";

const agent = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body;

    console.log(prompt, "prompt from the agent");
    await axios.post(`${process.env.CHAT_SERVICE_URL}/api/v1/chat/create-msg`, {
      conversationId,
      role: "user",
      content: prompt,
    });

    const result = await graph.invoke({
      prompt,
      conversationId,
    });
    const response = result.aiResponse;
    await addMessage(conversationId, "user", prompt);
    await addMessage(conversationId, "assistant", response);
    console.log(response, "response form the chatbot");
    await axios.post(`${process.env.CHAT_SERVICE_URL}/api/v1/chat/create-msg`, {
      conversationId,
      role: "assistant",
      content: response,
    });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: `agent error ${error}` });
  }
};

export { agent };
