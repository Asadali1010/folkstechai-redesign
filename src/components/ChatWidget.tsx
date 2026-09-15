import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

type Message = { id: number; sender: 'bot' | 'user'; text: string };

type Topic = 'services' | 'process' | 'pricing' | 'location' | 'contact';

const QUICK_REPLIES: { label: string; topic: Topic }[] = [
  { label: 'Services', topic: 'services' },
  { label: 'Process', topic: 'process' },
  { label: 'Pricing', topic: 'pricing' },
  { label: 'Location', topic: 'location' },
  { label: 'Contact', topic: 'contact' },
];

const ANSWERS: Record<Topic, string> = {
  services:
    'We build AI Enablement & Strategy, Custom Software Development, AI Agents & Automation, Data & Analytics, Rapid Delivery & Iteration, and Legacy Modernization — ask about any of these.',
  process:
    'Our process is Discover → Prototype → Build & Test → Ship & Iterate. You get a working prototype in days, then continuous delivery as requirements evolve.',
  pricing:
    "Pricing depends on scope, so the fastest way to get a real number is a free consultation — tell us what you're building and we'll follow up with details.",
  location:
    "We're based in Lahore, Pakistan, and work with clients worldwide.",
  contact:
    'Reach us any time at hello@folkstechai.com, or use the "Book a consultation" link below.',
};

const KEYWORD_TOPICS: { keys: string[]; topic: Topic }[] = [
  { keys: ['price', 'cost', 'pricing', 'budget', 'quote'], topic: 'pricing' },
  { keys: ['contact', 'email', 'reach', 'call'], topic: 'contact' },
  { keys: ['location', 'where', 'based', 'office'], topic: 'location' },
  { keys: ['process', 'timeline', 'how long', 'steps'], topic: 'process' },
  { keys: ['service', 'services', 'offer', 'build', 'do you'], topic: 'services' },
];

const FALLBACK =
  "I'm a simple assistant for quick answers — try one of the topics below, or reach a human via email or a consultation.";

function matchTopic(input: string): Topic | null {
  const lower = input.toLowerCase();
  for (const { keys, topic } of KEYWORD_TOPICS) {
    if (keys.some((key) => lower.includes(key))) return topic;
  }
  return null;
}

let nextId = 1;

export default function ChatWidget({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, sender: 'bot', text: "Hi! I'm the FolksTechAI assistant. Ask about our services, process, pricing, location, or contact info." },
  ]);
  const [input, setInput] = useState('');
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function appendMessage(sender: Message['sender'], text: string) {
    nextId += 1;
    setMessages((prev) => [...prev, { id: nextId, sender, text }]);
  }

  function respondTo(topic: Topic | null) {
    appendMessage('bot', topic ? ANSWERS[topic] : FALLBACK);
  }

  function handleQuickReply(topic: Topic) {
    appendMessage('user', QUICK_REPLIES.find((q) => q.topic === topic)!.label);
    respondTo(topic);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    appendMessage('user', trimmed);
    respondTo(matchTopic(trimmed));
    setInput('');
  }

  return (
    <>
      {isOpen && (
        <div
          role="dialog"
          aria-label="FolksTechAI chat assistant"
          className="fixed z-50 bottom-[152px] right-5 sm:bottom-[176px] sm:right-8 w-[calc(100vw-40px)] sm:w-[360px] h-[440px] sm:h-[480px] max-h-[70vh] flex flex-col rounded-2xl border border-white/[0.12] bg-[#0A0C18]/95 backdrop-blur-xl shadow-[0_16px_48px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
            <p className="text-white text-[14px] font-[500]">FolksTechAI Assistant</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>

          <div ref={threadRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] text-[13.5px] font-[450] leading-[1.4] rounded-xl px-3 py-2 ${
                  message.sender === 'bot'
                    ? 'self-start bg-white/[0.08] text-white/85'
                    : 'self-end text-white'
                }`}
                style={
                  message.sender === 'user'
                    ? { backgroundImage: 'linear-gradient(135deg, #F6577C, #8B5CF6)' }
                    : undefined
                }
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-white/[0.08]">
            {QUICK_REPLIES.map(({ label, topic }) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleQuickReply(topic)}
                className="text-[12.5px] font-[450] text-white/75 border border-white/15 rounded-full px-3 py-1.5 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.08]">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question…"
              aria-label="Type a message"
              className="flex-1 h-9 rounded-lg bg-white/[0.06] border border-white/[0.12] px-3 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-white transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{ backgroundImage: 'linear-gradient(135deg, #F6577C, #8B5CF6)' }}
            >
              <Send className="w-4 h-4" strokeWidth={2} />
            </button>
          </form>

          <div className="px-4 pb-3 -mt-1 text-[11.5px] text-white/40">
            or email{' '}
            <a href="mailto:hello@folkstechai.com" className="text-white/60 hover:text-white transition-colors">
              hello@folkstechai.com
            </a>{' '}
            ·{' '}
            <a href="#contact" className="hover:text-white transition-colors" style={{ color: '#B48CFF' }}>
              Book a consultation
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed z-50 bottom-24 right-5 sm:bottom-28 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(160,80,220,0.35)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{ backgroundImage: 'linear-gradient(135deg, #F6577C, #8B5CF6)' }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" strokeWidth={2.25} />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" strokeWidth={2.25} />
        )}
      </button>
    </>
  );
}
