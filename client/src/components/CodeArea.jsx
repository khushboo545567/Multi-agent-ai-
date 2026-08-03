import { PanelRight, PanelRightClose } from "lucide-react";
import React from "react";

function CodeArea() {
  return (
    <div className="hidden lg:flex h-full border-l border-white/6 flex-col overflow-hidden shrink-0 w-62.5">
      <div className="flex flex-col h-full bg-[#0d0f14]">
        <div className="h-14 px-4 border-b border-white/6 flex items-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0">
          <PanelRightClose size={16} />
        </div>
      </div>
    </div>
  );
}
export default CodeArea;
