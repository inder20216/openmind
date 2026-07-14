import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SCRIPTED_REPLIES = [
  "Thanks for reaching out! One of our specialists can walk you through Open Mind's support, IVR, or automation solutions.",
  "Got it — I've noted that. Would you like to book a live demo with our team?",
  "Happy to help. For account-specific queries, our human agents pick up right where I leave off.",
]

function ChatPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm the Open Mind Assistant. Ask me anything about our services, or say hello 👋" },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const replyIndex = useRef(0)
  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function send() {
    const text = input.trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const reply = SCRIPTED_REPLIES[replyIndex.current % SCRIPTED_REPLIES.length]
      replyIndex.current += 1
      setTyping(false)
      setMessages((m) => [...m, { from: 'bot', text: reply }])
    }, 1100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-[340px] max-w-[calc(100vw-2rem)] h-[460px] max-h-[70vh] bg-white rounded-2xl shadow-2xl shadow-slate-400/30 border border-slate-100 flex flex-col overflow-hidden"
    >
      <div className="px-5 py-4 bg-gradient-to-r from-ob via-purple-600 to-ox text-white flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <div>
            <p className="text-sm font-semibold leading-none">Open Mind Assistant</p>
            <p className="text-[11px] text-white/70 mt-1">Usually replies instantly</p>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close chat" className="text-white/80 hover:text-white transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6l-12 12" /></svg>
        </button>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.from === 'user'
                  ? 'bg-ox text-white rounded-br-sm'
                  : 'bg-white text-slate-700 border border-slate-100 shadow-sm rounded-bl-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full bg-slate-300"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 p-3 border-t border-slate-100 bg-white flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message…"
          className="flex-1 px-3.5 py-2.5 rounded-full bg-slate-100 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-ob/30"
        />
        <button
          onClick={send}
          aria-label="Send"
          className="flex-shrink-0 w-10 h-10 rounded-full bg-ox text-white flex items-center justify-center hover:shadow-lg hover:shadow-ox/30 transition-shadow"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
    </motion.div>
  )
}

function VoicePanel({ onClose }) {
  const [state, setState] = useState('idle') // idle | listening | responded

  function tap() {
    if (state !== 'idle') return
    setState('listening')
    setTimeout(() => setState('responded'), 2200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-[300px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl shadow-slate-400/30 border border-slate-100 overflow-hidden"
    >
      <div className="px-5 py-4 bg-gradient-to-r from-ox via-purple-600 to-ob text-white flex items-center justify-between">
        <p className="text-sm font-semibold">Open Mind Voice Bot</p>
        <button onClick={onClose} aria-label="Close voice bot" className="text-white/80 hover:text-white transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6l-12 12" /></svg>
        </button>
      </div>

      <div className="p-6 flex flex-col items-center gap-4">
        <button
          onClick={tap}
          className="relative w-20 h-20 rounded-full bg-gradient-to-br from-ox via-purple-600 to-ob flex items-center justify-center shadow-lg"
        >
          {state === 'listening' && (
            <motion.span
              className="absolute inset-0 rounded-full bg-ob/40"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
            <rect x="9" y="3" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0" />
            <path d="M12 18v3" />
          </svg>
        </button>

        <div className="flex items-end gap-1 h-6">
          {[6, 14, 20, 12, 8, 16, 10].map((h, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-ob to-ox"
              style={{ height: h }}
              animate={state === 'listening' ? { scaleY: [0.4, 1.2, 0.4] } : { scaleY: 0.3 }}
              transition={{ duration: 0.8, repeat: state === 'listening' ? Infinity : 0, delay: i * 0.07 }}
            />
          ))}
        </div>

        <p className="text-sm text-slate-500 text-center min-h-[2.5rem] flex items-center">
          {state === 'idle' && 'Tap the mic to try a demo voice interaction.'}
          {state === 'listening' && 'Listening…'}
          {state === 'responded' && '"Hi! I can help with support, billing, or booking a demo — just ask."'}
        </p>
      </div>
    </motion.div>
  )
}

export default function ChatVoiceWidget() {
  const [open, setOpen] = useState(null) // null | 'chat' | 'voice'

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence mode="wait">
        {open === 'chat' && <ChatPanel key="chat" onClose={() => setOpen(null)} />}
        {open === 'voice' && <VoicePanel key="voice" onClose={() => setOpen(null)} />}
      </AnimatePresence>

      {!open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col gap-3 items-end"
        >
          <button
            onClick={() => setOpen('voice')}
            aria-label="Open voice bot demo"
            className="w-[52px] h-[52px] rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-300/40 flex items-center justify-center text-ob hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <rect x="9" y="3" width="6" height="11" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0" />
              <path d="M12 18v3" />
            </svg>
          </button>
          <button
            onClick={() => setOpen('chat')}
            aria-label="Open chat bot demo"
            className="w-14 h-14 rounded-full bg-gradient-to-br from-ox via-purple-600 to-ob shadow-lg shadow-purple-500/30 flex items-center justify-center text-white hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5h16v11H8l-4 4V5z" />
            </svg>
          </button>
        </motion.div>
      )}
    </div>
  )
}
