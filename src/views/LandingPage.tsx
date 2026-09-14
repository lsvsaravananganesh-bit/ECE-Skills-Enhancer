import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Code2,
  Bot,
  FileText,
  Award,
  Building2,
  CheckCircle2,
  ChevronDown,
  Brain,
  Zap,
  Radio,
  ShoppingBag,
  Truck,
  Activity,
  Layers
} from 'lucide-react';
import { ViewMode, Course } from '../types';
import { coursesData, faqsData, testimonialsData } from '../data/mockData';

interface LandingPageProps {
  onNavigate: (view: ViewMode) => void;
  onSelectCourse: (course: Course) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectCourse,
  onOpenAuth,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { id: 'VLSI & Digital Design', label: 'VLSI & Verilog RTL', icon: <Cpu className="w-5 h-5 text-indigo-500" />, count: 'Artix-7 • STA • FSM' },
    { id: 'Embedded Systems', label: 'Embedded C & ARM', icon: <Zap className="w-5 h-5 text-emerald-500" />, count: 'STM32 • FreeRTOS' },
    { id: 'Analog & PCB', label: 'Analog Circuits & PCB', icon: <Layers className="w-5 h-5 text-blue-500" />, count: 'Op-Amps • KiCad' },
    { id: 'Signals & DSP', label: 'DSP & 5G Wireless', icon: <Radio className="w-5 h-5 text-amber-500" />, count: 'FFT • Modulation' },
    { id: 'Core Placements', label: 'Semiconductor Prep', icon: <Building2 className="w-5 h-5 text-purple-500" />, count: 'TI • Qualcomm • Intel' },
  ];

  const filteredCourses = selectedCategory === 'All'
    ? coursesData
    : coursesData.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-gradient-to-tr from-indigo-500/20 via-blue-500/10 to-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-emerald-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-bold tracking-wide">
              <Cpu className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              <span>Built Exclusively for Electronics & Communication Engineers</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Master Core Electronics & <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Crack Semiconductor Placements
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Skip generic IT coding. SkillSphere ECE helps you master Verilog RTL, bare-metal Embedded C, Op-Amp circuits, and crack core drives at Texas Instruments, Qualcomm, Intel, AMD, and Nvidia.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onOpenAuth('register')}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 hover:opacity-95 shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Cpu className="w-4 h-4" />
                <span>Start ECE Prep Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('placement')}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-indigo-500" />
                <span>Semiconductor Past Drives</span>
              </button>

              <button
                onClick={() => onNavigate('store')}
                className="px-5 py-3.5 rounded-2xl font-bold text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-500" />
                <span>ECE Hardware Store</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> TI, Qualcomm & Intel Aligned
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verilog & Embedded C Sandbox
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> AI Circuit & RTL Solver
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUCCESS STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-500/20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">32,000+</p>
            <p className="text-xs font-semibold text-slate-300">ECE Students Active</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-400">₹24.8 LPA</p>
            <p className="text-xs font-semibold text-slate-300">Avg. Core Placement CTC</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400">100%</p>
            <p className="text-xs font-semibold text-slate-300">Core Hardware Focused</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-purple-400">45+</p>
            <p className="text-xs font-semibold text-slate-300">Semiconductor Recruiters</p>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">ECE Specializations</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Core Engineering Learning Tracks
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Structured step-by-step masterclasses designed by engineers from Texas Instruments, Qualcomm, and Cadence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                onNavigate('courses');
              }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-md transition-all cursor-pointer group space-y-3"
            >
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  {cat.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. POPULAR COURSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Featured Curriculum</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Flagship ECE Courses & Labs
            </h2>
          </div>

          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All Curriculum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.slice(0, 3).map((course) => (
            <div
              key={course.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-[11px] font-bold text-white">
                  {course.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {course.duration}
                  </span>
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PLATFORM PILLARS (FEATURES FOR ECE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Engineered for Hardware</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Everything an ECE Student Needs in One Place
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A cohesive suite designed from the ground up for semiconductor, embedded, and core hardware careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-indigo-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">SphereAI Circuit & RTL Mentor</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Ask circuit derivations (Op-Amp gain, KCL/KVL), debug synthesizable Verilog code, and get line-by-line bare-metal C register explanations powered by Gemini 3.6 Flash.
            </p>
            <button
              onClick={() => onNavigate('ai-mentor')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Launch AI Mentor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-emerald-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Hardware & Firmware Sandbox</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Practice Embedded C bitmasking, ring buffers for UART, and synthesizable Verilog HDL multiplexers and FSMs with real hardware testbenches.
            </p>
            <button
              onClick={() => onNavigate('coding')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Open Hardware Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-blue-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Semiconductor Past Drives</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Targeted prep for Texas Instruments, Qualcomm, Intel, Nvidia, AMD, and Bosch. Access circuit whiteboard problems, cut-offs, and technical interview logs.
            </p>
            <button
              onClick={() => onNavigate('placement')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Explore Chipmaker Prep</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-purple-500 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">ECE Hardware Resume Builder</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Format your PCB layouts, tape-outs, FPGA softcore projects, and microcontrollers to beat chipmaker ATS filters and impress core hardware recruiters.
            </p>
            <button
              onClick={() => onNavigate('resume')}
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>Build Hardware Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Proven Results</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Placed at Top Semiconductor Giants
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{t.name}</h4>
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">{t.role}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{t.content}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LUMIXORA ECE CAMPUS STORE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-xs font-bold text-indigo-300">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>OFFICIAL LAB GEAR PARTNER • LUMIXORA × SKILLSPHERE ECE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Equip Your Personal Electronics Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Subsidized student pricing on STM32 Nucleo ARM boards, 20MHz USB Digital Storage Oscilloscopes, 8-Channel Logic Analyzers, and 850+ component core electronics kits. Earn XP while solving circuit problems and redeem for cash discounts at checkout!
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate('store')}
                  className="px-6 py-3 rounded-xl font-extrabold text-xs text-slate-950 bg-white hover:bg-slate-100 shadow-lg flex items-center gap-2 transition-transform transform hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4 text-indigo-600" />
                  <span>Visit ECE Hardware Store</span>
                </button>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                  <Truck className="w-4 h-4" />
                  <span>Direct Hostel & Campus Delivery Across India</span>
                </div>
              </div>
            </div>

            {/* Quick Preview Cards */}
            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase">Top Seller</span>
                <p className="text-xs font-bold text-white">STM32 Nucleo-64 Board</p>
                <p className="text-xs font-extrabold text-emerald-400">₹1,899 <span className="text-[10px] text-slate-400 line-through">₹2,899</span></p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase">Lab Essential</span>
                <p className="text-xs font-bold text-white">20MHz USB Oscilloscope</p>
                <p className="text-xs font-extrabold text-emerald-400">₹3,499 <span className="text-[10px] text-slate-400 line-through">₹6,499</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Got Questions?</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqsData.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-indigo-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FOOTER CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 text-white text-center space-y-6 shadow-2xl shadow-indigo-500/20">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Land Your Dream Semiconductor Offer?
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-xl mx-auto">
            Join thousands of ECE students preparing with SkillSphere ECE's Verilog labs, circuit practice, and AI mentor.
          </p>
          <button
            onClick={() => onOpenAuth('register')}
            className="px-8 py-4 rounded-2xl font-extrabold text-xs sm:text-sm text-indigo-950 bg-white hover:bg-slate-100 shadow-lg transition-transform transform hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Get Started for Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
