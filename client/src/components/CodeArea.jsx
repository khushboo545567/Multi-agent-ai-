import {
  Eye,
  PanelRightClose,
  PanelRightOpen,
  Code2,
  Copy,
  Check,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Editor from "@monaco-editor/react";

function CodeArea() {
  const { artifacts } = useSelector((state) => state.message);

  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState("code");
  const [activeFile, setActiveFile] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!artifacts?.length) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(file?.content);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const artifact = artifacts[0];
  const file = artifact?.files?.[activeFile];

  const detectLanguage = (fileName = "") => {
    const name = fileName.toLowerCase();
    if (name.endsWith(".html")) return "html";

    if (name.endsWith(".css")) return "css";
    if (name.endsWith(".js")) return "javascript";
    if (name.endsWith(".jsx")) return "javascript";
    if (name.endsWith(".ts")) return "typescript";
    if (name.endsWith(".tsx")) return "typescript";
    if (name.endsWith(".json")) return "json";
    if (name.endsWith(".py")) return "python";
    if (name.endsWith(".java")) return "java";
    return "plaintext";
  };
  return (
    <div
      className={`hidden lg:flex h-full border-l border-white/10 bg-[#0d0f14] flex-col overflow-hidden shrink-0 transition-all duration-300 ${
        collapsed ? "w-14" : "w-95"
      }`}
    >
      {!collapsed ? (
        <>
          {/* Header */}
          <div className="h-14 px-4 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setCollapsed(true)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition"
              >
                <PanelRightClose size={16} />
              </button>

              <div className="flex items-center gap-2 min-w-0">
                <Code2 size={18} />
                <span className="truncate text-sm font-medium">
                  {artifact?.title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>

              <div className="flex items-center rounded-lg border border-white/10 p-1 bg-white/5">
                <button
                  onClick={() => setTab("code")}
                  className={`px-3 py-1 text-xs rounded-md transition ${
                    tab === "code"
                      ? "bg-indigo-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Code2 size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* File Tabs */}
          <div className="flex border-b border-white/10 overflow-x-auto scrollbar-none shrink-0">
            {artifact?.files?.map((f, index) => (
              <button
                key={index}
                onClick={() => setActiveFile(index)}
                className={`px-4 py-3 text-xs whitespace-nowrap border-r border-white/5 transition relative ${
                  activeFile === index
                    ? "text-indigo-400 bg-white/5"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {f.name}

                {activeFile === index && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {tab === "code" ? (
              <div className="h-full rounded-lg overflow-hidden">
                <Editor
                  height="100%"
                  theme="vs-dark"
                  language={detectLanguage(file?.name)}
                  value={file.content}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },

                    fontSize: 14,
                    fontFamily:
                      "JetBrains Mono, Fira Code, Consolas, monospace",

                    fontLigatures: true,

                    wordWrap: "on",

                    automaticLayout: true,

                    scrollBeyondLastLine: false,

                    smoothScrolling: true,

                    cursorBlinking: "smooth",

                    lineNumbers: "on",

                    renderLineHighlight: "none",

                    folding: true,

                    padding: {
                      top: 12,
                      bottom: 12,
                    },
                  }}
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">
                Preview
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center h-full py-4 border-r border-white/10">
          <button
            onClick={() => setCollapsed(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition"
          >
            <PanelRightOpen size={16} />
          </button>

          <div className="flex-1 flex items-center justify-center">
            <span
              className="text-[10px] uppercase tracking-widest text-slate-500"
              style={{
                writingMode: "vertical-lr",
                transform: "rotate(180deg)",
              }}
            >
              {artifact?.title}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeArea;
