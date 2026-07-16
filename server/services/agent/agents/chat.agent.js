import { getModel } from "../config/llmModels";

export const chatAgent = async (state) => {
  const llm = await getModel("chat");
  const prompt = "you are an intelligent ai assistant";
  const response = await llm.invoke([
    {
      role: "system",
      content: prompt,
    },
    {
      role: "human",
      content: state.prompt,
    },
  ]);

  return {
    ...state,
    aiResponse: response.content,
  };
};
