import React from 'react';
import {
  GraduationCap,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Heart,
  ShieldCheck,
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAbout,
  onOpenContact,
  onOpenPrivacy,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                SkillSphere
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier semiconductor, embedded systems, and core engineering placement operating system built for Electronics & Communication Engineering (ECE) students.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform Hubs</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => onNavigate('pathways')} className="hover:text-indigo-400 transition-colors flex items-center gap-1">
                  <span>Learning Paths</span>
                  <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[9px] rounded font-bold uppercase">New</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-indigo-400 transition-colors">
                  All Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('placement')} className="hover:text-indigo-400 transition-colors">
                  Aptitude & Technical Prep
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('coding')} className="hover:text-indigo-400 transition-colors">
                  Coding Playground
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-mentor')} className="hover:text-indigo-400 transition-colors">
                  SphereAI Mentor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tests')} className="hover:text-indigo-400 transition-colors">
                  Placement Mock Tests
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resume')} className="hover:text-indigo-400 transition-colors">
                  ATS Resume Builder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('store')} className="hover:text-indigo-400 transition-colors flex items-center gap-1 text-emerald-400 font-semibold">
                  <span>Lumixora Campus Store</span>
                  <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 text-[9px] rounded font-bold uppercase">Gear</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Company Drives */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Core Drives</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <button onClick={() => onNavigate('placement')} className="hover:text-indigo-400 transition-colors">
                  Texas Instruments (Analog/MCU)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('placement')} className="hover:text-indigo-400 transition-colors">
                  Qualcomm (Wireless & RTL)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('placement')} className="hover:text-indigo-400 transition-colors">
                  Intel & AMD (Silicon Design)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('placement')} className="hover:text-indigo-400 transition-colors">
                  Nvidia (ASIC Architecture)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('placement')} className="hover:text-indigo-400 transition-colors">
                  Bosch & NXP (Embedded ECUs)
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Support & Legal</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <button onClick={onOpenAbout} className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  About SkillSphere
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SkillSphere. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for ambitious learners worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
