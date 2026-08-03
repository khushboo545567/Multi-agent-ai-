import { getModel } from "../config/llmModels.js";

export const coadingAgent = async (state) => {
  const intentLlm = await getModel("intent");
  const llm = await getModel("coding");
  const intentRes = await intentLlm.invoke(`
    You are an intent classifier.
    Return ONLY one of these values.
    CODE_GENERATION
    CODE_REVIEW
    CODE_EXPLANATION
    DEBUGGING
    OPTIMIZATION
    CONVERSATION
    DECUMENTATION

    User Resquest:
    ${state.prompt}
    `);
  const intent = intentRes.content;
  console.log(intent);
  if (intent === "CODE_GENERATION") {
    const prompt = `
    You are an agent
    Generate the requested project.
    Default stack:
    -HTML
    -CSS
    -JavaScript

    Use React / Next.js / Vue ONLY if explicitly requested.

    RULES:

    -Responsive
    -Modern UI
    -CSS Variables 
    -Flexbox/Grid
    -Smooth Scroll
    -Hover Effects
    -Beautiful spacing
    -single page unless user asks otherwise.

    Return ONLY valid JSON.

    Schema:

    {
    "files:[
   { "name":"index.html",
    "content":"..."},
    {"name":"style.css",
    "content":"..."},
    {"name":"script.js","content":"..."}
    ]    
    }

    Rules:
    - Output must start with {
    - Output must end with }
    -No markdown
    - No extra text
    - No \'\'\'
    - Never mention intent

    User Request:
    ${state.prompt}
    `;

    const res = await llm.invoke(prompt);
    console.log(JSON.parse(res.content));
    const data = JSON.parse(res.content);
    return {
      ...state,
      aiResponse: "Code Generated Successfully.",
      artifacts: [
        {
          id: Date.now(),
          type: "project",
          files: data.files || [],
          title: state.prompt,
        },
      ],
    };
  }

  const intentRes = await intentLlm.invoke(`
    Use headings like:

    # Overview
    # Explanation
    # Problems
    # Improvements
    # Best Practice
    # Optimized code (if needed)

    User Request:
    ${state.prompt}
    `);

  const data = res.content;
  return {
    ...state,
    aiResponse: data,
    artifacts: [],
  };
};
