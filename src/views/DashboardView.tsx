import React, { useState } from 'react';
import {
  Flame,
  Zap,
  Award,
  BookOpen,
  FileCheck2,
  CheckCircle2,
  Play,
  ArrowRight,
  Target,
  Sparkles,
  TrendingUp,
  Clock,
  ChevronRight,
  Code2
} from 'lucide-react';
import { UserProfile, Course, ViewMode } from '../types';
import { coursesData, mockTestsData } from '../data/mockData';

interface DashboardViewProps {
  user: UserProfile;
  onNavigate: (view: ViewMode) => void;
  onSelectCourse: (course: Course) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onNavigate,
  onSelectCourse,
}) => {
  const [dailyChallengeAnswer, setDailyChallengeAnswer] = useState<number | null>(null);
  const [dailyChallengeSubmitted, setDailyChallengeSubmitted] = useState(false);

  // Active Enrolled Course
  const activeCourse = coursesData.find((c) => user.enrolledCourseIds.includes(c.id)) || coursesData[0];

  const handleChallengeSubmit = (index: number) => {
    setDailyChallengeAnswer(index);
    setDailyChallengeSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. WELCOME BANNER (Geometric Balance) */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-500 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg shadow-indigo-200 dark:shadow-indigo-950/40">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-md space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Targeting: {user.targetRole} @ {user.targetCompany}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              You have 3 lessons remaining to complete your "{activeCourse.title}" certification module.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  onSelectCourse(activeCourse);
                  onNavigate('courses');
                }}
                className="bg-white text-indigo-600 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Continue Learning</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
            <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center min-w-[90px]">
              <div className="flex items-center justify-center gap-1 text-amber-300 font-extrabold text-xl">
                <Flame className="w-5 h-5 fill-amber-300 animate-bounce" />
                <span>{user.streakDays}</span>
              </div>
              <p className="text-[10px] text-indigo-100 font-bold uppercase tracking-wider mt-0.5">Day Streak</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center min-w-[90px]">
              <div className="flex items-center justify-center gap-1 text-white font-extrabold text-xl">
                <Zap className="w-5 h-5 fill-white" />
                <span>{user.xpPoints}</span>
              </div>
              <p className="text-[10px] text-indigo-100 font-bold uppercase tracking-wider mt-0.5">XP Points</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-center min-w-[90px]">
              <div className="flex items-center justify-center gap-1 text-emerald-300 font-extrabold text-xl">
                <Award className="w-5 h-5" />
                <span>Lv. {user.level}</span>
              </div>
              <p className="text-[10px] text-indigo-100 font-bold uppercase tracking-wider mt-0.5">Level</p>
            </div>
          </div>
        </div>

        {/* Decorative Geometric Circles */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden md:block">
          <div className="w-32 h-32 border-8 border-white rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* 2. MAIN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Continue Learning Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Active Course</span>
              <span className="text-xs font-bold text-slate-500">65% Completed</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850">
              <img
                src={activeCourse.thumbnail}
                alt={activeCourse.title}
                className="w-full sm:w-32 h-24 rounded-xl object-cover"
              />
              <div className="space-y-2 flex-1 w-full">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {activeCourse.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Next Lesson: Module 2: Synthesizable Mealy/Moore FSMs & Non-blocking Assignments
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full w-[65%] rounded-full"></div>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectCourse(activeCourse);
                  onNavigate('courses');
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Resume Lesson</span>
              </button>
            </div>
          </div>

          {/* Daily Challenge Widget */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-emerald-500/5 border border-indigo-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Daily Core Challenge (+50 XP)</span>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                VLSI Circuit Drill
              </span>
            </div>

            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Q: In a standard CMOS digital inverter, why is the PMOS aspect ratio (W/L)p typically sized approximately 2.5 times larger than (W/L)n?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Equalize rise/fall delays (μn ≈ 2.5 × μp)',
                'Minimize sub-threshold gate oxide leakage',
                'Shift switching threshold to exactly VDD',
                'Reduce total dynamic charging capacitance'
              ].map((option, idx) => {
                const isSelected = dailyChallengeAnswer === idx;
                const isCorrect = idx === 0; // Equalize rise/fall delays

                let btnStyle = 'border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-700 dark:text-slate-300';
                if (dailyChallengeSubmitted) {
                  if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold';
                  else if (isSelected && !isCorrect) btnStyle = 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400';
                }

                return (
                  <button
                    key={idx}
                    disabled={dailyChallengeSubmitted}
                    onClick={() => handleChallengeSubmit(idx)}
                    className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {dailyChallengeSubmitted && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-between">
                <span>
                  {dailyChallengeAnswer === 0
                    ? '🎉 Correct! Electron mobility in Silicon is ~2.5x higher than hole mobility, so PMOS must be wider to match pull-up drive strength and achieve symmetric propagation delays.'
                    : 'Option A is correct: Electron mobility μn is ~2.5x hole mobility μp in silicon, so (W/L)p must be widened to equalize rise (tpLH) and fall (tpHL) times.'}
                </span>
              </div>
            )}
          </div>

          {/* Personalized Learning Paths CTA Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-emerald-300 text-[10px] font-extrabold uppercase">
                <Sparkles className="w-3 h-3" />
                <span>Custom Roadmap</span>
              </div>
              <h3 className="text-base font-extrabold">Personalized Learning Paths</h3>
              <p className="text-xs text-indigo-100 max-w-lg">
                Follow a step-by-step sequence of courses, coding challenges, and mock tests customized for <strong>{user.targetRole}</strong>.
              </p>
            </div>
            <button
              onClick={() => onNavigate('pathways')}
              className="bg-white text-indigo-600 hover:bg-slate-100 font-extrabold px-4 py-2.5 rounded-xl text-xs transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
            >
              <span>Explore My Path</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recommended Courses Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Recommended for Your Goal
              </h3>
              <button
                onClick={() => onNavigate('courses')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coursesData.slice(1, 3).map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    onSelectCourse(course);
                    onNavigate('courses');
                  }}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 transition-all cursor-pointer group flex gap-3"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase">
                      {course.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {course.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {course.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Placement Statistics Card (Geometric Balance) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-sm">Placement Statistics</h4>
            <div className="flex-1 flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-end gap-2 px-2">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-24 relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-indigo-400 h-[60%]"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase">Jan</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-24 relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-indigo-500 h-[85%]"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase">Feb</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-24 relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-emerald-500 h-[100%]"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase">Mar</span>
                </div>
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-lg h-24 relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-slate-300 dark:bg-slate-700 h-[40%]"></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase">Apr</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-2xl font-black text-slate-800 dark:text-slate-100">92%</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">SUCCESS RATE</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">4.8</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">AVG RATING</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Sidebar */}
        <div className="space-y-8">
          
          {/* Upcoming Tests Schedule */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-indigo-500" />
                <span>Upcoming Mock Tests</span>
              </h3>
            </div>

            <div className="space-y-3">
              {mockTestsData.map((test) => (
                <div
                  key={test.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{test.title}</h4>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-extrabold whitespace-nowrap">
                      {test.durationMinutes} m
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {test.totalQuestions} Questions • {test.totalMarks} Marks
                  </p>
                  <button
                    onClick={() => onNavigate('tests')}
                    className="w-full py-1.5 rounded-lg text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 transition-colors"
                  >
                    Take Test Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI Mentor Assistant Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">SphereAI Tutor</h4>
                <p className="text-[10px] text-indigo-200">Online 24/7</p>
              </div>
            </div>

            <p className="text-xs text-indigo-100 leading-relaxed relative z-10">
              Stuck on a DSA problem or need a custom 7-day study plan for TCS Digital? Ask SkillSphere AI.
            </p>

            <button
              onClick={() => onNavigate('ai-mentor')}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors text-center flex items-center justify-center gap-2 relative z-10"
            >
              <span>Ask SphereAI Mentor</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-400/20 blur-2xl rounded-full"></div>
          </div>

          {/* Skills Analysis Card (Geometric Balance) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 flex flex-col shadow-sm">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2 text-sm">Skills Analysis</h4>
            <div className="py-4 relative flex items-center justify-center">
              <svg width="140" height="140" viewBox="0 0 100 100" className="overflow-visible">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" />
                <path d="M 50 10 L 85 75 L 15 75 Z" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="2" />
                <circle cx="50" cy="10" r="3" fill="#6366f1" />
                <circle cx="85" cy="75" r="3" fill="#6366f1" />
                <circle cx="15" cy="75" r="3" fill="#6366f1" />
              </svg>
              <div className="absolute top-1 text-[8px] font-bold text-slate-400 tracking-wider">LOGIC</div>
              <div className="absolute bottom-6 right-1 text-[8px] font-bold text-slate-400 tracking-wider">VERBAL</div>
              <div className="absolute bottom-6 left-1 text-[8px] font-bold text-slate-400 tracking-wider">TECH</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">ATS Resume Score</span>
                <button onClick={() => onNavigate('resume')} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Review CV
                </button>
              </div>
              <div className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">84/100</div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Recent Activity
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Completed Lesson 1.1</p>
                  <p className="text-[10px] text-slate-500">Time & Space Complexity • Yesterday</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Solved Two Sum Problem</p>
                  <p className="text-[10px] text-slate-500">Coding Practice • 2 days ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Generated Resume ATS Score</p>
                  <p className="text-[10px] text-slate-500">Resume Builder • 3 days ago</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
