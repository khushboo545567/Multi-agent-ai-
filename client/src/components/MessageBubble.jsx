import React, { Children } from "react";
import Markdown from "react-markdown";

function MessageBubble({ role, content, images }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} pb-4`}>
      <div
        className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed ${isUser ? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm" : "bg-white/4 border border-white/7 text-slate-200 rounded-tl-sm"}`}
      >
        {images.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                loading="lazy"
                onError={(e) => e.currentTarget.remove()}
                className="w-40 h-28 rounded-xl object-cover border border-white/10 cursor-pointer hover:opacity-90 transition"
              />
            ))}
          </div>
        )}
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ Children }) => (
              <h1 className="text-2xl font-bold mt-5 mb-3">{Children}</h1>
            ),
            ul: ({ Children }) => (
              <ul className="list-disc pl-5 space-y-1 my-2">{Children}</ul>
            ),
            ol: ({ Children }) => (
              <ol className="list-decimal pl-5 space-y-1 my-2">{Children}</ol>
            ),
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
}

export default MessageBubble;
