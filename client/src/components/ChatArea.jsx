import React, { useEffect } from "react";
import Nav from "./Nav";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/slice/messageSlice";
import getMessage from "../features/getMessage";

function ChatArea() {
  const dispatch = useDispatch();

  const { selectedConversation } = useSelector((state) => state.conversation);

  useEffect(() => {
    if (!selectedConversation) {
      dispatch(setMessages([]));
      return;
    }

    if (selectedConversation.title === "New Chat") {
      dispatch(setMessages([]));
      return;
    }

    const fetchMessages = async () => {
      const data = await getMessage(selectedConversation._id);
      dispatch(setMessages(data));
    };

    fetchMessages();
  }, [selectedConversation, dispatch]);
  return (
    <div className="flex-1 flex flex-col">
      <Nav /> <MessageList /> <ChatInput />
    </div>
  );
}

export default ChatArea;
