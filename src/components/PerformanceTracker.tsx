import React, { useState } from 'react';
import {
  TrendingUp,
  Target,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Zap,
  ArrowUpRight,
  Filter,
  Check,
  Cpu
} from 'lucide-react';
import { InterviewSessionRecord, EceInterviewTopic } from '../types';

interface PerformanceTrackerProps {
  sessions: InterviewSessionRecord[];
  onSelectTopic?: (topic: EceInterviewTopic) => void;
}

export const PerformanceTracker: React.FC<PerformanceTrackerProps> = ({
  sessions,
  onSelectTopic,
}) => {
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('All');

  // Filtered sessions
  const filteredSessions = selectedTopicFilter === 'All'
    ? sessions
    : sessions.filter((s) => s.topic === selectedTopicFilter);

  // Compute aggregate statistics
  const totalRounds = sessions.length;
  const avgAccuracy = totalRounds > 0
    ? Math.round(sessions.reduce((acc, s) => acc + s.accuracy, 0) / totalRounds)
    : 0;
  const avgKeywordDensity = totalRounds > 0
    ? Math.round(sessions.reduce((acc, s) => acc + s.keywordDensity, 0) / totalRounds)
    : 0;
  const avgBenchmarkAccuracy = 88;
  const avgBenchmarkKeywordDensity = 82;

  // Topic breakdown
  const topicStats = [
    'VLSI & STA',
    'Embedded C & Memory',
    'Signal Processing & DSP',
    'Analog & Op-Amps',
    'Computer Architecture & Protocols',
  ].map((top) => {
    const matched = sessions.filter((s) => s.topic === top);
    const count = matched.length;
    const acc = count > 0 ? Math.round(matched.reduce((a, b) => a + b.accuracy, 0) / count) : 0;
    const kw = count > 0 ? Math.round(matched.reduce((a, b) => a + b.keywordDensity, 0) / count) : 0;
    return {
      topic: top,
      count,
      accuracy: acc,
      keywordDensity: kw,
    };
  });

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              ECE Analytics Dashboard
            </span>
            <span className="text-xs font-bold text-slate-400">
              Updated Real-Time
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            Technical Interview Performance Tracker
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare your response accuracy and keyword precision against target semiconductor benchmark standards (Texas Instruments, Qualcomm, Intel).
          </p>
        </div>

        {/* Aggregate KPI Badges */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
              Avg Accuracy
            </span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-xl font-black text-indigo-700 dark:text-indigo-300">{avgAccuracy}%</span>
              <span className="text-[10px] font-bold text-slate-400">vs 88% BM</span>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-center">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
              Keyword Density
            </span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-xl font-black text-emerald-700 dark:text-emerald-300">{avgKeywordDensity}%</span>
              <span className="text-[10px] font-bold text-slate-400">vs 82% BM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Section: Accuracy & Keyword Usage over Time compared to ECE Benchmarks */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Interview Progression Over Time vs Ideal ECE Benchmarks</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Each session plots candidate technical accuracy and domain keyword coverage against the 88% & 82% industry benchmark line.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Your Accuracy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">Your Keyword Density</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 border-t-2 border-dashed border-amber-500 inline-block" />
              <span className="text-amber-600 dark:text-amber-400 font-semibold">ECE Benchmark (85-88%)</span>
            </div>
          </div>
        </div>

        {/* Visual Chart Bars Container */}
        {filteredSessions.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs font-semibold">
            No interview sessions recorded yet. Complete a technical interview round above to populate your performance graph!
          </div>
        ) : (
          <div className="pt-6 pb-2">
            {/* SVG / Flex Responsive Chart */}
            <div className="relative">
              {/* Benchmark Reference Guideline (88% Accuracy) */}
              <div
                className="absolute left-0 right-0 border-b-2 border-dashed border-amber-400/80 dark:border-amber-400/60 z-10 pointer-events-none"
                style={{ bottom: '88%' }}
              >
                <span className="absolute right-0 -top-4 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-800">
                  TI / Qualcomm Target Benchmark (88%)
                </span>
              </div>

              {/* Benchmark Guideline (82% Keyword Density) */}
              <div
                className="absolute left-0 right-0 border-b border-dotted border-slate-300 dark:border-slate-700 z-10 pointer-events-none"
                style={{ bottom: '82%' }}
              >
                <span className="absolute left-2 -top-3.5 text-[9px] font-semibold text-slate-400">
                  82% Baseline Keywords
                </span>
              </div>

              {/* Grid Horizontal Marks */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30 text-[9px] text-slate-400 font-mono">
                <div className="border-b border-slate-300 dark:border-slate-700 w-full pb-0.5">100%</div>
                <div className="border-b border-slate-300 dark:border-slate-700 w-full pb-0.5">75%</div>
                <div className="border-b border-slate-300 dark:border-slate-700 w-full pb-0.5">50%</div>
                <div className="border-b border-slate-300 dark:border-slate-700 w-full pb-0.5">25%</div>
                <div className="w-full">0%</div>
              </div>

              {/* Session Columns */}
              <div className="relative z-20 flex items-end justify-around gap-2 sm:gap-4 h-56 pt-6 px-4">
                {filteredSessions.map((session, idx) => {
                  const isPass = session.accuracy >= 75;
                  return (
                    <div key={session.id || idx} className="flex-1 max-w-[80px] flex flex-col items-center h-full justify-end group">
                      
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 z-30 p-2.5 rounded-xl bg-slate-900 text-white text-[11px] shadow-xl pointer-events-none whitespace-nowrap space-y-1">
                        <div className="font-bold text-indigo-300">{session.topic}</div>
                        <div className="flex items-center justify-between gap-3 text-[10px]">
                          <span>Accuracy:</span>
                          <strong className="text-emerald-400">{session.accuracy}%</strong>
                        </div>
                        <div className="flex items-center justify-between gap-3 text-[10px]">
                          <span>Keywords:</span>
                          <strong className="text-indigo-400">{session.keywordDensity}%</strong>
                        </div>
                        <div className="text-[9px] text-slate-400">{session.timestamp}</div>
                      </div>

                      {/* Bar Pair (Accuracy & Keyword Density) */}
                      <div className="w-full flex items-end justify-center gap-1.5 h-full">
                        {/* Accuracy Bar */}
                        <div
                          style={{ height: `${Math.min(100, Math.max(12, session.accuracy))}%` }}
                          className={`w-3 sm:w-4 rounded-t-md transition-all duration-500 relative group-hover:brightness-110 ${
                            isPass ? 'bg-indigo-600 dark:bg-indigo-500 shadow-sm shadow-indigo-500/30' : 'bg-amber-500'
                          }`}
                        >
                          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 hidden group-hover:block">
                            {session.accuracy}%
                          </span>
                        </div>

                        {/* Keyword Density Bar */}
                        <div
                          style={{ height: `${Math.min(100, Math.max(12, session.keywordDensity))}%` }}
                          className="w-3 sm:w-4 rounded-t-md bg-emerald-500 dark:bg-emerald-400 transition-all duration-500 relative group-hover:brightness-110 shadow-sm shadow-emerald-500/30"
                        >
                          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 hidden group-hover:block">
                            {session.keywordDensity}%
                          </span>
                        </div>
                      </div>

                      {/* X-axis Label */}
                      <div className="mt-2 text-center">
                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 block truncate max-w-[65px]">
                          R{idx + 1}
                        </span>
                        <span className="text-[9px] text-slate-400 block truncate max-w-[65px]">
                          {session.topic.split('&')[0].trim()}
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Breakdown by Core ECE Technical Topics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Competency Breakdown by Sub-Domain
          </h4>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            Target Benchmark: 88%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topicStats.map((item) => {
            const hasData = item.count > 0;
            const meetsBenchmark = item.accuracy >= 85;
            return (
              <div
                key={item.topic}
                onClick={() => onSelectTopic && onSelectTopic(item.topic as EceInterviewTopic)}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {item.topic}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold text-slate-500">
                    {item.count} {item.count === 1 ? 'Round' : 'Rounds'}
                  </span>
                </div>

                {hasData ? (
                  <div className="mt-3 space-y-2">
                    {/* Accuracy Progress */}
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        <span>Accuracy</span>
                        <span className={meetsBenchmark ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300 font-bold'}>
                          {item.accuracy}% / 88%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            meetsBenchmark ? 'bg-emerald-500' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${Math.min(100, item.accuracy)}%` }}
                        />
                      </div>
                    </div>

                    {/* Keyword Density Progress */}
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        <span>Keyword Precision</span>
                        <span className="text-slate-700 dark:text-slate-300 font-bold">
                          {item.keywordDensity}% / 82%
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, item.keywordDensity)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 py-2 text-center text-[11px] text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                    Click to practice this topic →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Interview History Table */}
      {sessions.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Recent Interview Logs & Matched Silicon Terminology
            </h4>
            <span className="text-xs text-slate-500">
              {sessions.length} Recorded Rounds
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {sessions.slice(-4).reverse().map((s) => (
              <div key={s.id} className="p-3.5 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {s.topic}
                    </span>
                    <span className="px-2 py-0.2 text-[10px] font-extrabold rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      {s.difficulty}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {s.timestamp}
                    </span>
                  </div>

                  {s.matchedKeywords && s.matchedKeywords.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 text-[10px] text-slate-500">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Matched Keywords:</span>
                      {s.matchedKeywords.map((kw, i) => (
                        <span key={i} className="px-1.5 py-0.2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded text-emerald-700 dark:text-emerald-300">
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                      Acc: {s.accuracy}% | KW: {s.keywordDensity}%
                    </div>
                    <span className={`text-[10px] font-bold ${
                      s.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'
                    }`}>
                      {s.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
