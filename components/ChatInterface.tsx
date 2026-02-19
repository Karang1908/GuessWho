import React, { useState, useEffect, useRef } from 'react';
import { Character, ChatMessage } from '../types';
import { startChatSession, sendMessageToChat, verifyGuess, ChatSession } from '../services/aiService';
import Button from './Button';
import { Send, ArrowLeft, Eye, RefreshCw, User, Cpu } from 'lucide-react';

interface ChatInterfaceProps {
  character: Character;
  onBack: () => void;
  onNewGame: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ character, onBack, onNewGame }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [guessValue, setGuessValue] = useState('');
  const [guessFeedback, setGuessFeedback] = useState<{ text: string, type: 'success' | 'error' | null }>({ text: '', type: null });
  const [isCorrect, setIsCorrect] = useState(false);
  const chatSessionRef = useRef<ChatSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize Chat
    chatSessionRef.current = startChatSession(character.systemPrompt);

    // Add initial message if exists
    if (character.initialMessage) {
      setMessages([{
        role: 'model',
        text: character.initialMessage
      }]);
    }
  }, [character]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading || !chatSessionRef.current) return;

    const userMsg = inputValue;
    setInputValue('');

    // Optimistic UI update
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToChat(chatSessionRef.current, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [guessLoading, setGuessLoading] = useState(false);

  const handleGuess = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!guessValue.trim() || isRevealed || isCorrect || guessLoading) return;

    setGuessLoading(true);
    setGuessFeedback({ text: 'IDENTIFYING SUBJECT...', type: null });

    try {
      const isMatch = await verifyGuess(character.name, guessValue.trim());

      if (isMatch) {
        setIsCorrect(true);
        setIsRevealed(true);
        setGuessFeedback({ text: 'IDENTITY VERIFIED. ACCESS GRANTED.', type: 'success' });
        setMessages(prev => [...prev, {
          role: 'model',
          text: `CORRECT. I am indeed ${character.name}. Excellent deduction.`
        }]);
      } else {
        setGuessFeedback({ text: 'INCORRECT IDENTITY. ACCESS DENIED.', type: 'error' });
        setTimeout(() => {
          setGuessFeedback({ text: '', type: null });
        }, 3000);
      }
    } catch (error) {
      console.error("Guess verification error", error);
      setGuessFeedback({ text: 'SYSTEM ERROR. TRY AGAIN.', type: 'error' });
    } finally {
      setGuessLoading(false);
      setGuessValue('');
    }
  };

  const revealIdentity = () => {
    setIsRevealed(true);
    // Add a system message revealing the identity
    setMessages(prev => [...prev, {
      role: 'model',
      text: `SYSTEM ALERT: IDENTITY COMPROMISED.\nSUBJECT: ${character.name}`
    }]);
  };

  return (
    <div className="flex h-screen w-full max-w-[95rem] mx-auto p-6 md:p-12 gap-8 items-center justify-center relative overflow-hidden">

      {/* Left Column: Tactical Comms (Chat) */}
      <div className="flex-[2.2] flex flex-col h-full bg-white/10 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.3)] overflow-hidden glass-noise relative animate-fade-in">

        {/* Chat Header */}
        <div className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-lg border-b border-white/20 z-20 glass-noise">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="p-3 mr-4 rounded-full border border-white/20 bg-white/5 hover:border-white/50 hover:bg-white/10 text-white transition-all duration-300 backdrop-blur-lg shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] glass-noise"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex flex-col">
              <h3 className="font-black text-white uppercase tracking-tighter flex items-center gap-3 text-2xl drop-shadow-2xl">
                <span className="w-3 h-3 rounded-full bg-white animate-pulse shadow-[0_0_15px_white]"></span>
                SECURE CHANNEL
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-neutral-400 tracking-tighter uppercase">Signal Stable</span>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth scrollbar-hide">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up group`}
            >
              <div className={`flex max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-4`}>
                {/* Avatar */}
                <div className={`w-10 h-10 flex items-center justify-center shrink-0 border rounded-2xl backdrop-blur-lg shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] transition-all duration-500 glass-noise ${msg.role === 'user' ? 'border-white/30 bg-white/10 text-white' : 'border-white/10 bg-black/40 text-neutral-400'}`}>
                  {msg.role === 'user' ? <User size={18} /> : <Cpu size={18} />}
                </div>

                {/* Bubble */}
                <div
                  className={`p-6 relative rounded-[2rem] backdrop-blur-lg border-t border-l transition-all duration-500 hover:scale-[1.02] glass-noise ${msg.role === 'user'
                    ? 'bg-gradient-to-br from-white/20 to-white/5 border-t-white/40 border-l-white/20 text-white shadow-[0_20px_50px_rgba(0,0,0,0.3),inset_0_0_20px_rgba(255,255,255,0.1)]'
                    : 'bg-gradient-to-br from-black/40 to-black/10 border-t-white/10 border-l-white/5 text-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.2),inset_0_0_10px_rgba(255,255,255,0.02)]'
                    }`}
                >
                  {/* Glass Shine Overlay */}
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-50"></div>
                  <p className="whitespace-pre-wrap leading-relaxed text-base font-medium tracking-tight drop-shadow-md relative z-10">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fadeIn px-6">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-lg p-4 rounded-3xl border border-white/10 glass-noise shadow-xl">
                <div className="w-8 h-8 flex items-center justify-center shrink-0">
                  <Cpu size={20} className="text-white animate-[pulse_1.5s_infinite]" />
                </div>
                <div className="flex gap-2 items-center">
                  <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                  <span className="w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Area */}
        <div className="p-8 pb-10 bg-white/10 backdrop-blur-xl border-t border-white/20 glass-noise">
          <form
            onSubmit={handleSendMessage}
            className="relative flex items-center gap-4 max-w-4xl mx-auto group/form"
          >
            <div className="relative w-full group glass-noise transition-all duration-500 focus-within:scale-[1.01] focus-within:shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading || isRevealed}
                placeholder={isRevealed ? "Session Terminated." : "Enter query..."}
                className="w-full bg-white/10 backdrop-blur-lg border border-white/10 text-white py-5 pl-8 pr-16 rounded-[2rem] focus:outline-none focus:border-white/40 focus:ring-8 focus:ring-white/5 transition-all disabled:opacity-50 placeholder:text-neutral-600 font-sans text-base shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]"
              />
              <div className="absolute inset-0 rounded-[2rem] border border-white/0 group-focus-within:border-white/20 pointer-events-none transition-all duration-500"></div>
            </div>

            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading || isRevealed}
              className={`p-5 backdrop-blur-lg border text-white rounded-[1.8rem] shadow-2xl disabled:opacity-30 transition-all duration-500 glass-noise flex items-center justify-center ${inputValue.trim() && !isLoading
                ? 'bg-white/20 border-white/50 scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                : 'bg-white/5 border-white/20'
                }`}
            >
              <Send size={22} className={inputValue.trim() ? 'animate-[pulse_2s_infinite]' : ''} />
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Mission Dossier (Guess & Stats) */}
      <div className="flex-[0.8] flex flex-col h-full bg-white/10 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.3)] p-8 glass-noise gap-8 overflow-hidden animate-fade-in">

        <div className="flex-1 space-y-8 overflow-y-auto pr-2 scrollbar-hide pt-4">
          {/* Status Section */}
          <div className="bg-white/5 rounded-3xl p-6 border border-white/10 space-y-4 shadow-inner">
            <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase text-neutral-500">
              <span>Identity Status</span>
              <span className={isRevealed ? "text-red-500" : "text-green-500"}>
                {isRevealed ? "Compromised" : "Active"}
              </span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 ${isRevealed ? "w-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "w-1/3 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"}`}></div>
            </div>
          </div>

          {/* Identification Interface */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-white/20"></span>
              Identification
              <span className="w-4 h-[1px] bg-white/20"></span>
            </h4>

            {!isCorrect && !isRevealed ? (
              <form onSubmit={handleGuess} className="space-y-4">
                <div className="relative group glass-noise">
                  <input
                    type="text"
                    value={guessValue}
                    onChange={(e) => setGuessValue(e.target.value)}
                    placeholder="Enter identity..."
                    className={`w-full bg-white/10 border backdrop-blur-lg ${guessFeedback.type === 'error' ? 'border-red-500/50 text-red-400' : 'border-white/20 text-white'} py-4 px-6 focus:outline-none focus:border-white/50 transition-all placeholder:text-neutral-500 font-mono text-sm uppercase tracking-widest rounded-2xl shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]`}
                  />
                  {guessFeedback.text && (
                    <div className={`absolute -top-6 left-2 text-[10px] font-bold tracking-tighter ${guessFeedback.type === 'success' ? 'text-green-500 shadow-sm' : 'text-red-500'}`}>
                      {guessFeedback.text}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!guessValue.trim() || isLoading || guessLoading}
                  className="w-full py-4 bg-white/10 text-white border border-white/30 hover:border-white hover:bg-white hover:text-black transition-all text-xs font-black tracking-[0.3em] uppercase rounded-2xl glass-noise shadow-xl flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  {guessLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Verify Identity"}
                </button>
              </form>
            ) : (
              <div className="p-6 bg-white/10 border border-white/20 rounded-3xl text-center space-y-4 animate-fade-in glass-noise">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Subject Identified</span>
                  <span className="block text-2xl font-black text-white tracking-tighter uppercase">{character.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          {!isRevealed ? (
            <Button variant="danger" size="lg" onClick={revealIdentity} className="w-full text-xs tracking-[0.2em] shadow-2xl">
              <Eye size={16} className="mr-2" /> FORCE REVEAL
            </Button>
          ) : (
            <Button variant="primary" size="lg" onClick={onNewGame} className="w-full text-xs tracking-[0.2em] shadow-2xl">
              <RefreshCw size={16} className="mr-2" /> NEW INTERROGATION
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;