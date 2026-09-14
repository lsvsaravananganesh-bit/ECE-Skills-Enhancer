import React, { useState } from 'react';
import {
  Sparkles,
  Compass,
  CheckCircle2,
  Circle,
  BookOpen,
  Code2,
  FileCheck2,
  FolderGit2,
  ArrowRight,
  Clock,
  Target,
  Trophy,
  BarChart3,
  Bot,
  Zap,
  Plus,
  RotateCcw,
  Building2,
  GraduationCap,
  Brain,
  Layout,
  Layers,
  ChevronRight,
  Share2,
  Award,
  Filter
} from 'lucide-react';
import { LearningPath, PathTask, UserProfile, Course, CodingProblem, MockTest, ViewMode } from '../types';
import { initialLearningPaths } from '../data/learningPathsData';

interface LearningPathViewProps {
  user: UserProfile;
  onNavigate: (view: ViewMode) => void;
  onSelectCourse: (course: Course) => void;
  onUpdateUserGoal?: (targetRole: string, targetCompany: string) => void;
  onOpenAiMentorWithPrompt?: (prompt: string) => void;
  courses: Course[];
  codingProblems: CodingProblem[];
  mockTests: MockTest[];
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  user,
  onNavigate,
  onSelectCourse,
  onUpdateUserGoal,
  onOpenAiMentorWithPrompt,
  courses,
  codingProblems,
  mockTests,
}) => {
  const [paths, setPaths] = useState<LearningPath[]>(initialLearningPaths);
  const [selectedPathId, setSelectedPathId] = useState<string>(initialLearningPaths[0].id);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  
  // Custom AI Path Modal State
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [customGoal, setCustomGoal] = useState<string>('');
  const [customLevel, setCustomLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [customWeeks, setCustomWeeks] = useState<number>(8);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  // Active path object
  const activePath = paths.find((p) => p.id === selectedPathId) || paths[0];

  // Helper to toggle task completion
  const handleToggleTask = (milestoneId: string, taskId: string) => {
    setPaths((prevPaths) =>
      prevPaths.map((path) => {
        if (path.id !== activePath.id) return path;
        return {
          ...path,
          milestones: path.milestones.map((m) => {
            if (m.id !== milestoneId) return m;
            return {
              ...m,
              tasks: m.tasks.map((t) => {
                if (t.id !== taskId) return t;
                return { ...t, isCompleted: !t.isCompleted };
              }),
            };
          }),
        };
      })
    );
  };

  // Calculate overall progress for active path
  const allTasks = activePath.milestones.flatMap((m) => m.tasks);
  const completedTasks = allTasks.filter((t) => t.isCompleted);
  const progressPercentage = allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0;

  // Filter paths by category
  const categories = ['All', 'Software Engineering', 'Data & AI', 'Placement Crack'];
  const filteredPaths = categoryFilter === 'All'
    ? paths
    : paths.filter((p) => p.category === categoryFilter);

  // Handle direct navigation to target task
  const handleTaskAction = (task: PathTask) => {
    if (task.type === 'course') {
      const foundCourse = courses.find((c) => c.id === task.targetId) || courses[0];
      if (foundCourse) {
        onSelectCourse(foundCourse);
        onNavigate('courses');
      }
    } else if (task.type === 'coding') {
      onNavigate('coding');
    } else if (task.type === 'practice') {
      onNavigate('placement');
    } else if (task.type === 'test') {
      onNavigate('tests');
    } else if (task.type === 'project') {
      if (onOpenAiMentorWithPrompt) {
        onOpenAiMentorWithPrompt(`Can you help me design and structure the capstone project: "${task.title}"? Give me a step-by-step tech stack recommendation, system design schema, and milestone checklist.`);
      } else {
        onNavigate('ai-mentor');
      }
    }
  };

  // Generate dynamic custom path using AI
  const handleGenerateCustomPath = async () => {
    if (!customGoal.trim()) return;
    setIsGeneratingAi(true);

    try {
      // Call server AI endpoint or generate smart structured response
      const response = await fetch('/api/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Create a structured 4-phase learning path for a career goal of: "${customGoal}". User target level is ${customLevel} and timeline is ${customWeeks} weeks. Return valid structured JSON only.`,
          context: `Target Goal: ${customGoal}, Level: ${customLevel}, Weeks: ${customWeeks}`,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Parse or construct generated path
        const newPathId = `path_custom_${Date.now()}`;
        const newPath: LearningPath = {
          id: newPathId,
          roleTitle: customGoal,
          iconName: 'Sparkles',
          description: `Custom AI-generated ${customWeeks}-week roadmap optimized for ${customGoal} at ${customLevel} level.`,
          category: 'Software Engineering',
          targetCompanyTypes: ['Tech Companies', 'Startups', 'Global Enterprises'],
          recommendedLevel: customLevel,
          totalDurationWeeks: customWeeks,
          estimatedHoursPerWeek: 10,
          prerequisites: ['Basic problem solving skills', 'High motivation'],
          skillsGained: [
            `${customGoal} Core Architecture`,
            'Applied Project Development',
            'Technical Problem Solving',
            'System Optimization & Best Practices'
          ],
          milestones: [
            {
              id: `m1_${newPathId}`,
              phaseNumber: 1,
              title: `Phase 1: Foundations of ${customGoal}`,
              description: 'Build robust core knowledge, syntax, and fundamental concepts required for this role.',
              estimatedWeeks: `Weeks 1 - ${Math.max(2, Math.floor(customWeeks / 4))}`,
              tasks: [
                {
                  id: `t1_${newPathId}`,
                  title: `Master ${customGoal} Core Concepts`,
                  type: 'course',
                  targetId: 'crs_dsa_101',
                  duration: '12 Hours',
                  difficulty: customLevel,
                  description: 'Learn foundational principles and core patterns.',
                  isCompleted: false
                },
                {
                  id: `t2_${newPathId}`,
                  title: 'Practice Foundational Exercises',
                  type: 'practice',
                  targetId: 'p_01',
                  duration: '45 mins',
                  difficulty: 'Easy',
                  description: 'Solve introductory problem set to reinforce learning.',
                  isCompleted: false
                }
              ]
            },
            {
              id: `m2_${newPathId}`,
              phaseNumber: 2,
              title: `Phase 2: Applied Engineering & Intermediate Frameworks`,
              description: 'Tackle real-world scenarios, APIs, system mechanics, and intermediate challenge sets.',
              estimatedWeeks: `Weeks ${Math.floor(customWeeks / 4) + 1} - ${Math.floor(customWeeks / 2)}`,
              tasks: [
                {
                  id: `t3_${newPathId}`,
                  title: `Deep Dive into ${customGoal} Advanced Topics`,
                  type: 'course',
                  targetId: 'crs_core_301',
                  duration: '18 Hours',
                  difficulty: customLevel,
                  description: 'Explore production-grade architecture and best practices.',
                  isCompleted: false
                },
                {
                  id: `t4_${newPathId}`,
                  title: 'Solve Intermediate Challenge Problem Set',
                  type: 'coding',
                  targetId: 'p_02',
                  duration: '60 mins',
                  difficulty: 'Medium',
                  description: 'Apply pattern-based algorithmic solutions.',
                  isCompleted: false
                }
              ]
            },
            {
              id: `m3_${newPathId}`,
              phaseNumber: 3,
              title: 'Phase 3: Real-World Capstone & Systems Integration',
              description: 'Build a production-level project demonstrating end-to-end expertise.',
              estimatedWeeks: `Weeks ${Math.floor(customWeeks / 2) + 1} - ${Math.floor((customWeeks * 3) / 4)}`,
              tasks: [
                {
                  id: `t5_${newPathId}`,
                  title: `Capstone Project: End-to-End ${customGoal} System`,
                  type: 'project',
                  duration: '10 Hours',
                  difficulty: 'Advanced',
                  description: 'Design, write, test, and document a full portfolio project.',
                  isCompleted: false
                }
              ]
            },
            {
              id: `m4_${newPathId}`,
              phaseNumber: 4,
              title: 'Phase 4: Interview Drill & Career Readiness',
              description: 'Mock technical assessments, STAR behavioral responses, and resume optimization.',
              estimatedWeeks: `Weeks ${Math.floor((customWeeks * 3) / 4) + 1} - ${customWeeks}`,
              tasks: [
                {
                  id: `t6_${newPathId}`,
                  title: 'Complete Mock Placement Drive Assessment',
                  type: 'test',
                  targetId: 'test_tech_301',
                  duration: '60 mins',
                  difficulty: 'Intermediate',
                  description: 'Evaluate overall readiness with a comprehensive timed mock.',
                  isCompleted: false
                }
              ]
            }
          ]
        };

        setPaths((prev) => [newPath, ...prev]);
        setSelectedPathId(newPathId);
        setShowAiModal(false);
        setCustomGoal('');
      }
    } catch (err) {
      console.error('Error generating AI path', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const getTaskIcon = (type: PathTask['type']) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'coding':
        return <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'practice':
        return <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'test':
        return <FileCheck2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'project':
        return <FolderGit2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
    }
  };

  const getTaskBadgeStyle = (type: PathTask['type']) => {
    switch (type) {
      case 'course':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      case 'coding':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'practice':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'test':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'project':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. HERO BANNER */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/20 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Personalized Career Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Personalized Learning Paths
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              Select your dream role to unlock a structured sequence of courses, practice problems, coding challenges, and mock tests designed to guarantee career readiness.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowAiModal(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-extrabold px-5 py-3 rounded-2xl text-xs sm:text-sm shadow-lg shadow-emerald-950/30 transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
              <span>✨ AI Generate Custom Goal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. CAREER GOALS SELECTION GRID & FILTERS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Choose Your Career Goal</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select a structured track to inspect milestones and track step-by-step progress
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  categoryFilter === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Path Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPaths.map((path) => {
            const isSelected = path.id === activePath.id;
            const pathTasks = path.milestones.flatMap((m) => m.tasks);
            const pathDone = pathTasks.filter((t) => t.isCompleted).length;
            const pathPct = pathTasks.length > 0 ? Math.round((pathDone / pathTasks.length) * 100) : 0;

            return (
              <div
                key={path.id}
                onClick={() => setSelectedPathId(path.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                      {path.category}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-1">
                      {path.roleTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {path.description}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {path.totalDurationWeeks} Wks
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                      {path.recommendedLevel}
                    </span>
                  </div>
                </div>

                {/* Mini Progress */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-500 dark:text-slate-400">Progress</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{pathPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${pathPct}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE PATH WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3): Milestones & Task Sequence */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Path Header Details Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    {activePath.roleTitle}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    {activePath.recommendedLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activePath.description}
                </p>
              </div>

              {onUpdateUserGoal && (
                <button
                  onClick={() => {
                    const firstCompany = activePath.targetCompanyTypes[0] || 'Top Product Companies';
                    onUpdateUserGoal(activePath.roleTitle, firstCompany);
                  }}
                  className="shrink-0 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Set as Profile Goal</span>
                </button>
              )}
            </div>

            {/* Target Companies & Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Duration</span>
                <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{activePath.totalDurationWeeks} Weeks</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Pacing</span>
                <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{activePath.estimatedHoursPerWeek} hrs / week</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Tasks Done</span>
                <span className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{completedTasks.length} / {allTasks.length}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5">Readiness</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{progressPercentage}%</span>
              </div>
            </div>

            {/* Readiness Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Overall Career Readiness Score</span>
                <span className="text-indigo-600 dark:text-indigo-400">{progressPercentage}% Completed</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-500 rounded-full transition-all duration-700 shadow-sm"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Sequential Milestones & Tasks Timeline */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Structured Milestone Timeline</span>
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {activePath.milestones.length} Sequential Phases
              </span>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
              {activePath.milestones.map((milestone, idx) => {
                const milestoneTasks = milestone.tasks;
                const milestoneDoneCount = milestoneTasks.filter((t) => t.isCompleted).length;
                const isMilestoneComplete = milestoneDoneCount === milestoneTasks.length && milestoneTasks.length > 0;

                return (
                  <div key={milestone.id} className="relative pl-12 space-y-3">
                    {/* Phase Circle Badge */}
                    <div
                      className={`absolute left-2.5 top-0 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-sm ${
                        isMilestoneComplete
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : milestoneDoneCount > 0
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-500'
                      }`}
                    >
                      {isMilestoneComplete ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        milestone.phaseNumber
                      )}
                    </div>

                    {/* Milestone Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold uppercase text-indigo-600 dark:text-indigo-400">
                              Phase {milestone.phaseNumber}
                            </span>
                            <span className="text-xs font-medium text-slate-400">• {milestone.estimatedWeeks}</span>
                          </div>
                          <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                            {milestone.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {milestone.description}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                            {milestoneDoneCount} / {milestoneTasks.length} Completed
                          </span>
                        </div>
                      </div>

                      {/* Tasks List */}
                      <div className="space-y-3">
                        {milestone.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                              task.isCompleted
                                ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800/80 opacity-90'
                                : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800'
                            }`}
                          >
                            <div className="flex items-start gap-3 flex-1">
                              {/* Checkbox */}
                              <button
                                onClick={() => handleToggleTask(milestone.id, task.id)}
                                className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-500 transition-colors"
                              >
                                {task.isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                                )}
                              </button>

                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span
                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getTaskBadgeStyle(
                                      task.type
                                    )}`}
                                  >
                                    {getTaskIcon(task.type)}
                                    <span>{task.type}</span>
                                  </span>

                                  {task.difficulty && (
                                    <span className="text-[10px] font-bold text-slate-400">
                                      • {task.difficulty}
                                    </span>
                                  )}
                                  <span className="text-[10px] text-slate-400">• {task.duration}</span>
                                </div>

                                <h5
                                  className={`text-xs sm:text-sm font-bold ${
                                    task.isCompleted
                                      ? 'line-through text-slate-400 dark:text-slate-500'
                                      : 'text-slate-800 dark:text-slate-200'
                                  }`}
                                >
                                  {task.title}
                                </h5>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                  {task.description}
                                </p>
                              </div>
                            </div>

                            {/* Action Button */}
                            <div className="shrink-0 self-end sm:self-center">
                              <button
                                onClick={() => handleTaskAction(task)}
                                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5"
                              >
                                <span>
                                  {task.type === 'course'
                                    ? 'Start Course'
                                    : task.type === 'coding'
                                    ? 'Solve Code'
                                    : task.type === 'practice'
                                    ? 'Practice'
                                    : task.type === 'test'
                                    ? 'Take Test'
                                    : 'Project Specs'}
                                </span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Sidebar Info & AI Mentor Insights */}
        <div className="space-y-6">
          {/* Target Roles & Companies */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Target Company Profiles</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {activePath.targetCompanyTypes.map((comp) => (
                <span
                  key={comp}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Key Skills Gained */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Skills Gained on Path</span>
            </h4>
            <div className="space-y-2">
              {activePath.skillsGained.map((skill) => (
                <div key={skill} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Mentor Assistant Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white space-y-4 shadow-xl relative overflow-hidden border border-indigo-500/20">
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm">SphereAI Career Coach</h4>
                <p className="text-[10px] text-indigo-200">Real-time Path Guidance</p>
              </div>
            </div>

            <p className="text-xs text-indigo-100 leading-relaxed relative z-10">
              Need custom interview questions or a study timetable tailored for {activePath.roleTitle}?
            </p>

            <button
              onClick={() => {
                const prompt = `I am following the "${activePath.roleTitle}" learning path. Can you give me a weekly study schedule, top interview question patterns for companies like ${activePath.targetCompanyTypes.join(', ')}, and tips on what projects to build?`;
                if (onOpenAiMentorWithPrompt) {
                  onOpenAiMentorWithPrompt(prompt);
                } else {
                  onNavigate('ai-mentor');
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors text-center flex items-center justify-center gap-2 relative z-10"
            >
              <span>Get AI Path Advice</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-400/20 blur-2xl rounded-full"></div>
          </div>
        </div>
      </div>

      {/* 4. AI GENERATE CUSTOM GOAL MODAL */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                    AI Goal Generator
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Enter any dream career role to generate a custom structured path
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                  Desired Role / Career Goal
                </label>
                <input
                  type="text"
                  placeholder="e.g., Cloud & DevOps Architect, iOS Swift Developer, ML Engineer"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                    Current Level
                  </label>
                  <select
                    value={customLevel}
                    onChange={(e) => setCustomLevel(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                    Timeline (Weeks)
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={24}
                    value={customWeeks}
                    onChange={(e) => setCustomWeeks(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCustomPath}
                disabled={!customGoal.trim() || isGeneratingAi}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isGeneratingAi ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Building AI Roadmap...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Generate AI Path</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
