import React, { useState } from 'react';
import { Search, Filter, Star, BookOpen, Users, Play, Sparkles } from 'lucide-react';
import { Course } from '../types';
import { coursesData } from '../data/mockData';
import { CourseDetailView } from './CourseDetailView';

interface CoursesViewProps {
  selectedCourse: Course | null;
  onSelectCourse: (course: Course | null) => void;
  enrolledCourseIds: string[];
  onEnroll: (courseId: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  selectedCourse,
  onSelectCourse,
  enrolledCourseIds,
  onEnroll,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLevel, setActiveLevel] = useState<string>('All');

  const categories = ['All', 'VLSI & Digital Design', 'Embedded Systems', 'Analog & PCB', 'Signals & DSP', 'Core Placements'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered courses
  const filteredCourses = coursesData.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    const matchesLevel = activeLevel === 'All' || c.level === activeLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  if (selectedCourse) {
    return (
      <CourseDetailView
        course={selectedCourse}
        onBack={() => onSelectCourse(null)}
        onEnroll={onEnroll}
        isEnrolled={enrolledCourseIds.includes(selectedCourse.id)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">ECE Specializations</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Core Electronics Curriculum & Labs
          </h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
          Hands-on VLSI, bare-metal Embedded C, Op-Amp circuits, and DSP masterclasses designed by engineers from Texas Instruments, Qualcomm, and Intel.
        </p>
      </div>

      {/* Search & Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by topic, instructor, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-xs rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          No courses matching your search criteria. Try selecting another category!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);
            return (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {course.category}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-slate-950" /> {course.rating}
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span>{course.duration}</span>
                    <span>{course.studentsEnrolled.toLocaleString()} Students</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCourse(course);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all text-center flex items-center justify-center gap-2 ${
                      isEnrolled
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isEnrolled ? 'Continue Course' : 'View Course & Syllabus'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
