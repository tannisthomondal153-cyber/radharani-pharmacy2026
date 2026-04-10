import { Bot, MessageCircle, Send, Sparkles, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { backendInterface } from "../backend";
import { createActorWithConfig } from "../config";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

let chatActorInstance: backendInterface | null = null;
async function getChatActor(): Promise<backendInterface> {
  if (!chatActorInstance) {
    chatActorInstance = (await createActorWithConfig()) as backendInterface;
  }
  return chatActorInstance as backendInterface;
}

const WELCOME: Message = {
  id: 0,
  role: "ai",
  text: "नमस्ते! আমি Radharani Pharmacy-র AI সহায়ক। আপনি Hindi, Bengali বা English-এ প্রশ্ন করতে পারেন। I can help with doctor schedules, medicines, health tips, payments, and more. How can I help you today? 🌿",
};

export default function GeminiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const clearChat = useCallback(() => {
    setMessages([WELCOME]);
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: Date.now(), role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const actor = await getChatActor();
      const response = await actor.askGemini(trimmed);
      const aiMsg: Message = { id: Date.now() + 1, role: "ai", text: response };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        text: "Sorry, I could not connect right now. Please WhatsApp us at 9831279222 for immediate help.",
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        data-ocid="gemini-chat-trigger"
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
        style={{
          background:
            "linear-gradient(135deg, #10b981 0%, #059669 60%, #047857 100%)",
          boxShadow:
            "0 8px 32px rgba(16,185,129,0.45), 0 2px 8px rgba(0,0,0,0.2)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={
          open
            ? {}
            : {
                boxShadow: [
                  "0 8px 32px rgba(16,185,129,0.45)",
                  "0 8px 40px rgba(16,185,129,0.7)",
                  "0 8px 32px rgba(16,185,129,0.45)",
                ],
              }
        }
        transition={{
          duration: 2.4,
          repeat: open ? 0 : Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        aria-label={open ? "Close AI chat" : "Open AI chat assistant"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-ocid="gemini-chat-panel"
            key="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-24 right-4 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{
              width: "min(400px, calc(100vw - 2rem))",
              height: "min(520px, calc(100vh - 8rem))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: "rgba(15, 23, 42, 0.92)",
              borderColor: "rgba(16,185,129,0.18)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b shrink-0"
              style={{
                borderColor: "rgba(16,185,129,0.2)",
                background: "rgba(5,150,105,0.12)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                  }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p
                    className="text-white font-semibold text-sm leading-tight"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Radharani AI Assistant
                  </p>
                  <p className="text-emerald-400 text-xs leading-tight">
                    Hindi · Bengali · English
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  data-ocid="gemini-chat-clear"
                  type="button"
                  onClick={clearChat}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-white/5 transition-colors"
                  aria-label="Clear chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  data-ocid="gemini-chat-close"
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(16,185,129,0.2) transparent",
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 30,
                      delay: i === 0 ? 0 : 0,
                    }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "ai" && (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-0.5 shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #10b981, #059669)",
                        }}
                      >
                        <MessageCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "text-white rounded-br-sm"
                          : "text-slate-100 rounded-bl-sm"
                      }`}
                      style={
                        msg.role === "user"
                          ? {
                              background:
                                "linear-gradient(135deg, #10b981, #059669)",
                              boxShadow: "0 2px 12px rgba(16,185,129,0.3)",
                            }
                          : {
                              background: "rgba(255,255,255,0.07)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }
                      }
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex justify-start items-end gap-2"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #10b981, #059669)",
                      }}
                    >
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                    <div
                      className="px-3 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          className="w-1.5 h-1.5 rounded-full bg-emerald-400 block"
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.7,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: dot * 0.15,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div
              className="px-3 py-3 border-t shrink-0 flex items-center gap-2"
              style={{
                borderColor: "rgba(16,185,129,0.15)",
                background: "rgba(0,0,0,0.2)",
              }}
            >
              <input
                ref={inputRef}
                data-ocid="gemini-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={loading}
                placeholder="Hindi, Bengali या English में पूछें…"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all disabled:opacity-50"
              />
              <motion.button
                data-ocid="gemini-chat-send"
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-opacity disabled:opacity-40"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                }}
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
