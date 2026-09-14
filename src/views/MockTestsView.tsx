import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  Award,
  Play,
  CheckCircle2,
  BarChart3,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { MockTest, TestResult } from '../types';
import { mockTestsData } from '../data/mockData';
import { TestRunnerView } from './TestRunnerView';

interface MockTestsViewProps {
  completedResults: TestResult[];
  onSaveResult: (result: TestResult) => void;
}

export const MockTestsView: React.FC<MockTestsViewProps> = ({
  completedResults,
  onSaveResult,
}) => {
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);

  if (activeTest) {
    return (
      <TestRunnerView
        test={activeTest}
        onExit={() => setActiveTest(null)}
        onFinish={(res) => {
          onSaveResult(res);
          setActiveTest(null);
        }}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Placement Benchmarks</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Mock Tests & Assessment Engine
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          Simulated timed drives with percentile analytics and question solutions.
        </p>
      </div>

      {/* Available Mock Tests Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTestsData.map((test) => (
          <div
            key={test.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 hover:border-indigo-500 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold uppercase">
                  {test.category}
                </span>
                {test.companyTag && (
                  <span className="text-[10px] font-bold text-slate-400">
                    {test.companyTag}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {test.title}
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {test.durationMinutes} Minutes
              </span>
              <span>• {test.totalQuestions} Questions</span>
              <span>• {test.totalMarks} Marks</span>
            </div>

            <button
              onClick={() => setActiveTest(test)}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Timed Mock Test</span>
            </button>
          </div>
        ))}
      </div>

      {/* Past Completed Results Section */}
      {completedResults.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" />
            <span>Completed Mock Test History</span>
          </h3>

          <div className="space-y-3">
            {completedResults.map((res) => (
              <div
                key={res.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{res.testTitle}</h4>
                  <p className="text-[11px] text-slate-500">Completed on {res.completedAt}</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="text-emerald-500">Score: {res.score} / {res.totalMarks}</span>
                  <span className="text-indigo-500">Accuracy: {res.accuracyPercentage}%</span>
                  <span className="text-amber-500">Percentile: {res.percentile}%ile</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
