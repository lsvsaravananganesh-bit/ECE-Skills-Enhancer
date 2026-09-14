import React, { useState } from 'react';
import {
  ArrowLeft,
  Play,
  FileText,
  HelpCircle,
  CheckCircle2,
  Download,
  Award,
  Star,
  Clock,
  Users,
  BookOpen,
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { Course, CourseLesson, QuizQuestion } from '../types';

interface CourseDetailViewProps {
  course: Course;
  onBack: () => void;
  onEnroll: (courseId: string) => void;
  isEnrolled: boolean;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  onBack,
  onEnroll,
  isEnrolled,
}) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'notes' | 'quiz'>('lessons');
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson>(
    course.modules[0]?.lessons[0] || {
      id: 'demo_1',
      title: 'Course Introduction',
      duration: '15 min',
      summaryNote: 'Welcome to this masterclass!'
    }
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Active quiz questions
  const currentQuiz = course.modules[0]?.quiz || [];

  const handleOptionSelect = (qId: string, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    currentQuiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctOptionIndex) score++;
    });
    return score;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Back Navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Courses</span>
      </button>

      {/* Main Course Header & Video Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Interactive Video Player Simulation & Content Tabs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Simulated Player Box */}
          <div className="relative rounded-3xl bg-slate-950 overflow-hidden shadow-2xl aspect-video border border-slate-800 flex flex-col justify-between p-6 text-white group">
            
            {/* Background Image / Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url(${course.thumbnail})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-indigo-500/80 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase">
                {course.category}
              </span>
              <span className="text-xs font-semibold text-slate-300">
                Playing: {selectedLesson.title}
              </span>
            </div>

            {/* Center Play Button Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/50 transform hover:scale-110 transition-all"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <p className="text-xs font-medium text-slate-300">
                {isPlaying ? 'Video Playing (Simulation)' : 'Click to Play Interactive Lecture'}
              </p>
            </div>

            {/* Bottom Controls */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3">
              <span>Duration: {selectedLesson.duration}</span>
              <span className="text-emerald-400 font-bold">HD 1080p • Interactive Transcript</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'lessons'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Curriculum & Lessons</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'notes'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Notes & PDF Sheet</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'quiz'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Lesson Quiz ({currentQuiz.length})</span>
            </button>
          </div>

          {/* TAB 1: CURRICULUM LESSONS */}
          {activeTab === 'lessons' && (
            <div className="space-y-4">
              {course.modules.map((mod, modIdx) => (
                <div
                  key={mod.id}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 space-y-3"
                >
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {mod.title}
                  </h4>

                  <div className="space-y-2">
                    {mod.lessons.map((lesson) => {
                      const isSelected = selectedLesson.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={`w-full p-3 rounded-xl text-left text-xs font-semibold flex items-center justify-between gap-3 transition-all ${
                            isSelected
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300'
                              : 'bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Play className="w-3.5 h-3.5 fill-current shrink-0 text-indigo-500" />
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 shrink-0">{lesson.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: NOTES & PDF SHEET */}
          {activeTab === 'notes' && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {course.pdfNotesTitle || 'Lecture Summary Notes'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Verified instructor formula cheat sheet & quick revision notes.
                  </p>
                </div>
                <button
                  onClick={() => alert('Downloading Revision PDF Sheet...')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 text-xs text-slate-700 dark:text-slate-300 space-y-3 leading-relaxed">
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  Summary for: {selectedLesson.title}
                </p>
                <p>{selectedLesson.summaryNote || 'No summary note available for this lesson.'}</p>
              </div>
            </div>
          )}

          {/* TAB 3: LESSON QUIZ */}
          {activeTab === 'quiz' && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-6">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Interactive Concept Check Quiz
              </h3>

              {currentQuiz.length === 0 ? (
                <p className="text-xs text-slate-500">No quiz questions available for this module yet.</p>
              ) : (
                <div className="space-y-6">
                  {currentQuiz.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 space-y-3">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        Q{idx + 1}: {q.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = quizAnswers[q.id] === optIdx;
                          const isCorrect = optIdx === q.correctOptionIndex;

                          let style = 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                          if (quizSubmitted) {
                            if (isCorrect) style = 'border-emerald-500 bg-emerald-500/10 text-emerald-600 font-bold';
                            else if (isSelected) style = 'border-rose-500 bg-rose-500/10 text-rose-600';
                          } else if (isSelected) {
                            style = 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 font-bold';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleOptionSelect(q.id, optIdx)}
                              className={`p-3 rounded-xl border text-xs text-left transition-all ${style}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                          Explanation: {q.explanation}
                        </p>
                      )}
                    </div>
                  ))}

                  {!quizSubmitted ? (
                    <button
                      onClick={() => setQuizSubmitted(true)}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                      Submit Answers
                    </button>
                  ) : (
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-between">
                      <span>Quiz Result: {calculateScore()} / {currentQuiz.length} Correct!</span>
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizAnswers({});
                        }}
                        className="underline"
                      >
                        Retake Quiz
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Instructor & Enrollment Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                {course.level} Level
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {course.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium pt-1">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" /> {course.rating} ({course.reviewsCount})
                </span>
                <span>• {course.studentsEnrolled.toLocaleString()} Students</span>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="w-11 h-11 rounded-2xl object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{course.instructor}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{course.instructorTitle}</p>
              </div>
            </div>

            {/* What you'll learn list */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Learning Outcomes</h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {course.learningOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enroll Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                onClick={() => onEnroll(course.id)}
                className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs text-white transition-all shadow-md ${
                  isEnrolled
                    ? 'bg-emerald-600 hover:bg-emerald-500'
                    : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 hover:opacity-95'
                }`}
              >
                {isEnrolled ? '✓ Enrolled (In Progress)' : 'Enroll in Course (Free)'}
              </button>
              <p className="text-[10px] text-center text-slate-400">
                Includes full video access, PDF cheat sheets, and verified certificate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
