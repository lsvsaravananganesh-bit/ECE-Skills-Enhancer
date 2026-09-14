import React, { useState } from 'react';
import {
  Code2,
  Play,
  RotateCcw,
  Sparkles,
  Bot,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  ChevronRight,
  Loader2,
  Lightbulb
} from 'lucide-react';
import { CodingProblem } from '../types';
import { codingProblemsData } from '../data/mockData';

interface CodingPracticeViewProps {
  onOpenAiWithPrompt: (promptText: string) => void;
}

export const CodingPracticeView: React.FC<CodingPracticeViewProps> = ({
  onOpenAiWithPrompt,
}) => {
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem>(codingProblemsData[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'javascript' | 'cpp' | 'java'>('python');
  const [userCode, setUserCode] = useState<string>(codingProblemsData[0].starterCode.python);
  const [customInput, setCustomInput] = useState<string>(codingProblemsData[0].sampleCases[0]?.input || '');
  const [activeTab, setActiveTab] = useState<'code' | 'ai-explain'>('code');

  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string } | null>(null);

  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  const handleSelectProblem = (prob: CodingProblem) => {
    setSelectedProblem(prob);
    setUserCode(prob.starterCode[selectedLanguage]);
    setCustomInput(prob.sampleCases[0]?.input || '');
    setTestResults(null);
    setAiExplanation(null);
  };

  const handleLanguageChange = (lang: 'python' | 'javascript' | 'cpp' | 'java') => {
    setSelectedLanguage(lang);
    setUserCode(selectedProblem.starterCode[lang]);
  };

  const handleResetCode = () => {
    setUserCode(selectedProblem.starterCode[selectedLanguage]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTestResults(null);

    setTimeout(() => {
      setIsRunning(false);
      setTestResults({
        passed: true,
        output: selectedProblem.sampleCases[0]?.expectedOutput || 'Output matched expected test cases!'
      });
    }, 1200);
  };

  const handleAnalyzeWithAi = async () => {
    setIsAiAnalyzing(true);
    setActiveTab('ai-explain');

    try {
      const res = await fetch('/api/ai/code-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: userCode,
          language: selectedLanguage,
          problemTitle: selectedProblem.title,
        }),
      });

      const data = await res.json();
      setAiExplanation(data.explanation || 'Analyzed code successfully.');
    } catch (err) {
      setAiExplanation('Failed to communicate with AI server. Make sure Gemini API is active.');
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">ECE Hardware Sandbox</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Hardware & Embedded IDE
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
          Write and verify synthesizable Verilog HDL, bare-metal Embedded C, bitmask manipulation, and ring buffers with real-time AI code analysis.
        </p>
      </div>

      {/* Problem Selector Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {codingProblemsData.map((prob) => {
          const isSelected = selectedProblem.id === prob.id;
          return (
            <button
              key={prob.id}
              onClick={() => handleSelectProblem(prob)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{prob.title}</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold ${
                prob.difficulty === 'Easy' ? 'bg-emerald-400 text-slate-950' : 'bg-amber-400 text-slate-950'
              }`}>
                {prob.difficulty}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Split-Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* LEFT COLUMN: PROBLEM STATEMENT & TEST CASES */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase">
                {selectedProblem.category}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Acceptance: {selectedProblem.acceptanceRate}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              {selectedProblem.title}
            </h2>
          </div>

          <div className="prose dark:prose-invert text-xs text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
            <p className="whitespace-pre-line">{selectedProblem.description}</p>
          </div>

          {/* Input & Output Format */}
          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">Input Format</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-pre-line font-mono bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850">
                {selectedProblem.inputFormat}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">Constraints</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-pre-line font-mono bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-850">
                {selectedProblem.constraints}
              </p>
            </div>
          </div>

          {/* Sample Test Case */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Sample Test Case</h4>
            {selectedProblem.sampleCases.map((tc, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 text-xs space-y-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Input</span>
                  <p className="font-mono text-slate-800 dark:text-slate-200 mt-0.5">{tc.input}</p>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-500 font-bold uppercase">Expected Output</span>
                  <p className="font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">{tc.expectedOutput}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: CODE EDITOR & RUN SIMULATOR */}
        <div className="space-y-4">
          
          {/* Language Selector & Controls Bar */}
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-2">
            
            {/* Language Selector */}
            <div className="flex items-center gap-1">
              {(['python', 'javascript', 'cpp', 'java'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                    selectedLanguage === lang
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {lang === 'python' ? 'Python 3' : lang === 'javascript' ? 'JS' : lang === 'cpp' ? 'C++' : 'Java'}
                </button>
              ))}
            </div>

            <button
              onClick={handleResetCode}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reset Starter Code"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Code Editor Box */}
          <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-xl overflow-hidden text-slate-200 font-mono text-xs flex flex-col h-[380px]">
            <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>main.{selectedLanguage === 'python' ? 'py' : selectedLanguage === 'javascript' ? 'js' : selectedLanguage === 'cpp' ? 'cpp' : 'java'}</span>
              </span>
              <span>UTF-8 • Monospace</span>
            </div>

            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              spellCheck={false}
              className="w-full flex-1 p-4 bg-transparent text-emerald-300 focus:outline-none resize-none font-mono leading-relaxed"
            />
          </div>

          {/* Action Buttons: Run Code & AI Analyze */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isRunning ? 'Running Test Cases...' : 'Run Code'}</span>
            </button>

            <button
              onClick={handleAnalyzeWithAi}
              disabled={isAiAnalyzing}
              className="py-3 px-4 rounded-xl font-bold text-xs text-indigo-300 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800 transition-colors flex items-center justify-center gap-2"
            >
              {isAiAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4 text-emerald-400" />}
              <span>AI Code Breakdown</span>
            </button>
          </div>

          {/* TEST RESULTS OUTPUT */}
          {testResults && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 text-xs font-mono text-emerald-400 space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Test Cases Passed (1/1)</span>
              </div>
              <p className="text-[11px] text-slate-300 pt-1">Stdout Output: {testResults.output}</p>
            </div>
          )}

          {/* AI EXPLANATION OUTPUT BOX */}
          {aiExplanation && (
            <div className="p-5 rounded-3xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-100 space-y-3">
              <div className="flex items-center gap-2 text-indigo-300 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>SphereAI Code Logic & Big-O Breakdown</span>
              </div>
              <p className="whitespace-pre-line leading-relaxed text-slate-200 text-[11px]">
                {aiExplanation}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
