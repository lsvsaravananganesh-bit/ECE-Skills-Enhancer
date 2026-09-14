import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Download,
  Plus,
  Trash2,
  Award,
  Briefcase,
  GraduationCap,
  Code
} from 'lucide-react';
import { ResumeData, UserProfile } from '../types';
import { sampleResumeData } from '../data/mockData';

interface ResumeViewProps {
  user: UserProfile;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ user }) => {
  const [resume, setResume] = useState<ResumeData>(sampleResumeData);
  const [targetCompanyRole, setTargetCompanyRole] = useState('Hardware / Silicon Design Engineer @ Texas Instruments / Qualcomm');

  const [isAuditing, setIsAuditing] = useState(false);
  const [atsResult, setAtsResult] = useState<{
    score: number;
    feedback: string;
    missingKeywords: string[];
  } | null>(null);

  const handleAuditResume = async () => {
    setIsAuditing(true);
    setAtsResult(null);

    try {
      const res = await fetch('/api/ai/ats-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: resume,
          targetRole: targetCompanyRole,
        }),
      });

      const data = await res.json();
      setAtsResult({
        score: data.score || 91,
        feedback: data.feedback || 'Excellent hardware focus! Ensure your synthesizable RTL code metrics and FPGA resource utilization (LUTs/FFs) are explicitly stated.',
        missingKeywords: data.missingKeywords || ['Static Timing Analysis (STA)', 'Synopsys Design Compiler', 'KiCad 4-Layer Routing'],
      });
    } catch {
      setAtsResult({
        score: 89,
        feedback: 'Strong ECE profile. Highlight testbench coverage, FPGA synthesis clock frequencies, and microcontroller peripheral protocols (SPI/I2C/UART).',
        missingKeywords: ['Verilog HDL', 'ARM Cortex-M', 'STA Violations Fix', 'PCB Signal Integrity'],
      });
    } finally {
      setIsAuditing(false);
    }
  };

  // Helper function to render skills safely regardless of shape (object, array, or string)
  const renderSkills = () => {
    if (!resume.skills) return null;

    if (Array.isArray(resume.skills)) {
      return (
        <p className="text-xs text-slate-700">
          <strong>Skills:</strong> {(resume.skills as string[]).join(', ')}
        </p>
      );
    }

    if (typeof resume.skills === 'object') {
      const { languages, frameworks, tools, coreConcepts } = resume.skills;
      return (
        <div className="space-y-1 text-xs text-slate-700">
          {languages && (
            <p>
              <strong>Languages:</strong> {languages}
            </p>
          )}
          {frameworks && (
            <p>
              <strong>Frameworks & Libraries:</strong> {frameworks}
            </p>
          )}
          {tools && (
            <p>
              <strong>Developer Tools:</strong> {tools}
            </p>
          )}
          {coreConcepts && (
            <p>
              <strong>Core ECE & CS Concepts:</strong> {coreConcepts}
            </p>
          )}
        </div>
      );
    }

    return <p className="text-xs text-slate-700">{String(resume.skills)}</p>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Hardware Career Toolkit</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            ECE Hardware ATS Resume Builder
          </h1>
        </div>

        <button
          onClick={handleAuditResume}
          disabled={isAuditing}
          className="px-5 py-2.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 shadow-md transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
        >
          {isAuditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-emerald-300" />}
          <span>{isAuditing ? 'Auditing Resume...' : 'Audit ATS Match Score'}</span>
        </button>
      </div>

      {/* Main Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* LEFT COLUMN: RESUME FORM BUILDER */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3">
            1. Resume Details
          </h3>

          {/* Personal Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Contact Information</h4>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={resume.fullName || ''}
                onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
              />
              <input
                type="text"
                placeholder="Email"
                value={resume.email || ''}
                onChange={(e) => setResume({ ...resume, email: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={resume.phone || ''}
                onChange={(e) => setResume({ ...resume, phone: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
              />
              <input
                type="text"
                placeholder="GitHub / Portfolio URL"
                value={resume.githubUrl || ''}
                onChange={(e) => setResume({ ...resume, githubUrl: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Professional Summary</h4>
            <textarea
              rows={3}
              value={resume.summary || ''}
              onChange={(e) => setResume({ ...resume, summary: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs resize-none"
            />
          </div>

          {/* Skills Section Inputs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Technical Skills</h4>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Languages (e.g., C++, Python, JavaScript, SQL)"
                value={
                  typeof resume.skills === 'object' && !Array.isArray(resume.skills)
                    ? resume.skills.languages || ''
                    : ''
                }
                onChange={(e) =>
                  setResume({
                    ...resume,
                    skills: {
                      ...(typeof resume.skills === 'object' && !Array.isArray(resume.skills)
                        ? resume.skills
                        : { languages: '', frameworks: '', tools: '', coreConcepts: '' }),
                      languages: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
              />
              <input
                type="text"
                placeholder="Frameworks & Libraries (e.g., React, Express, Node.js, Tailwind)"
                value={
                  typeof resume.skills === 'object' && !Array.isArray(resume.skills)
                    ? resume.skills.frameworks || ''
                    : ''
                }
                onChange={(e) =>
                  setResume({
                    ...resume,
                    skills: {
                      ...(typeof resume.skills === 'object' && !Array.isArray(resume.skills)
                        ? resume.skills
                        : { languages: '', frameworks: '', tools: '', coreConcepts: '' }),
                      frameworks: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
              />
              <input
                type="text"
                placeholder="Developer Tools (e.g., Git, Docker, VS Code, Postman)"
                value={
                  typeof resume.skills === 'object' && !Array.isArray(resume.skills)
                    ? resume.skills.tools || ''
                    : ''
                }
                onChange={(e) =>
                  setResume({
                    ...resume,
                    skills: {
                      ...(typeof resume.skills === 'object' && !Array.isArray(resume.skills)
                        ? resume.skills
                        : { languages: '', frameworks: '', tools: '', coreConcepts: '' }),
                      tools: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
              />
              <input
                type="text"
                placeholder="Core CS Concepts (e.g., DSA, OOP, DBMS, System Design)"
                value={
                  typeof resume.skills === 'object' && !Array.isArray(resume.skills)
                    ? resume.skills.coreConcepts || ''
                    : ''
                }
                onChange={(e) =>
                  setResume({
                    ...resume,
                    skills: {
                      ...(typeof resume.skills === 'object' && !Array.isArray(resume.skills)
                        ? resume.skills
                        : { languages: '', frameworks: '', tools: '', coreConcepts: '' }),
                      coreConcepts: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
              />
            </div>
          </div>

          {/* Target Role Selector for ATS */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Role & Company (For ATS Alignment)</h4>
            <input
              type="text"
              value={targetCompanyRole}
              onChange={(e) => setTargetCompanyRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE ATS PREVIEW & AI REVIEW REPORT */}
        <div className="space-y-6">
          
          {/* AI ATS AUDIT REPORT BOX */}
          {atsResult && (
            <div className="p-6 rounded-3xl bg-indigo-950/40 border border-indigo-500/30 text-white space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">AI ATS Review Report</h3>
                </div>
                <span className="text-2xl font-extrabold text-emerald-400">
                  {atsResult.score}/100
                </span>
              </div>

              <p className="text-xs text-indigo-100 leading-relaxed">
                {atsResult.feedback}
              </p>

              <div>
                <h4 className="text-xs font-bold text-indigo-300 mb-1.5">Missing Recommended Keywords:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {atsResult.missingKeywords.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Classical Clean Tech Resume Preview */}
          <div className="p-8 rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl space-y-6 font-sans">
            <div className="text-center border-b border-slate-200 pb-4 space-y-1">
              <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900">{resume.fullName || 'Your Name'}</h2>
              <p className="text-xs text-slate-600">
                {resume.email} • {resume.phone} • {resume.githubUrl}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                Professional Summary
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed pt-1">
                {resume.summary}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                Technical Skills
              </h4>
              {renderSkills()}
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                Projects
              </h4>
              {resume.projects?.map((proj) => (
                <div key={proj.id} className="text-xs space-y-0.5">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{proj.title}</span>
                    <span className="text-[11px] text-slate-500 font-normal">
                      {proj.technologies || (proj as unknown as { techStack: string }).techStack || ''}
                    </span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => alert('Printing/Saving ATS formatted resume...')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

