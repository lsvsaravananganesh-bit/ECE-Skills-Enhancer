import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Calendar,
  BookOpen,
  User,
  Loader2,
  Clock,
  CheckCircle2,
  Brain,
  MessageSquare,
  Zap,
  HelpCircle
} from 'lucide-react';
import { ChatMessage, StudyPlanDay, UserProfile } from '../types';

interface AIMentorViewProps {
  user: UserProfile;
  initialPrompt?: string;
}

export const AIMentorView: React.FC<AIMentorViewProps> = ({ user, initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm_1',
      sender: 'ai',
      text: `Hello ${user.name}! I am **SphereAI Circuit & RTL Mentor**, your specialized semiconductor, embedded systems, and core ECE tutor. Ask me to derive Op-Amp gain or KCL/KVL formulas, debug synthesizable Verilog code, explain ARM Cortex-M register bitmasking, or prepare for Texas Instruments, Qualcomm, and Intel technical interviews!`,
      timestamp: 'Just now',
    },
    ...(initialPrompt ? [{
      id: 'm_init',
      sender: 'user' as const,
      text: initialPrompt,
      timestamp: 'Just now'
    }] : [])
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // AI Study Planner Generator State
  const [showPlannerModal, setShowPlannerModal] = useState(false);
  const [targetGoal, setTargetGoal] = useState('Semiconductor Core Placements (Texas Instruments / Qualcomm / Intel)');
  const [daysAvailable, setDaysAvailable] = useState(7);
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [weakTopics, setWeakTopics] = useState('Static Timing Analysis (STA), Verilog FSMs, Op-Amps, ARM NVIC Interrupts');
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlanDay[] | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  const quickPrompts = [
    'Derive Non-Inverting Op-Amp gain using Virtual Ground concept',
    'Explain Setup Time vs Hold Time violations in Verilog RTL & STA',
    'How do I configure STM32 GPIO registers in bare-metal C?',
    'What are Texas Instruments core technical interview screening topics?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));

      const res = await fetch('/api/ai/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          context: `Student target role: ${user.targetRole}, Target company: ${user.targetCompany}`,
        }),
      });

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: `m_${Date.now() + 1}`,
        sender: 'ai',
        text: data.response || 'I am ready to help you prepare!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `m_err_${Date.now()}`,
          sender: 'ai',
          text: 'Encountered a network hiccup connecting to AI server. Please try asking again!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateStudyPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingPlan(true);

    try {
      const res = await fetch('/api/ai/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetGoal,
          daysAvailable,
          hoursPerDay,
          weakTopics,
        }),
      });

      const data = await res.json();
      setGeneratedPlan(data.plan || []);
    } catch {
      setGeneratedPlan([
        { day: 1, topic: 'Quantitative Aptitude - Numbers & Percentages', focus: 'Solve 15 speed questions', estimatedHours: hoursPerDay },
        { day: 2, topic: 'Data Structures - Arrays & Two Pointers', focus: 'Two Sum & Sliding Window', estimatedHours: hoursPerDay },
        { day: 3, topic: 'Logical Reasoning - Syllogisms & Blood Relations', focus: 'Diagram solving techniques', estimatedHours: hoursPerDay },
      ]);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">AI Learning Companion</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            SphereAI Academic & Placement Mentor
          </h1>
        </div>

        <button
          onClick={() => setShowPlannerModal(true)}
          className="px-4 py-2.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 shadow-md transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Calendar className="w-4 h-4" />
          <span>Generate AI Study Plan</span>
        </button>
      </div>

      {/* Main Chat Window */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[600px]">
        
        {/* Chat Top Info Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
              <Bot className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>SphereAI Tutor</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Powered by Gemini 3.6 Flash</p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
            24/7 Doubt Solver
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-[80%] sm:max-w-[70%] p-4 rounded-2xl text-xs leading-relaxed space-y-1 ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{m.text}</p>
                  <p className={`text-[9px] text-right pt-1 ${isUser ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {m.timestamp}
                  </p>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold italic">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
              <span>SphereAI is thinking...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Prompts:</span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp)}
              className="px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 whitespace-nowrap transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask SphereAI anything about DSA, Aptitude, or Interviews..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md disabled:opacity-50 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AI STUDY PLANNER MODAL */}
      {showPlannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-indigo-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Generate Personalized Study Roadmap
                </h3>
              </div>
              <button
                onClick={() => setShowPlannerModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleGenerateStudyPlan} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Exam / Goal</label>
                  <input
                    type="text"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Preparation Days</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={daysAvailable}
                    onChange={(e) => setDaysAvailable(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Weak Topics / Areas to Focus</label>
                <input
                  type="text"
                  value={weakTopics}
                  onChange={(e) => setWeakTopics(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <button
                type="submit"
                disabled={isGeneratingPlan}
                className="w-full py-3 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isGeneratingPlan ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-emerald-400" />}
                <span>{isGeneratingPlan ? 'Generating Custom AI Roadmap...' : 'Generate Daily Schedule'}</span>
              </button>
            </form>

            {/* Generated Plan Output */}
            {generatedPlan && (
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Your Custom {daysAvailable}-Day Study Plan</span>
                </h4>

                <div className="space-y-2">
                  {generatedPlan.map((item) => (
                    <div key={item.day} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 text-xs flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 font-bold flex items-center justify-center text-[10px] shrink-0">
                        D{item.day}
                      </span>
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-900 dark:text-slate-100">{item.topic}</p>
                        <p className="text-[11px] text-slate-500">{item.focus}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
