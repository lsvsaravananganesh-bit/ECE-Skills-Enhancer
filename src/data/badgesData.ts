import { Badge, UserProfile, Course } from '../types';

export const baseBadgesList: Omit<Badge, 'isUnlocked' | 'currentProgress' | 'unlockedAt'>[] = [
  // XP Milestones
  {
    id: 'badge_xp_500',
    title: 'Bronze Starter',
    description: 'Reach 500 XP on SkillSphere platform',
    iconName: 'Award',
    category: 'xp',
    requiredXp: 500,
    maxProgress: 500,
    rarity: 'Common'
  },
  {
    id: 'badge_xp_1500',
    title: 'Silver Apprentice',
    description: 'Reach 1,500 XP through problem solving and lessons',
    iconName: 'Zap',
    category: 'xp',
    requiredXp: 1500,
    maxProgress: 1500,
    rarity: 'Common'
  },
  {
    id: 'badge_xp_3000',
    title: 'Gold Scholar',
    description: 'Surpass 3,000 XP milestone in competitive placement learning',
    iconName: 'Sparkles',
    category: 'xp',
    requiredXp: 3000,
    maxProgress: 3000,
    rarity: 'Rare'
  },
  {
    id: 'badge_xp_5000',
    title: 'Platinum Maestro',
    description: 'Earn 5,000 XP demonstrating consistent expertise',
    iconName: 'Trophy',
    category: 'xp',
    requiredXp: 5000,
    maxProgress: 5000,
    rarity: 'Epic'
  },
  {
    id: 'badge_xp_10000',
    title: 'Diamond Grandmaster',
    description: 'Reach 10,000 XP - Elite candidate ranking top 1% on SkillSphere',
    iconName: 'Crown',
    category: 'xp',
    requiredXp: 10000,
    maxProgress: 10000,
    rarity: 'Legendary'
  },

  // Course Completion Badges
  {
    id: 'badge_crs_dsa',
    title: 'DSA Mastermind',
    description: 'Complete the full Data Structures & Algorithms Masterclass course',
    iconName: 'Code2',
    category: 'course',
    requiredCourseId: 'crs_dsa_101',
    requiredCourseTitle: 'Data Structures & Algorithms Masterclass',
    maxProgress: 1,
    rarity: 'Rare'
  },
  {
    id: 'badge_crs_aptitude',
    title: 'Aptitude Ace',
    description: 'Complete the Quantitative Aptitude & Logical Reasoning master course',
    iconName: 'Target',
    category: 'course',
    requiredCourseId: 'crs_aptitude_201',
    requiredCourseTitle: 'Quantitative Aptitude & Logical Reasoning',
    maxProgress: 1,
    rarity: 'Common'
  },
  {
    id: 'badge_crs_core',
    title: 'Systems Architect',
    description: 'Complete Core CS Foundations (OS, DBMS, Computer Networks)',
    iconName: 'Shield',
    category: 'course',
    requiredCourseId: 'crs_core_301',
    requiredCourseTitle: 'Core CS Foundations (OS, DBMS, Networks)',
    maxProgress: 1,
    rarity: 'Epic'
  },
  {
    id: 'badge_crs_ai',
    title: 'Generative AI Specialist',
    description: 'Complete Applied Generative AI & Gemini LLM Engineering',
    iconName: 'Brain',
    category: 'course',
    requiredCourseId: 'crs_ai_401',
    requiredCourseTitle: 'Generative AI & LLM Engineering',
    maxProgress: 1,
    rarity: 'Legendary'
  },

  // Streak & Consistency
  {
    id: 'badge_streak_7',
    title: '7-Day Streak Warrior',
    description: 'Maintain a 7-day continuous study streak',
    iconName: 'Flame',
    category: 'streak',
    maxProgress: 7,
    rarity: 'Common'
  },
  {
    id: 'badge_streak_14',
    title: '14-Day Streak Sentinel',
    description: 'Maintain a 14-day continuous study streak',
    iconName: 'Flame',
    category: 'streak',
    maxProgress: 14,
    rarity: 'Rare'
  },
  {
    id: 'badge_streak_30',
    title: '30-Day Unstoppable Titan',
    description: 'Achieve an uninterrupted 30-day placement study streak',
    iconName: 'Star',
    category: 'streak',
    maxProgress: 30,
    rarity: 'Legendary'
  },

  // Coding & Assessment
  {
    id: 'badge_code_10',
    title: 'Problem Solver',
    description: 'Solve or save 5+ algorithm problems in IDE workspace',
    iconName: 'Code2',
    category: 'code',
    maxProgress: 5,
    rarity: 'Common'
  },
  {
    id: 'badge_test_mock',
    title: 'Mock Drive Conqueror',
    description: 'Complete at least 1 full-length placement mock drive test',
    iconName: 'GraduationCap',
    category: 'test',
    maxProgress: 1,
    rarity: 'Rare'
  }
];

export function computeUserBadges(user: UserProfile, courses: Course[]): Badge[] {
  return baseBadgesList.map((base) => {
    let isUnlocked = false;
    let currentProgress = 0;
    let unlockedAt: string | undefined = undefined;

    if (base.category === 'xp' && base.requiredXp) {
      currentProgress = Math.min(user.xpPoints, base.requiredXp);
      isUnlocked = user.xpPoints >= base.requiredXp;
      if (isUnlocked) unlockedAt = 'Unlocked by XP';
    } else if (base.category === 'course' && base.requiredCourseId) {
      const isCompleted = user.completedCourseIds.includes(base.requiredCourseId);
      currentProgress = isCompleted ? 1 : 0;
      isUnlocked = isCompleted;
      if (isUnlocked) unlockedAt = 'Course Completed';
    } else if (base.category === 'streak') {
      const target = base.maxProgress || 7;
      currentProgress = Math.min(user.streakDays, target);
      isUnlocked = user.streakDays >= target;
      if (isUnlocked) unlockedAt = `${target}-Day Streak`;
    } else if (base.category === 'code') {
      const count = user.savedProblemIds.length;
      const target = base.maxProgress || 5;
      currentProgress = Math.min(count, target);
      isUnlocked = count >= target;
      if (isUnlocked) unlockedAt = 'Solved Problems';
    } else if (base.category === 'test') {
      const count = user.completedTestIds.length;
      currentProgress = count > 0 ? 1 : 0;
      isUnlocked = count > 0;
      if (isUnlocked) unlockedAt = 'Test Passed';
    }

    return {
      ...base,
      isUnlocked,
      currentProgress,
      unlockedAt: isUnlocked ? unlockedAt : undefined
    };
  });
}
