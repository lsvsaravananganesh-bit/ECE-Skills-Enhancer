import React, { useState, useEffect } from 'react';
import {
  User,
  Award,
  Target,
  Flame,
  Zap,
  BookOpen,
  CheckCircle2,
  Moon,
  Sun,
  Shield,
  Save,
  Sparkles,
  Trophy,
  Lock,
  Share2,
  ExternalLink,
  Copy,
  Check,
  Crown,
  Star,
  Brain,
  Code2,
  GraduationCap,
  Eye,
  X,
  Download,
  PlusCircle,
  Bell
} from 'lucide-react';
import { UserProfile, Course, Badge } from '../types';
import { coursesData } from '../data/mockData';
import { computeUserBadges } from '../data/badgesData';
import { ToastNotificationContainer, ToastItem } from '../components/ToastNotification';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  isDarkMode,
  onToggleTheme,
}) => {
  const [targetCompany, setTargetCompany] = useState(user.targetCompany);
  const [targetRole, setTargetRole] = useState(user.targetRole);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'xp' | 'course' | 'streak'>('all');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showPublicModal, setShowPublicModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const enrolledCourses = coursesData.filter((c) => user.enrolledCourseIds.includes(c.id));
  const userBadges = computeUserBadges(user, coursesData);

  const unlockedCount = userBadges.filter((b) => b.isUnlocked).length;
  const publicShareUrl = `https://skillsphere.ai/u/${user.name.toLowerCase().replace(/\s+/g, '-')}-${user.id}`;

  const triggerToast = (toast: Omit<ToastItem, 'id'>) => {
    const newToast: ToastItem = {
      ...toast,
      id: 'toast_' + Date.now() + Math.random().toString(36).substring(2, 6),
    };
    setToasts((prev) => [newToast, ...prev].slice(0, 4));
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handler to simulate progress and automatically fire toasts for newly unlocked badges
  const handleSimulateXp = (amount: number) => {
    const newXp = user.xpPoints + amount;
    const newLevel = Math.floor(newXp / 1000) + 1;
    const updatedUser = { ...user, xpPoints: newXp, level: newLevel };
    const newBadges = computeUserBadges(updatedUser, coursesData);

    // Identify newly unlocked badges
    const newlyUnlocked = newBadges.filter(
      (nb) => nb.isUnlocked && !userBadges.find((ob) => ob.id === nb.id && ob.isUnlocked)
    );

    if (newLevel > user.level) {
      triggerToast({
        type: 'xp',
        title: `Level ${newLevel} Achieved!`,
        subtitle: `Awesome work! You reached Level ${newLevel} on SkillSphere.`,
        iconName: 'Sparkles',
        rarity: 'Epic',
      });
    }

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach((b) => {
        triggerToast({
          type: 'badge',
          title: `Badge Unlocked: ${b.title}`,
          subtitle: b.description,
          iconName: b.iconName,
          rarity: b.rarity,
        });
      });
    } else {
      triggerToast({
        type: 'xp',
        title: `+${amount} XP Earned!`,
        subtitle: `Total XP is now ${newXp.toLocaleString()}. Keep pushing forward!`,
        iconName: 'Trophy',
        rarity: 'Common',
      });
    }

    onUpdateUser({ xpPoints: newXp, level: newLevel });
  };

  const handleSimulateStreak = () => {
    const newStreak = user.streakDays + 1;
    const updatedUser = { ...user, streakDays: newStreak };
    const newBadges = computeUserBadges(updatedUser, coursesData);

    const newlyUnlocked = newBadges.filter(
      (nb) => nb.isUnlocked && !userBadges.find((ob) => ob.id === nb.id && ob.isUnlocked)
    );

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach((b) => {
        triggerToast({
          type: 'streak',
          title: `Streak Badge Unlocked: ${b.title}`,
          subtitle: b.description,
          iconName: b.iconName,
          rarity: b.rarity,
        });
      });
    } else {
      triggerToast({
        type: 'streak',
        title: `🔥 ${newStreak}-Day Streak Extended!`,
        subtitle: 'Consistency is key to mastering technical placement interviews!',
        iconName: 'Flame',
        rarity: 'Rare',
      });
    }

    onUpdateUser({ streakDays: newStreak });
  };

  const handleToggleCourseCompletion = (courseId: string, courseTitle: string) => {
    const isCompleted = user.completedCourseIds.includes(courseId);
    const updatedCompleted = isCompleted
      ? user.completedCourseIds.filter((id) => id !== courseId)
      : [...user.completedCourseIds, courseId];

    const updatedUser = { ...user, completedCourseIds: updatedCompleted };
    const newBadges = computeUserBadges(updatedUser, coursesData);

    if (!isCompleted) {
      const newlyUnlocked = newBadges.filter(
        (nb) => nb.isUnlocked && !userBadges.find((ob) => ob.id === nb.id && ob.isUnlocked)
      );

      if (newlyUnlocked.length > 0) {
        newlyUnlocked.forEach((b) => {
          triggerToast({
            type: 'course',
            title: `Course Credential: ${b.title}`,
            subtitle: `You completed ${courseTitle} and unlocked a verified badge!`,
            iconName: b.iconName,
            rarity: b.rarity,
          });
        });
      } else {
        triggerToast({
          type: 'course',
          title: `Course Completed!`,
          subtitle: `Congratulations on finishing ${courseTitle}!`,
          iconName: 'GraduationCap',
          rarity: 'Rare',
        });
      }
    }

    onUpdateUser({ completedCourseIds: updatedCompleted });
  };

  const handleTestSampleToast = () => {
    triggerToast({
      type: 'badge',
      title: 'Diamond Grandmaster',
      subtitle: 'Earned 10,000 XP - Elite candidate ranking top 1% on SkillSphere!',
      iconName: 'Crown',
      rarity: 'Legendary',
    });
  };

  const handleSaveTargets = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ targetCompany, targetRole });
    setIsSaved(true);
    triggerToast({
      type: 'milestone',
      title: 'Placement Goals Updated',
      subtitle: `Target set to ${targetRole} at ${targetCompany}.`,
      iconName: 'Target',
      rarity: 'Common',
    });
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(publicShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Helper to render badge icons
  const renderBadgeIcon = (iconName: string, isUnlocked: boolean, rarity?: string) => {
    const iconClass = isUnlocked ? 'w-6 h-6' : 'w-6 h-6 opacity-40';
    switch (iconName) {
      case 'Flame':
        return <Flame className={`${iconClass} text-amber-500`} />;
      case 'Zap':
        return <Zap className={`${iconClass} text-amber-400`} />;
      case 'Sparkles':
        return <Sparkles className={`${iconClass} text-indigo-500`} />;
      case 'Trophy':
        return <Trophy className={`${iconClass} text-amber-500`} />;
      case 'Crown':
        return <Crown className={`${iconClass} text-yellow-400`} />;
      case 'Award':
        return <Award className={`${iconClass} text-emerald-500`} />;
      case 'Code2':
        return <Code2 className={`${iconClass} text-blue-500`} />;
      case 'Target':
        return <Target className={`${iconClass} text-rose-500`} />;
      case 'Shield':
        return <Shield className={`${iconClass} text-purple-500`} />;
      case 'Brain':
        return <Brain className={`${iconClass} text-fuchsia-500`} />;
      case 'Star':
        return <Star className={`${iconClass} text-amber-400`} />;
      default:
        return <GraduationCap className={`${iconClass} text-indigo-500`} />;
    }
  };

  // Helper for badge card styling based on rarity and unlock status
  const getBadgeCardStyle = (badge: Badge) => {
    if (!badge.isUnlocked) {
      return 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 opacity-70';
    }
    switch (badge.rarity) {
      case 'Legendary':
        return 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border-amber-300 dark:border-amber-700/60 shadow-amber-500/10 shadow-lg';
      case 'Epic':
        return 'bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/40 dark:to-fuchsia-950/30 border-purple-300 dark:border-purple-700/60 shadow-purple-500/10 shadow-md';
      case 'Rare':
        return 'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/30 border-indigo-300 dark:border-indigo-700/60 shadow-indigo-500/10 shadow-sm';
      default:
        return 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-sm';
    }
  };

  const getRarityTagStyle = (rarity?: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700';
      case 'Epic':
        return 'bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'Rare':
        return 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const filteredBadges = userBadges.filter((b) => {
    if (activeTab === 'unlocked') return b.isUnlocked;
    if (activeTab === 'xp') return b.category === 'xp';
    if (activeTab === 'course') return b.category === 'course';
    if (activeTab === 'streak') return b.category === 'streak' || b.category === 'code' || b.category === 'test';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      {/* Toast Popup Notification Container */}
      <ToastNotificationContainer toasts={toasts} onDismiss={handleDismissToast} />
      
      {/* 1. HEADER PROFILE CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-2xl object-cover border-4 border-indigo-500/20 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase border border-emerald-500/20">
                {user.college}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 pt-0.5">
              Targeting: {user.targetRole} @ {user.targetCompany}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center">
          <button
            onClick={() => setShowPublicModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Public Badge Showcase</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 text-xs font-bold shrink-0"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            <span className="hidden sm:inline">{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* 2. STATS & LEVEL SUMMARY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">XP Points</span>
            <span className="text-lg font-black text-slate-900 dark:text-slate-100">{user.xpPoints.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Rank Tier</span>
            <span className="text-lg font-black text-slate-900 dark:text-slate-100">Level {user.level}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500 shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Streak</span>
            <span className="text-lg font-black text-slate-900 dark:text-slate-100">{user.streakDays} Days</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Badges Earned</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{unlockedCount} / {userBadges.length}</span>
          </div>
        </div>
      </div>

      {/* QUICK PROGRESS & BADGE SIMULATOR BAR */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-indigo-900/90 via-slate-900 to-indigo-950 border border-indigo-500/30 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 shrink-0">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-white flex items-center gap-1.5 justify-center sm:justify-start">
              <span>Test Progress & Instant Badge Toasts</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-extrabold uppercase border border-emerald-400/30">
                Interactive
              </span>
            </h3>
            <p className="text-[11px] text-indigo-200">
              Simulate earning XP or completing courses to see real-time toast popups!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => handleSimulateXp(500)}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all shadow-sm flex items-center gap-1"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>+500 XP</span>
          </button>

          <button
            onClick={handleSimulateStreak}
            className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-xs font-extrabold transition-all shadow-sm flex items-center gap-1"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>+1 Day Streak</span>
          </button>

          <button
            onClick={handleTestSampleToast}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all shadow-sm flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test Toast Popup</span>
          </button>
        </div>
      </div>

      {/* 3. VISUAL BADGES SHOWCASE SECTION */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                Verified Skill Badges & Milestones
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Hit XP milestones or complete specific courses to unlock official skill credentials.
            </p>
          </div>

          {/* Filter Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              All ({userBadges.length})
            </button>
            <button
              onClick={() => setActiveTab('unlocked')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'unlocked'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Unlocked ({unlockedCount})
            </button>
            <button
              onClick={() => setActiveTab('xp')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'xp'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              XP Badges
            </button>
            <button
              onClick={() => setActiveTab('course')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'course'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Course Badges
            </button>
            <button
              onClick={() => setActiveTab('streak')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'streak'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              Streaks & Drills
            </button>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBadges.map((badge) => {
            const isUnlocked = badge.isUnlocked;
            const progressPct =
              badge.maxProgress && badge.currentProgress !== undefined
                ? Math.round((badge.currentProgress / badge.maxProgress) * 100)
                : isUnlocked ? 100 : 0;

            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between space-y-4 hover:scale-[1.01] ${getBadgeCardStyle(
                  badge
                )}`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                        isUnlocked
                          ? 'bg-white dark:bg-slate-900 ring-2 ring-indigo-500/20'
                          : 'bg-slate-200/80 dark:bg-slate-800'
                      }`}
                    >
                      {renderBadgeIcon(badge.iconName, isUnlocked, badge.rarity)}
                    </div>

                    {!isUnlocked && (
                      <div className="absolute -bottom-1 -right-1 bg-slate-700 text-slate-200 p-1 rounded-full shadow-sm">
                        <Lock className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  <span
                    className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getRarityTagStyle(
                      badge.rarity
                    )}`}
                  >
                    {badge.rarity || 'Common'}
                  </span>
                </div>

                {/* Badge Title & Description */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5">
                    <span>{badge.title}</span>
                    {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                {/* Progress / Status Footer */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span>✓ Unlocked Credential</span>
                      <span className="text-[10px] text-slate-400">{badge.unlockedAt}</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        <span>
                          {badge.category === 'xp'
                            ? `${badge.currentProgress?.toLocaleString()} / ${badge.maxProgress?.toLocaleString()} XP`
                            : badge.category === 'streak'
                            ? `${badge.currentProgress} / ${badge.maxProgress} Days`
                            : badge.category === 'course'
                            ? 'Course Incomplete'
                            : 'Requirements Pending'}
                        </span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. TARGET PLACEMENT PREFERENCES FORM */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          Placement Goals & Target Preferences
        </h3>

        <form onSubmit={handleSaveTargets} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Company</label>
            <input
              type="text"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-between pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Goal Preferences</span>
            </button>

            {isSaved && (
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                <Check className="w-4 h-4" /> Goal preferences updated!
              </span>
            )}
          </div>
        </form>
      </div>

      {/* 5. ENROLLED COURSES SECTION */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          Enrolled Courses ({enrolledCourses.length})
        </h3>

        <div className="space-y-3">
          {enrolledCourses.map((c) => {
            const isCompleted = user.completedCourseIds.includes(c.id);
            return (
              <div
                key={c.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img src={c.thumbnail} alt={c.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{c.title}</h4>
                    <p className="text-[11px] text-slate-500">{c.duration} • {c.level}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleCourseCompletion(c.id, c.title)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>{isCompleted ? 'Completed ✓ (Badge Unlocked)' : 'Mark Complete & Claim Badge'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. BADGE INSPECTION MODAL */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  selectedBadge.isUnlocked
                    ? 'bg-indigo-50 dark:bg-indigo-950 ring-2 ring-indigo-500/20'
                    : 'bg-slate-100 dark:bg-slate-800'
                }`}
              >
                {renderBadgeIcon(selectedBadge.iconName, selectedBadge.isUnlocked, selectedBadge.rarity)}
              </div>
              <div>
                <span
                  className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getRarityTagStyle(
                    selectedBadge.rarity
                  )}`}
                >
                  {selectedBadge.rarity || 'Common'} Credential
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                  {selectedBadge.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedBadge.description}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-2 border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Unlock Condition:</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {selectedBadge.category === 'xp'
                    ? `Reach ${selectedBadge.requiredXp?.toLocaleString()} XP`
                    : selectedBadge.category === 'course'
                    ? `Complete ${selectedBadge.requiredCourseTitle || 'Course'}`
                    : selectedBadge.category === 'streak'
                    ? `Maintain ${selectedBadge.maxProgress}-Day Streak`
                    : 'Complete Practice Drills'}
                </span>
              </div>

              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Status:</span>
                <span className={selectedBadge.isUnlocked ? 'text-emerald-500' : 'text-amber-500'}>
                  {selectedBadge.isUnlocked ? '✓ Unlocked & Verified' : 'Locked'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 7. PUBLIC SHOWCASE MODAL */}
      {showPublicModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Close Button */}
            <button
              onClick={() => setShowPublicModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Public Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified Public Candidate Showcase</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                Public Skill Profile & Badge Credentials
              </h2>
            </div>

            {/* Public Candidate Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white space-y-6 shadow-xl border border-indigo-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10 text-center sm:text-left">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-400/40 shadow-lg"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-xl font-extrabold">{user.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-400/30">
                      {user.college}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-200">
                    Candidate for: <strong>{user.targetRole}</strong> @ {user.targetCompany}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-semibold flex items-center justify-center sm:justify-start gap-1 pt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SkillSphere Verified Learner ID: {user.id}</span>
                  </p>
                </div>
              </div>

              {/* Public Stats Bar */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-indigo-800/60 relative z-10 text-center">
                <div>
                  <span className="text-[10px] uppercase text-indigo-300 font-bold block">Total XP</span>
                  <span className="text-base font-black text-amber-400">{user.xpPoints.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-indigo-300 font-bold block">Rank Level</span>
                  <span className="text-base font-black text-white">Level {user.level}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-indigo-300 font-bold block">Unlocked Badges</span>
                  <span className="text-base font-black text-emerald-400">{unlockedCount} Badges</span>
                </div>
              </div>

              {/* Verified Unlocked Badges Showcase */}
              <div className="space-y-3 relative z-10">
                <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wider">
                  Verified Skill Badges ({unlockedCount})
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {userBadges
                    .filter((b) => b.isUnlocked)
                    .map((b) => (
                      <div
                        key={b.id}
                        className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-800/80 flex items-center gap-2.5"
                      >
                        <div className="p-2 rounded-xl bg-indigo-900/80 text-amber-400 shrink-0">
                          {renderBadgeIcon(b.iconName, true)}
                        </div>
                        <div className="overflow-hidden">
                          <h5 className="text-xs font-bold truncate text-white">{b.title}</h5>
                          <span className="text-[9px] text-indigo-300 block">{b.rarity || 'Common'}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Share Link Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Public Profile & Badge Showcase Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={publicShareUrl}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:outline-none"
                />
                <button
                  onClick={handleCopyShareLink}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShowPublicModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
