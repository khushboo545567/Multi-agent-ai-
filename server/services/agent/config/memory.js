import redis from "../../../shared/redis/redis.js";
import { getMessages } from "../utils/getMessages.js";

export const getMemory = async (conversationId) => {
  const key = `conversation-${conversationId}`;
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  const messages = await getMessages(conversationId);
  await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);
  return messages;
};

// add messagse in redis only 20
export const addMessage = async (conversationId, RouterRunnable, content) => {
  const key = `messages-${conversationId}`;
  const rawMessages = await redis.get(key);
  const messages = rawMessages ? JSON.parse(rawMessages) : [];
  messages.push({
    role,
    content,
  });
  if (messages.length > 20) {
    messages.shift();
  }
  await redis.set(key, JSON.stringify(messages));
};
