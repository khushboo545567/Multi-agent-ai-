import { getModel } from "../config/llmModels.js";

export const router = async (state) => {
  const llm = await getModel("router");
  const prompt = `You are an agent router.
  
  Available agents:
  -chat
  -search
  -coading
  -pdf
  -ppt
  -vision

  Rules:
  
  chat:
  General conversation,
  explanations,
  learning,
  questions.

  search:
  Current events,
  latest information,
  news,
  recent developments,
  internet lookup.

  coading:
  Generate code,
  debug code,
  build projects,
  architecture,
  API design

  pdf:
  Questions about generate PDFs
  or document context.

  ppt:
  Questions about generate ppts
  or ppt context.

  vision:
  Generate image,
  create image

  Return ONLY one word:

  chat 
  search
  coading
  pdf

  User Query:
  ${state.prompt}
  `;

  const response = await llm.invoke(prompt);

  return {
    ...state,
    agent: response.content.trim().toLowerCase(),
  };
};
