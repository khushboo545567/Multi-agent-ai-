import React, { useEffect } from "react";
import Nav from "./Nav";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/slice/messageSlice";

function ChatArea() {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((state) => state.conversation);
  useEffect(() => {
    const getMsg = async () => {
      if (selectedConversation) {
        const data = await getMsg(selectedConversation?._id);
        dispatch(setMessages(data));
      }
    };
    getMsg();
  }, []);
  return (
    <div className="flex-1 flex flex-col">
      <Nav /> <MessageList /> <ChatInput />
    </div>
  );
}

export default ChatArea;
