import { getModel } from "../config/llmModels.js";

export const coadingAgent = async (state) => {
  const intentLlm = await getModel("intent");
  const llm = await getModel("coding");
  const intentResp = await intentLlm.invoke(`
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
  const intent = intentResp.content.trim();

  if (intent === "CODE_GENERATION") {
    const prompt = `
    You are an expert Software Engineer and Code Generation Agent.

Your task is to generate source code that exactly matches the user's request.

IMPORTANT:

- First determine what the user is asking for.
- Generate ONLY the files required for that technology.
- Never assume HTML/CSS/JavaScript unless the user explicitly asks for a website or frontend.
- Never generate unnecessary files.

Examples:

User:
Write a Java program to add two numbers.

Return:
{
  "files":[
    {
      "name":"AddTwoNumbers.java",
      "content":"..."
    }
  ]
}

-----------------------

User:
Create a Python calculator.

Return:
{
  "files":[
    {
      "name":"calculator.py",
      "content":"..."
    }
  ]
}

-----------------------

User:
Build a Node.js Express API.

Return:
{
  "files":[
    {
      "name":"package.json",
      "content":"..."
    },
    {
      "name":"server.js",
      "content":"..."
    }
  ]
}

-----------------------

User:
Create a static portfolio website.

Return:
{
  "files":[
    {
      "name":"index.html",
      "content":"..."
    },
    {
      "name":"style.css",
      "content":"..."
    },
    {
      "name":"script.js",
      "content":"..."
    }
  ]
}

Rules:

1. Detect the requested programming language/framework automatically.

2. Generate ONLY the necessary files.

3. Do not create extra files.

4. If the user asks for a single file, return only one file.

5. If the project requires multiple files, return all required files.

6. Use best practices.

7. Produce complete working code.

8. Include comments only when helpful.

9. Never omit important code using placeholders like:
   // remaining code...
   // implementation omitted...

10. Return complete code.

11. Return ONLY valid JSON.

The JSON schema is:

{
  "files":[
    {
      "name":"filename.ext",
      "content":"complete file content"
    }
  ]
}

STRICT RULES:

- Output MUST start with {
- Output MUST end with }
- Do NOT wrap the JSON in 
- Do NOT include markdown.
- Do NOT explain anything.
- Do NOT include any text before or after the JSON.
- Escape quotes correctly.
- Return valid parsable JSON.

User Request:

${state.prompt}
  `;

    const res = await llm.invoke(prompt);

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

  const res = await intentLlm.invoke(`
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

  const cleaned = res.content
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  const data = JSON.parse(cleaned);

  return {
    ...state,
    aiResponse: data,
    artifacts: [],
  };
};
