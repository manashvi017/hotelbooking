import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";

const quickPrompts = [
  "Show me popular hotels",
  "How do I book a stay?",
  "What destinations are trending?",
  "How do I save favorites?",
];

const initialMessages = [
  {
    sender: "bot",
    text: "Hi! I’m your StaySphere travel assistant. I can help with hotels, bookings, destinations, and favorites.",
  },
];

function TravelBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const generateReply = (text) => {
    const cleanText = text.toLowerCase();

    if (
      cleanText.includes("hotel") ||
      cleanText.includes("stay") ||
      cleanText.includes("room")
    ) {
      return "You can browse hotel options from the Explore or Home page, then open any stay to view details and book it.";
    }

    if (cleanText.includes("book") || cleanText.includes("booking")) {
      return "To book, open a hotel card, review the details, and click the booking option on the hotel details page.";
    }

    if (
      cleanText.includes("favorite") ||
      cleanText.includes("wishlist") ||
      cleanText.includes("save")
    ) {
      return "Tap the heart icon on any hotel card to save it in your favorites list. You can revisit it later from the favorites section.";
    }

    if (
      cleanText.includes("dest") ||
      cleanText.includes("place") ||
      cleanText.includes("trip") ||
      cleanText.includes("travel")
    ) {
      return "Popular travel trends right now include beach escapes, city breaks, and cozy mountain stays. Explore the destinations page for more inspiration.";
    }

    if (cleanText.includes("signin") || cleanText.includes("login") || cleanText.includes("account")) {
      return "You can sign in from the profile or auth section. Once logged in, you can manage your saved stays and bookings.";
    }

    if (cleanText.includes("hello") || cleanText.includes("hi") || cleanText.includes("hey")) {
      return "Hello! I’m here to help with hotel searches, destinations, bookings, and favorites.";
    }

    return "I can help with hotel suggestions, bookings, destinations, and favorites. Try asking: ‘Show me popular hotels’ or ‘How do I book a stay?’";
  };

  const handleSend = (messageText) => {
    const trimmed = messageText.trim();

    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: trimmed },
      { sender: "bot", text: generateReply(trimmed) },
    ]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="w-[340px] overflow-hidden rounded-[26px] border border-white/10 bg-[#111827]/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold">StaySphere Assistant</p>
                  <p className="text-[10px] text-violet-100">Online now</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-violet-100 transition hover:bg-white/10"
                aria-label="Close assistant"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[360px] space-y-3 overflow-y-auto bg-slate-950/40 p-3 text-sm text-slate-100">
              {messages.map((message, index) => (
                <div
                  key={`${message.sender}-${index}`}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 leading-6 ${
                      message.sender === "user"
                        ? "bg-violet-600 text-white"
                        : "border border-white/10 bg-white/5 text-slate-200"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 bg-slate-950/60 p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-1 text-[11px] text-violet-100 transition hover:bg-violet-500/20"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-2 py-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend(input);
                  }}
                  placeholder="Ask about stays, trips, or bookings"
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => handleSend(input)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-white transition hover:bg-violet-500"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-violet-900/40"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
            <Bot size={16} />
          </div>
          Ask me anything!
        </motion.button>
      )}
    </div>
  );
}

export default TravelBot;
