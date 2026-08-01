import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";

export const chatAgent = async (state) => {
  const llm = await getModel("chat");
  const history = await getMemory(state.conversationId);
  console.log("History:", history);

  // const searchContext = state.searchResults
  //   ? `Web Search Results: ${JSON.stringify(state.searchResults)} Answer the user using only the above search results.`
  //   : "";

  const searchContext = state.searchResults?.length
    ? state.searchResults
        .map(
          (result, index) => `
${index + 1}. ${result.title}

${result.content}

Source: ${result.url}
`,
        )
        .join("\n\n")
    : "No search results.";

  console.log(searchContext);

  const prompt = `
  you are an intelligent ai assistant.
  
${searchContext}

Instructions:

- Prefer the search results over prior knowledge.
- If multiple sources agree, summarize them.
- If the search results don't contain the answer, say so.
- Never invent facts.
- Don't mention internal tools or that you performed a search.
- Cite the source name naturally if appropriate.

Rules:
- For simple questions, greetings, and short queries, respond naturally in plain text.
- For technical, educational, coading, or detailed topics, use clean Markdown.

  Formatting:

  - Use # for titles and ## for sections.
  - Leave a blank line after headings.
  - Use bullet points for lists.
  - User numbered lists for steps.
  - Use fenced code blocks with language tags for code.
  - Keep paragraphs short and readable.
  - Never write headings and content on the same line.
  - Never generate large walls of text.
  `;
  const messages = [new SystemMessage(prompt)];

  history.forEach((msg) => {
    if (msg.role === "user") {
      messages.push(new HumanMessage(msg.content));
    } else {
      messages.push(new AIMessage(msg.content));
    }
  });
  // messages.push(new HumanMessage(state.prompt));
  if (
    history.length === 0 ||
    history[history.length - 1].content !== state.prompt
  ) {
    messages.push(new HumanMessage(state.prompt));
  }
  console.log(messages);
  const response = await llm.invoke(messages);

  return {
    ...state,
    aiResponse: response.content,
  };
};
