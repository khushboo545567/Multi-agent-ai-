import React, { useEffect, useState } from "react";
import {
  Coins,
  LogOut,
  MessageSquare,
  PanelLeftIcon,
  PanelRight,
  Plus,
  User,
} from "lucide-react";
import getConversation from "../features/getConversation";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  setConversation,
  setSelectedConversation,
} from "../redux/slice/conversationSlice";
import createConversation from "../features/createConversation";
import { setUserData } from "../redux/slice/auth.slice";

function SideBar() {
  const [collapse, setCollapse] = useState(false);
  const dispatch = useDispatch();
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation,
  );
  console.log("selected conversation", selectedConversation);
  const { userData } = useSelector((state) => state.user);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // if (!userData?.userId) return;
    const getConv = async () => {
      const data = await getConversation();

      dispatch(setConversation(data));
    };
    getConv();
  }, [dispatch, userData?._id]);

  const handleCreateConversation = async () => {
    const data = await createConversation();
    dispatch(addConversation(data));
  };

  if (collapse) {
    return (
      <div className="hidden lg:flex flex-col items-center w-14 h-screen bg-[#0d0f1d] border-r border-white/6 py-4 gap-1 shrink-0">
        <button
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/5 border-none cursor-pointer mb-1"
          onClick={() => setCollapse(false)}
        >
          <PanelRight />
        </button>
        <button
          className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 cursor-pointer"
          onClick={handleCreateConversation}
        >
          <Plus size={17} />
        </button>

        <div className="relative shrink-0">
          {userData.avatar && !imageError ? (
            <img
              className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
              src={userData?.avatar}
              alt="image"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-9 h-9 rounded-[10px] bg-white/6 flex items-center justify-center">
              <User size={15} className="text-slate-400" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed lg:static inset-y-0 left-0 w-67.5 h-screen shrink-0 z-50 bg-[#0d0f14] border-r border-white/6">
      <div className="flex flex-col h-full">
        {/* header */}
        <div
          className="flex items-center gap-2.5 px-4 py-4 border-b border-white/6
        "
          onClick={() => setCollapse(true)}
        >
          <div className="hidden lg:flex items-center justify-center  w-7 h-7 rounded-lg text-slate-500 border-none cursor-pointer">
            <PanelLeftIcon />
          </div>
          <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
            MultiAgent
          </span>
          <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
            free
          </span>
        </div>

        {/* body sec */}
        <div className="px-4 pt-4 pb-l">
          <button
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-blue-500 rounded-xl py-2.5 border-none cursor-pointer "
            onClick={handleCreateConversation}
          >
            <Plus size={15} />
            New Chat
          </button>
        </div>

        {/* conversation */}
        {conversations.length === 0 ? (
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
            No Recent Conversation
          </div>
        ) : (
          <div className="px-5 pt-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600">
            Rcents
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-2.5 pb-2 scrollbar:none [&:: -webkit-scrollbar]:hidden">
          {conversations.map((conv, i) => {
            const isActive = selectedConversation?._id === conv?._id;
            return (
              <div
                key={conv._id}
                onClick={() => dispatch(setSelectedConversation(conv))}
                className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border border-gray-700 transition-colors duration-150 ${isActive ? "bg-indigo-500/20 broder-indigo-500/18" : "bg-transparent border-transparent"}`}
              >
                <div
                  className={`flex items-center justify-center shrink-0 w-7 h-7 ${isActive ? "bg-indigo-500/15 text-indigo-400" : "bg-white/5 text-slate-500"}`}
                >
                  <MessageSquare size={13} />
                </div>
                <span> {conv?.title || "New Chat"}</span>
              </div>
            );
          })}
        </div>

        <div className="m-2.5 h-1px bg-white/6" />

        <div className="px-3.5 py-3.5">
          {userData ? (
            <div className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/5 ">
              <div className="relative shrink-0">
                {userData.avatar && !imageError ? (
                  <img
                    className="w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25"
                    src={userData?.avatar}
                    alt="image"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-9 h-9 rounded-[10px] bg-white/6 flex items-center justify-center">
                    <User size={15} className="text-slate-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-semibold text-slate-100 truncate">
                  {userData?.name || "user"}
                </p>
                <p className="text-[11px] text-slate-600 mt-px ">
                  {"Free Plan"}
                </p>
              </div>
              <div className="flex gap-1">
                <button className="flex itmes-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-yellow-600 cursor-pointer ">
                  <Coins size={16} />
                </button>
                <button
                  className="flex items-center justify-center w-7h-7 rounded-[7px] border-none bg-transparent text-slate-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    logOut();
                    dispatch(setUserData(null));
                  }}
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button className="w-full flex items-center justify-center gap-2 text-sm font-medium text-slate-200 bg-white/5 border border-white/8 rounded-xl py-2.75 cursor-pointer ">
              Login
            </button>
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
