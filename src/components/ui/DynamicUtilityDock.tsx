import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, ArrowUpRight, MessageSquare, Send, Minimize2 } from 'lucide-react';

const EASE_LUXURY = [0.25, 1, 0.5, 1] as const;

type ChatMessage = {
  role: 'user' | 'ai';
  text: string;
};

const AI_CANNED: Record<string, string> = {
  default: "Hello! I'm the Orient assistant. How can I help you today?",
  booking: "Ready to book an experience? I can guide you through our dining, lounge, or event reservations!",
  water: "Our water is 7-stage purified and available in 10L, 18.9L, and 25L dispenser sizes. Shall I walk you through delivery options?",
  bakery: "Fresh from the oven daily! Would you like to browse our signature breads, custom cakes, or pastry boxes?",
  market: "Looking for wholesale or retail? Our market stocks 500+ SKUs across groceries, organics, and premium pantry staples.",
};

type DockProps = {
  /** The primary CTA label shown in the pill */
  ctaLabel?: string;
  /** Where the CTA navigates / points to */
  ctaHref?: string;
  /** Context key used to load a relevant AI opener */
  context?: keyof typeof AI_CANNED;
};

export function DynamicUtilityDock({
  ctaLabel = 'Book an Experience',
  ctaHref = '/#booking',
  context = 'default',
}: DockProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Prime the chat with a context-aware opener on mount
  useEffect(() => {
    setMessages([{ role: 'ai', text: AI_CANNED[context] ?? AI_CANNED.default }]);
  }, [context]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, chatOpen]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages(prev => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'ai', text: "Thanks for reaching out! A real member of our team will follow up shortly. In the meantime, feel free to explore our services." }
    ]);
    setInput('');
  };

  return (
    <>
      {/* ── Chat Panel ─────────────────────────────────────────── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: EASE_LUXURY }}
            className="fixed bottom-28 right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
            }}
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Orient Assistant</p>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">● Online</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
                aria-label="Minimize chat"
              >
                <Minimize2 className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '280px' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-black/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask us anything..."
                className="flex-1 bg-slate-100 rounded-lg px-4 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-primary/30"
              />
              <button
                onClick={sendMessage}
                className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Dock Pill ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: EASE_LUXURY }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
      >
        {/* AI Chat Toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setChatOpen(v => !v)}
          aria-label={chatOpen ? 'Close chat' : 'Open AI chat'}
          className="w-13 h-13 rounded-2xl flex items-center justify-center transition-all relative"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
            width: '52px',
            height: '52px',
          }}
        >
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-5 h-5 text-slate-700" />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageSquare className="w-5 h-5 text-slate-700" />
              </motion.span>
            )}
          </AnimatePresence>
          {/* Unread dot */}
          {!chatOpen && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
          )}
        </motion.button>

        {/* Primary CTA */}
        <motion.a
          href={ctaHref}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 h-[52px] px-5 rounded-2xl font-bold uppercase tracking-widest text-xs text-white no-underline"
          style={{
            background: 'linear-gradient(135deg, #E85D04 0%, #f29e0d 100%)',
            boxShadow: '0 8px 24px rgba(232,93,4,0.35), 0 2px 8px rgba(232,93,4,0.20)',
          }}
        >
          {ctaLabel}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </motion.a>
      </motion.div>
    </>
  );
}
