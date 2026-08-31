"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";

export default function ChatPageClient() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const chatEndRef = useRef(null);

  // Fetch chat messages
  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/chats", { cache: "no-store" });
      if (res.status === 401) {
        setError("Please sign in to access client advisory services.");
        setMessages([]);
        return;
      }
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      setError("Unable to retrieve conversation archives.");
    }
  };

  // Scroll chat box to bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Load messages on mount only
  useEffect(() => {
    setMounted(true);
    fetchMessages();
  }, []);

  // Send message
  const send = async () => {
    if (!text.trim()) return;
    const res = await fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receiver_id: 1, message: text }),
    });
    if (res.status === 401) {
      setError("Please sign in to send messages.");
      return;
    }
    setText("");
    await fetchMessages();
    scrollToBottom();
  };

  return (
    <div className="min-h-screen font-sans bg-pehno-offwhite text-pehno-black flex flex-col">
      <Navbar />

      <main className="flex-grow py-40 px-6 md:px-16 max-w-4xl mx-auto w-full flex flex-col">
        {/* Header Section */}
        <div className="text-center mb-8">
          <span className="text-pehno-navy text-xs tracking-[0.4em] uppercase font-medium">
            Client Advisory
          </span>
          <h1 className="mt-2 text-3xl md:text-5xl font-serif font-light uppercase tracking-wide text-pehno-black">
            Consult With An Expert
          </h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-white border border-pehno-black/20 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-pehno-black">
              {error}
            </p>
          </div>
        )}

        {/* Chat Box Frame */}
        <div className="flex-1 border border-pehno-black/10 bg-white p-6 shadow-sm flex flex-col justify-between min-h-[550px] max-h-[650px]">
          {/* Scrollable Message List */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {messages.length === 0 && !error && (
              <div className="h-full flex items-center justify-center">
                <p className="text-pehno-charcoal text-xs italic font-light tracking-wide text-center">
                  Your conversation with our house stylist will appear here.
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[80%] sm:max-w-[70%] p-4 ${
                  m.is_self
                    ? "ml-auto bg-pehno-black text-pehno-ivory"
                    : "mr-auto bg-pehno-offwhite border border-pehno-black/10 text-pehno-black"
                }`}
              >
                <div
                  className={`text-[10px] uppercase tracking-[0.2em] mb-1 font-medium ${
                    m.is_self ? "text-pehno-ivory/60" : "text-pehno-navy"
                  }`}
                >
                  {mounted ? new Date(m.created_at).toLocaleDateString() : ""}
                </div>
                <div className="text-xs font-light leading-relaxed tracking-wide">
                  {m.message}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div className="mt-6 pt-4 border-t border-pehno-black/10 flex gap-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Inquire regarding sizing, styling, or orders..."
              className="flex-1 px-4 py-3 bg-pehno-offwhite border border-pehno-black/20 text-xs text-pehno-black placeholder:text-pehno-charcoal/50 focus:outline-none focus:border-pehno-black transition-colors"
            />
            <button
              onClick={send}
              className="border border-pehno-black bg-pehno-black text-pehno-ivory px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] hover:bg-transparent hover:text-pehno-black transition-colors duration-300 flex-shrink-0"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}