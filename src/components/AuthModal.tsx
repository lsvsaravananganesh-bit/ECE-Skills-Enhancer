import React, { useState } from 'react';
import { X, Mail, Lock, User, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'forgot';
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setSuccessMessage('Password reset link has been sent to your email address!');
      setTimeout(() => {
        setSuccessMessage('');
        setMode('login');
      }, 3000);
      return;
    }

    const mockUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: fullName || email.split('@')[0] || 'Learner Alex',
      email: email || 'student@skillsphere.edu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Computer Science Scholar',
      college: college || 'National Institute of Technology',
      targetRole: 'Software Engineer',
      targetCompany: 'TCS / Amazon',
      streakDays: 1,
      xpPoints: 100,
      level: 1,
      enrolledCourseIds: ['crs_dsa_101'],
      completedCourseIds: [],
      completedTestIds: [],
      savedProblemIds: [],
      achievements: [
        {
          id: 'ach_new',
          title: 'Welcome to SkillSphere',
          description: 'Joined SkillSphere campus preparation portal.',
          iconName: 'Sparkles',
          unlockedAt: new Date().toISOString().split('T')[0],
          category: 'streak'
        }
      ]
    };

    onLoginSuccess(mockUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Background Decorative Blur */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-500 text-white mb-3 shadow-lg shadow-indigo-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {mode === 'login' && 'Welcome Back to SkillSphere'}
            {mode === 'register' && 'Create Student Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {mode === 'login' && 'Log in to continue your placement journey'}
            {mode === 'register' && 'Access courses, coding sandbox, and AI Mentor'}
            {mode === 'forgot' && 'Enter registered email to receive reset instructions'}
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Chen"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">College / University</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. National Institute of Tech"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="alex.chen@student.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>
              {mode === 'login' && 'Log In to Account'}
              {mode === 'register' && 'Create Free Account'}
              {mode === 'forgot' && 'Send Reset Email'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Mode Switcher */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          {mode === 'login' && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Register Now
              </button>
            </p>
          )}

          {mode === 'register' && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Log In
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Remembered your password?{' '}
              <button
                onClick={() => setMode('login')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Back to Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
