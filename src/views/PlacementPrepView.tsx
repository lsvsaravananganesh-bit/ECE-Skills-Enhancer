import React, { useState, useEffect } from 'react';
import {
  Target,
  Brain,
  MessageSquare,
  Building2,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  Bot,
  ChevronRight,
  Filter,
  FileCode,
  Check,
  X,
  Cpu,
  BarChart3
} from 'lucide-react';
import { PracticeQuestion, CompanyPrepInfo, ViewMode, InterviewSessionRecord, EceInterviewTopic } from '../types';
import { practiceQuestionsData, companiesData } from '../data/mockData';
import { EceTechnicalInterview } from '../components/EceTechnicalInterview';
import { PerformanceTracker } from '../components/PerformanceTracker';

interface PlacementPrepViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenAiWithPrompt: (promptText: string) => void;
}

const DEFAULT_SESSIONS: InterviewSessionRecord[] = [
  {
    id: 's_prev_1',
    timestamp: '2 days ago',
    topic: 'VLSI & STA',
    difficulty: 'Senior Silicon',
    score: 82,
    accuracy: 84,
    keywordDensity: 80,
    benchmarkAccuracy: 88,
    benchmarkKeywordDensity: 82,
    matchedKeywords: ['Setup slack formula', 'Clock skew polarity impact', 'Cell sizing'],
    totalExpectedKeywords: 4,
    rating: 'Strong Pass'
  },
  {
    id: 's_prev_2',
    timestamp: 'Yesterday',
    topic: 'Embedded C & Memory',
    difficulty: 'Junior Silicon',
    score: 76,
    accuracy: 78,
    keywordDensity: 75,
    benchmarkAccuracy: 88,
    benchmarkKeywordDensity: 82,
    matchedKeywords: ['Heap fragmentation', 'Power-of-two buffer size bitmasking', 'Volatile indices'],
    totalExpectedKeywords: 5,
    rating: 'Strong Pass'
  },
  {
    id: 's_prev_3',
    timestamp: 'Earlier Today',
    topic: 'Signal Processing & DSP',
    difficulty: 'Senior Silicon',
    score: 88,
    accuracy: 90,
    keywordDensity: 86,
    benchmarkAccuracy: 88,
    benchmarkKeywordDensity: 82,
    matchedKeywords: ['DFT complexity: O(N^2)', 'Butterfly diagram & twiddle factor symmetry', 'Speedup calculation'],
    totalExpectedKeywords: 5,
    rating: 'Outstanding'
  }
];

export const PlacementPrepView: React.FC<PlacementPrepViewProps> = ({
  onNavigate,
  onOpenAiWithPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'InterviewSimulation' | 'PerformanceTracker' | 'Technical' | 'Companies' | 'Aptitude' | 'Logical' | 'Verbal'>('InterviewSimulation');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [userSelectedOptions, setUserSelectedOptions] = useState<Record<string, number>>({});
  const [selectedCompany, setSelectedCompany] = useState<CompanyPrepInfo | null>(companiesData[0]);
  const [selectedTrackerTopic, setSelectedTrackerTopic] = useState<EceInterviewTopic | undefined>(undefined);

  // Persistent interview sessions
  const [interviewSessions, setInterviewSessions] = useState<InterviewSessionRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ece_interview_sessions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed reading interview sessions from localStorage', e);
    }
    return DEFAULT_SESSIONS;
  });

  const handleRecordSession = (newSession: InterviewSessionRecord) => {
    setInterviewSessions((prev) => {
      const updated = [...prev, newSession];
      try {
        localStorage.setItem('ece_interview_sessions', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed storing interview sessions', e);
      }
      return updated;
    });
  };

  const handleSelectTopicFromTracker = (topic: EceInterviewTopic) => {
    setSelectedTrackerTopic(topic);
    setActiveTab('InterviewSimulation');
  };

  const toggleSolution = (qId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleOptionClick = (qId: string, optIdx: number) => {
    setUserSelectedOptions((prev) => ({ ...prev, [qId]: optIdx }));
    // Auto reveal solution upon clicking option
    setRevealedSolutions((prev) => ({ ...prev, [qId]: true }));
  };

  const currentQuestions = practiceQuestionsData.filter((q) => {
    if (activeTab === 'Aptitude') return q.category === 'Aptitude';
    if (activeTab === 'Logical') return q.category === 'Logical Reasoning';
    if (activeTab === 'Verbal') return q.category === 'Verbal';
    if (activeTab === 'Technical') return q.category === 'Technical';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">ECE Placement Hub</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Semiconductor & Core Placement Preparation
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
          Master VLSI & RTL screening questions, Embedded C registers, Op-Amp circuits, aptitude benchmarks, and premier semiconductor recruitment patterns.
        </p>
      </div>

      {/* Navigation Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('InterviewSimulation')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'InterviewSimulation'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Cpu className="w-4 h-4 text-indigo-500 animate-pulse" />
          <span>ECE Technical Interview (AI Mode)</span>
          <span className="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-indigo-600 text-white uppercase tracking-wider">
            Live
          </span>
        </button>

        <button
          onClick={() => setActiveTab('PerformanceTracker')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'PerformanceTracker'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-500" />
          <span>Performance Tracker</span>
          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            {interviewSessions.length} Rounds
          </span>
        </button>

        <button
          onClick={() => setActiveTab('Technical')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'Technical'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FileCode className="w-4 h-4 text-purple-500" />
          <span>ECE Technical Qs (VLSI & Embedded)</span>
        </button>

        <button
          onClick={() => setActiveTab('Companies')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'Companies'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4 text-amber-500" />
          <span>Semiconductor Company Drives</span>
        </button>

        <button
          onClick={() => setActiveTab('Aptitude')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'Aptitude'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Target className="w-4 h-4 text-emerald-500" />
          <span>Quantitative Aptitude</span>
        </button>

        <button
          onClick={() => setActiveTab('Logical')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'Logical'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Brain className="w-4 h-4 text-indigo-500" />
          <span>Logical Reasoning</span>
        </button>

        <button
          onClick={() => setActiveTab('Verbal')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'Verbal'
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-blue-500" />
          <span>Verbal Ability</span>
        </button>
      </div>

      {/* VIEW CONTENT 0: ECE TECHNICAL INTERVIEW (DYNAMIC QUESTIONS + AI FEEDBACK) */}
      {activeTab === 'InterviewSimulation' && (
        <EceTechnicalInterview
          onOpenAiWithPrompt={onOpenAiWithPrompt}
          sessions={interviewSessions}
          onRecordSession={handleRecordSession}
        />
      )}

      {/* VIEW CONTENT 0.5: PERFORMANCE TRACKER PANEL */}
      {activeTab === 'PerformanceTracker' && (
        <PerformanceTracker
          sessions={interviewSessions}
          onSelectTopic={handleSelectTopicFromTracker}
        />
      )}

      {/* VIEW CONTENT 1: QUESTION BANK (APTITUDE / LOGICAL / VERBAL / TECHNICAL) */}
      {activeTab !== 'Companies' && activeTab !== 'InterviewSimulation' && activeTab !== 'PerformanceTracker' && (
        <div className="space-y-6">
          {currentQuestions.map((q, idx) => {
            const isRevealed = revealedSolutions[q.id];
            const userChoice = userSelectedOptions[q.id];

            return (
              <div
                key={q.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase">
                      {q.topic}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-600' :
                      q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>

                  {q.companyTags && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                      <span>Tags:</span>
                      {q.companyTags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Question {idx + 1}: {q.question}
                </p>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((option, optIdx) => {
                    const isSelected = userChoice === optIdx;
                    const isCorrect = optIdx === q.correctIndex;

                    let btnStyle = 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500';
                    if (isRevealed) {
                      if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold';
                      else if (isSelected && !isCorrect) btnStyle = 'border-rose-500 bg-rose-500/10 text-rose-600';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionClick(q.id, optIdx)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Action buttons: Reveal Solution & Ask AI Mentor */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? 'Hide Solution' : 'Reveal Answer & Solution'}</span>
                  </button>

                  <button
                    onClick={() => onOpenAiWithPrompt(`Can you explain this ${q.category} (${q.topic}) question step-by-step in detail?\nQuestion: "${q.question}"`)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Ask SphereAI Mentor</span>
                  </button>
                </div>

                {/* Solution Explanation Box */}
                {isRevealed && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs space-y-1">
                    <p className="font-bold">✓ Correct Answer: Option {q.correctIndex + 1} ({q.options[q.correctIndex]})</p>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW CONTENT 2: COMPANY-WISE PREP HUB */}
      {activeTab === 'Companies' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Company Selector Sidebar */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-2">Top Hiring Drives</h3>
            {companiesData.map((company) => {
              const isSelected = selectedCompany?.id === company.id;
              return (
                <div
                  key={company.id}
                  onClick={() => setSelectedCompany(company)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-slate-900 dark:text-slate-100 shadow-md'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold">{company.name}</h4>
                      <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">{company.avgPackage}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Company Details */}
          {selectedCompany && (
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
                
                {/* Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <img
                    src={selectedCompany.logo}
                    alt={selectedCompany.name}
                    className="w-14 h-14 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                      {selectedCompany.name}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Target Roles: {selectedCompany.role} • Package: <strong className="text-emerald-500">{selectedCompany.avgPackage}</strong>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedCompany.description}
                </p>

                {/* Exam Rounds */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Selection Rounds Pattern</h4>
                  <div className="space-y-1.5">
                    {selectedCompany.rounds.map((round, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
                        <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{round}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cutoff Benchmark */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
                  <strong>Cut-off Benchmark:</strong> {selectedCompany.cutoffInfo}
                </div>

                {/* Company Sample Questions */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Past Curated Questions</h4>
                  {selectedCompany.sampleQuestions.map((q, idx) => (
                    <div key={q.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 text-xs space-y-2">
                      <p className="font-bold text-slate-800 dark:text-slate-200">Q{idx + 1}: {q.question}</p>
                      <button
                        onClick={() => onOpenAiWithPrompt(`Explain how to solve this ${selectedCompany.name} interview question:\n${q.question}`)}
                        className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <Bot className="w-3.5 h-3.5" />
                        <span>Get AI Solution Step-by-Step</span>
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
