import React, { useEffect } from 'react';
import {
  Award,
  Sparkles,
  Flame,
  Zap,
  CheckCircle2,
  Trophy,
  Crown,
  Star,
  Target,
  Brain,
  Shield,
  Code2,
  GraduationCap,
  X
} from 'lucide-react';

export interface ToastItem {
  id: string;
  type: 'badge' | 'xp' | 'course' | 'streak' | 'milestone';
  title: string;
  subtitle: string;
  iconName?: string;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  xpAmount?: number;
}

interface ToastNotificationProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastNotificationContainer: React.FC<ToastNotificationProps> = ({
  toasts,
  onDismiss,
}) => {
  if (toasts.length === 0) return null;

  const renderToastIcon = (toast: ToastItem) => {
    const iconName = toast.iconName;
    const iconClass = 'w-6 h-6 shrink-0';

    switch (iconName) {
      case 'Flame':
        return <Flame className={`${iconClass} text-amber-500 animate-pulse`} />;
      case 'Zap':
        return <Zap className={`${iconClass} text-amber-400`} />;
      case 'Sparkles':
        return <Sparkles className={`${iconClass} text-indigo-400`} />;
      case 'Trophy':
        return <Trophy className={`${iconClass} text-amber-400`} />;
      case 'Crown':
        return <Crown className={`${iconClass} text-yellow-300`} />;
      case 'Award':
        return <Award className={`${iconClass} text-emerald-400`} />;
      case 'Code2':
        return <Code2 className={`${iconClass} text-blue-400`} />;
      case 'Target':
        return <Target className={`${iconClass} text-rose-400`} />;
      case 'Shield':
        return <Shield className={`${iconClass} text-purple-400`} />;
      case 'Brain':
        return <Brain className={`${iconClass} text-fuchsia-400`} />;
      case 'Star':
        return <Star className={`${iconClass} text-amber-300`} />;
      default:
        return <Award className={`${iconClass} text-indigo-400`} />;
    }
  };

  const getBorderColor = (rarity?: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'border-amber-400/80 ring-2 ring-amber-500/30 bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900';
      case 'Epic':
        return 'border-purple-400/80 ring-2 ring-purple-500/30 bg-gradient-to-r from-slate-900 via-purple-950/80 to-slate-900';
      case 'Rare':
        return 'border-indigo-400/80 ring-2 ring-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900';
      default:
        return 'border-emerald-500/80 ring-2 ring-emerald-500/20 bg-slate-900';
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastItemCard key={toast.id} toast={toast} onDismiss={onDismiss} renderToastIcon={renderToastIcon} getBorderColor={getBorderColor} />
      ))}
    </div>
  );
};

const ToastItemCard: React.FC<{
  toast: ToastItem;
  onDismiss: (id: string) => void;
  renderToastIcon: (toast: ToastItem) => React.ReactNode;
  getBorderColor: (rarity?: string) => string;
}> = ({ toast, onDismiss, renderToastIcon, getBorderColor }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div
      className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border text-white transition-all duration-300 transform translate-y-0 opacity-100 flex items-start justify-between gap-3 relative overflow-hidden backdrop-blur-md ${getBorderColor(
        toast.rarity
      )}`}
    >
      {/* Decorative spark background */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none"></div>

      <div className="flex items-start gap-3 relative z-10">
        <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-inner">
          {renderToastIcon(toast)}
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 px-1.5 py-0.2 rounded bg-amber-400/10 border border-amber-400/20">
              {toast.rarity ? `${toast.rarity} Badge` : 'Milestone Unlocked'}
            </span>
            <span className="text-[10px] text-slate-400">Just Now</span>
          </div>

          <h4 className="text-sm font-extrabold text-white flex items-center gap-1">
            <span>{toast.title}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </h4>

          <p className="text-xs text-slate-200 leading-snug">
            {toast.subtitle}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0 relative z-10"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
