import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, Volume2, VolumeX, CheckCircle, ChevronUp, ChevronDown, Clock } from 'lucide-react';

interface PomodoroTimerProps {
  onClose?: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
  onAwardXp?: (amount: number, reason: string) => void;
  currentView?: string;
}

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

const MODE_DURATIONS: Record<TimerMode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const MODE_LABELS: Record<TimerMode, string> = {
  focus: 'ECE Lab Focus',
  shortBreak: 'Short Break',
  longBreak: 'Circuit Cooldown',
};

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  isOpen: externalIsOpen,
  onToggle: externalOnToggle,
  onAwardXp,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const onToggle = externalOnToggle || (() => setInternalIsOpen((prev) => !prev));
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(MODE_DURATIONS.focus);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(3);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play gentle chime sound when timer finishes
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      const now = ctx.currentTime;
      // Synthesize a pleasant two-tone chime
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.3); // A5

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, now + 0.3);

      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.6);
      osc2.start(now + 0.25);
      osc2.stop(now + 1.2);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      playChime();
      if (mode === 'focus') {
        setSessionsCompleted((prev) => prev + 1);
        onAwardXp?.(50, 'ECE Focus Lab Session Completed (+50 XP)');
        setMode('shortBreak');
        setTimeLeft(MODE_DURATIONS.shortBreak);
      } else {
        setMode('focus');
        setTimeLeft(MODE_DURATIONS.focus);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(MODE_DURATIONS[newMode]);
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(MODE_DURATIONS[mode]);
  };

  const formatTime = (secs: number): string => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const totalDuration = MODE_DURATIONS[mode];
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onToggle}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 dark:bg-slate-800 text-white shadow-xl shadow-indigo-500/20 border border-indigo-500/30 hover:scale-105 transition-all text-xs font-bold group"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <Clock className="w-4 h-4 text-indigo-400" />
          <span>ECE Study Timer</span>
          <span className="font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md text-[11px]">
            {formatTime(timeLeft)}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
            ECE Focus Timer
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title={soundEnabled ? 'Mute Alert' : 'Unmute Alert'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onToggle}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-5 space-y-4">
          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/70 text-[11px] font-bold">
            <button
              onClick={() => switchMode('focus')}
              className={`py-1.5 rounded-lg transition-all ${
                mode === 'focus'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Focus
            </button>
            <button
              onClick={() => switchMode('shortBreak')}
              className={`py-1.5 rounded-lg transition-all ${
                mode === 'shortBreak'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Short
            </button>
            <button
              onClick={() => switchMode('longBreak')}
              className={`py-1.5 rounded-lg transition-all ${
                mode === 'longBreak'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Long
            </button>
          </div>

          {/* Timer Display */}
          <div className="text-center py-2 space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {MODE_LABELS[mode]}
            </p>
            <h3 className="text-4xl font-extrabold tracking-tight font-mono text-slate-900 dark:text-white">
              {formatTime(timeLeft)}
            </h3>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
              <div
                className={`h-full transition-all duration-300 ${
                  mode === 'focus'
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-500'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                }`}
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-6 py-2.5 rounded-xl font-extrabold text-xs text-white shadow-md flex items-center gap-2 transition-transform transform active:scale-95 ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-95'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Start Focus</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Completed Cycles Today */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>Lab sessions done:</span>
            </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {sessionsCompleted} cycles
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
