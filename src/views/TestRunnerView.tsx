import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  BarChart3,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MockTest, TestResult } from '../types';

interface TestRunnerViewProps {
  test: MockTest;
  onFinish: (result: TestResult) => void;
  onExit: () => void;
}

export const TestRunnerView: React.FC<TestRunnerViewProps> = ({
  test,
  onFinish,
  onExit,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(test.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Timer Effect
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  const handleOptionSelect = (optIndex: number) => {
    const qId = test.questions[currentQIndex].id;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    setShowConfirmSubmit(false);

    // Calculate score
    let score = 0;
    let correctCount = 0;

    test.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += q.marks;
        correctCount += 1;
      }
    });

    const accuracy = Math.round((correctCount / test.questions.length) * 100);

    // Trigger Confetti Celebration if passed (>60%)
    if (accuracy >= 60) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti triggered');
      }
    }

    const result: TestResult = {
      id: `res_${Date.now()}`,
      testId: test.id,
      testTitle: test.title,
      completedAt: new Date().toISOString().split('T')[0],
      score,
      totalMarks: test.totalMarks,
      accuracyPercentage: accuracy,
      percentile: Math.min(99, Math.max(75, accuracy + 12)),
      timeSpentSeconds: test.durationMinutes * 60 - timeLeftSeconds,
      answersMap: userAnswers,
    };

    onFinish(result);
  };

  const currentQ = test.questions[currentQIndex];

  // Format Time
  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      
      {/* Test Runner Top Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <button onClick={onExit} className="text-xs font-bold text-slate-400 hover:text-white">
            ← Exit Test
          </button>
          <span className="text-sm font-extrabold truncate max-w-xs sm:max-w-md">{test.title}</span>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 font-mono text-sm font-bold">
          <Clock className="w-4 h-4" />
          <span>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Main Runner Grid */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Question View (3 Cols) */}
          <div className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Question {currentQIndex + 1} of {test.questions.length} • Section: {currentQ.section}
              </span>
              <span className="text-xs font-bold text-emerald-500">
                +{currentQ.marks} Marks
              </span>
            </div>

            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              {currentQ.question}
            </p>

            {/* Options */}
            <div className="space-y-2 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = userAnswers[currentQ.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full p-4 rounded-2xl border text-xs text-left font-medium transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Nav Controls */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                disabled={currentQIndex === 0}
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
              >
                Previous
              </button>

              {currentQIndex < test.questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQIndex((prev) => Math.min(test.questions.length - 1, prev + 1))}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
                >
                  Submit Final Test
                </button>
              )}
            </div>
          </div>

          {/* Question Palette Grid (1 Col) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Question Palette
            </h4>

            <div className="grid grid-cols-4 gap-2">
              {test.questions.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCurrent = currentQIndex === idx;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all ${
                      isCurrent
                        ? 'ring-2 ring-indigo-500 bg-indigo-600 text-white'
                        : isAnswered
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors mt-4"
            >
              Submit Test
            </button>
          </div>
        </div>
      ) : (
        /* RESULTS PAGE */
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 font-bold mb-2">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              Mock Test Completed!
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Detailed performance report generated.
            </p>
          </div>

          <button
            onClick={onExit}
            className="px-6 py-3 rounded-2xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            Back to Mock Test Hub
          </button>
        </div>
      )}

      {/* Confirmation Submit Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Confirm Test Submission</h3>
            <p className="text-xs text-slate-500">
              You have answered {Object.keys(userAnswers).length} out of {test.questions.length} questions. Are you sure you want to finalize your score?
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Cancel & Resume
              </button>
              <button
                onClick={handleSubmitTest}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-xs font-bold text-white"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
