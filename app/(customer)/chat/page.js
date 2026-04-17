"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";


export default function ChatPage() {
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
        setError("Please sign in to use chat.");
        setMessages([]);
        return;
      }
      const data = await res.json();
      setMessages(data);
    } catch (e) {
      setError("Failed to load chat.");
    }
  };

  // Scroll chat box to bottom only on user message
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
    fetchMessages();
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen px-6 md:px-16 py-12 bg-gradient-to-b from-[#FFF2E1] via-[#FBF0E0] to-[#F5E6D3] text-[#3D2817] flex flex-col relative overflow-hidden">
        {/* Glowing background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#248D76]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-12 w-96 h-96 bg-[#102C26]/10 rounded-full blur-3xl"></div>

        <h1 className="relative z-10 text-4xl font-extrabold text-[#102C26] mb-8 text-center">
          Chat With Expert
        </h1>

        {/* Chat Box */}
        <div className="relative z-10 flex-1 border-2 border-[#F7E7CE] rounded-3xl p-6 bg-white shadow-2xl overflow-y-auto h-[60vh] flex flex-col gap-4">
          {error && <p className="text-red-600 mb-2 font-semibold">{error}</p>}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md ${
                m.is_self
                  ? "bg-gradient-to-br from-[#248D76] to-[#1A6B5F] text-white ml-auto rounded-tr-none"
                  : "bg-[#F0F9F7] text-[#102C26] border-2 border-[#F7E7CE] rounded-tl-none"
              }`}
            >
              <div className={`text-xs opacity-70 mb-1 ${m.is_self ? "text-green-100" : "text-[#6B4F2F]"}`}>
                {mounted ? new Date(m.created_at).toLocaleDateString() : ""}
              </div>
              <div className="text-sm font-medium">{m.message}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="relative z-10 mt-6 flex gap-3">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-2xl border-2 border-[#F7E7CE] bg-white text-[#3D2817] focus:outline-none focus:border-[#248D76] transition-colors shadow-md placeholder-[#A79277]"
          />
          <button
            onClick={send}
            className="bg-gradient-to-r from-[#248D76] to-[#1A6B5F] text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
