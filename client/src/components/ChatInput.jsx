import { Mic, Paperclip, Send } from "lucide-react";
import React, { useState } from "react";
import sendMessage from "../features/sendMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessages,
  setMessages,
  setThinking,
} from "../redux/slice/messageSlice";
import createConversation from "../features/createConversation";
import {
  addConversation,
  setConvTitle,
  setSelectedConversation,
} from "../redux/slice/conversationSlice";
import { updateConversation } from "../features/updateConversation";
import getMessage from "../features/getMessage";

function ChatInput() {
  const [value, setValue] = useState("");

  const { selectedConversation } = useSelector((state) => state.conversation);

  const dispatch = useDispatch();

  const handleSendMessage = async () => {
    if (!value.trim()) return;

    dispatch(setThinking(true));

    try {
      let conversation = selectedConversation;

      if (!conversation) {
        conversation = await createConversation();

        dispatch(addConversation(conversation));
        dispatch(setSelectedConversation(conversation));
      }

      if (conversation.title === "New Chat") {
        await updateConversation({
          conversationId: conversation._id,
          title: value.trim(),
        });

        dispatch(
          setConvTitle({
            conversationId: conversation._id,
            title: value.trim().slice(0, 40),
          }),
        );
      }

      dispatch(
        addMessages({
          role: "user",
          content: value.trim(),
        }),
      );

      const payload = {
        prompt: value.trim(),
        conversationId: conversation._id,
        role: "user",
      };

      setValue("");

      const data = await sendMessage(payload);

      dispatch(
        addMessages({
          role: "assistant",
          content: data,
        }),
      );
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setThinking(false));
    }
  };

  return (
    <div className="w-full overflow-hidden px-3 md:px-5 py-4 border-t border-white/6 bg-[#0d0f14]">
      <div className="flex flex-col gap-2 bg-white/3 border border-white/7 rounded-2xl px-4 pt-3 pb-3">
        <textarea
          placeholder="Ask Anything..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="w-full bg-transparent outline-none resize-none text-[14px] text-slate-200 placeholder:text-slate-600 leading-relaxed scroll:none [&::-webkit-scrollbar]:hidden disabled:opacity-50"
          rows={3}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer">
              <Paperclip size={16} />
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/6 transition-all duration-150 bg-transparent cursor-pointer">
              <Mic size={16} />
            </button>
          </div>
          <button
            disabled={!value}
            onClick={handleSendMessage}
            className="flex items-center justify-center w-8 h-8 rounded-lg border-none cursor-pointer transition-all duration-150 bg-linear-to-br from-indigo-500 to-violet-700 hover:opacity-90 text-white"
          >
            {" "}
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
