"use client";

import { Bot, User, BellIcon, Loader2, Send } from "lucide-react";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

// Simple Markdown component
const Markdown = ({ children }) => {
  return <div>{children}</div>;
};

const Button = ({ children, className, disabled, type, size }) => {
  return (
    <button
      type={type}
      className={`${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const Tooltip = ({ children }) => children;
const TooltipContent = ({ children, side }) => <div>{children}</div>;
const TooltipProvider = ({ children }) => children;
const TooltipTrigger = ({ asChild, children }) => children;

export default function Chat() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat({
      onError: () =>
        toast.error("You've been rate limited, please try again later!"),
    });

  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white">
      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 md:px-0 flex justify-center bg-[#121212]">
        <div className="w-full max-w-2xl pt-12">
          {messages.length > 0 ? (
            <div className="flex flex-col gap-6 py-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "assistant"
                      ? "bg-[#1E1E1E] p-4 rounded-lg border-l-2 border-blue-600"
                      : ""
                  }`}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${
                      message.role === "assistant"
                        ? "bg-gradient-to-r from-purple-600 to-blue-600"
                        : "bg-gradient-to-r from-blue-600 to-purple-600"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="h-5 w-5 text-white" />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="text-white leading-relaxed">
                      <Markdown>{message.content}</Markdown>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading &&
                messages[messages.length - 1].role !== "assistant" && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Thinking...
                    </div>
                  </div>
                )}

              <div ref={messagesEndRef} />
            </div>
          ) : (
            <motion.div
              className="flex items-center justify-center py-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="border border-[#33353F] rounded-xl p-8 max-w-md flex flex-col gap-5 text-gray-300 bg-[#1A1A1A] shadow-xl">
                <div className="flex flex-col items-center gap-3 mb-2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-xl font-medium text-white">
                    Welcome to Maruf's AI Assistant
                  </h2>
                </div>

                <p>
                  This is an AI Assistant that can help you to know more about
                  it's developer Maruf
                </p>

                <div className="bg-[#222222] p-4 rounded-lg text-sm border-l-2 border-purple-600">
                  <p className="font-medium text-white mb-2">
                    I can help you with:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300">
                    <li>Answering questions about Maruf</li>
                    <li>Providing assistance to reach Maruf</li>
                    <li>Chat is not store or access from Maruf End</li>
                    <li>This is a beta version Maruf working</li>
                  </ul>
                </div>

                <div className="mt-2 bg-[#222222] p-4 rounded-lg flex items-center">
                  <div className="w-6 h-6 mr-2 text-yellow-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 18.5c.83 0 1.5-.67 1.5-1.5h-3c0 .83.67 1.5 1.5 1.5zm0-16.5c-4.42 0-8 3.58-8 8 0 3.69 2.47 6.77 5.83 7.73v1.27c0 .55.45 1 1 1h2.34c.55 0 1-.45 1-1v-1.27c3.36-.96 5.83-4.04 5.83-7.73 0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-300">
                    Type your message to get started with the conversation.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer/Input Area */}
      <footer className="border-t border-[#33353F] p-4 md:p-6 bg-[#1A1A1A]">
        <form className="max-w-2xl mx-auto relative" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 bg-[#222222] rounded-lg border border-[#33353F] shadow-inner">
            <input
              ref={inputRef}
              className="flex-1 bg-transparent py-3 px-4 outline-none text-white placeholder-gray-500"
              placeholder="Type your message here..."
              value={input}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    size="icon"
                    className="h-10 w-10 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-colors duration-300"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Powered by Maruf (NB: AI Assitant can make mistake)
          </p>
        </form>
      </footer>
    </div>
  );
}
