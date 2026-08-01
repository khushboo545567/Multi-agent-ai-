import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";

const agent = async (req, res) => {
  try {
    const { prompt, conversationId, agent } = req.body;

    console.log(prompt, "prompt from the agent");
    await axios.post(`${process.env.CHAT_SERVICE_URL}/api/v1/chat/create-msg`, {
      conversationId,
      role: "user",
      content: prompt,
    });

    const result = await graph.invoke({
      prompt,
      conversationId,
      agent,
    });

    console.log("result form the agent controller", result);
    const response = result.aiResponse;
    await addMessage(conversationId, "user", prompt);
    await addMessage(conversationId, "assistant", response);
    console.log(response, "response form the chatbot");
    await axios.post(`${process.env.CHAT_SERVICE_URL}/api/v1/chat/create-msg`, {
      conversationId,
      role: "assistant",
      content: response,
      images: result.images,
    });

    return res
      .status(200)
      .json({ answer: result.aiResponse, images: result.images });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

export { agent };
