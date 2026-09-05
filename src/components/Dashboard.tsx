import React from 'react';
import {
  LearningResource,
  SkillCategoryName,
  StudentProgress,
} from '../types';
import { SKILL_CATEGORIES } from '../data/categories';
import { SkillBridgeLogo } from './SkillBridgeLogo';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  BookOpen,
  Bookmark,
  Play,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

interface DashboardProps {
  progress: StudentProgress;
  stats: {
    totalResourcesCount: number;
    completedCount: number;
    inProgressCount: number;
    savedCount: number;
    remainingCount: number;
    completionPercentage: number;
    lastAccessedResource?: LearningResource;
  };
  resources: LearningResource[];
  onNavigate: (tab: string) => void;
  onSelectCategory: (categoryName: SkillCategoryName) => void;
  onSelectResource: (resource: LearningResource) => void;
  onToggleCompleted: (id: string) => void;
  onToggleSkillInterest: (skill: SkillCategoryName) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  stats,
  resources,
  onNavigate,
  onSelectCategory,
  onSelectResource,
  onToggleCompleted,
  onToggleSkillInterest,
}) => {
  // Quick recommendations: resources from student's selected skills that are not completed yet
  const quickRecommendations = resources
    .filter(
      (r) =>
        progress.selectedSkills.includes(r.category) &&
        !progress.completedIds.includes(r.id)
    )
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Greeting Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="hidden sm:block p-2.5 rounded-2xl bg-blue-50 border border-blue-100 shrink-0">
            <SkillBridgeLogo className="h-10 w-auto" variant="mark" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold mb-1">
              <GraduationCap className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
              <span>Student Learning & Placement Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back, Future Engineer 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              You've completed <strong>{stats.completedCount}</strong> of{' '}
              <strong>{stats.totalResourcesCount}</strong> verified modules ({stats.completionPercentage}% overall completion).
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('recommendations')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>New Recommendations</span>
        </button>
      </div>

      {/* Metric Cards (Completed, In-Progress, Remaining, Completion %) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Curriculum</span>
            <span className="text-xs font-bold text-blue-700">{stats.completionPercentage}%</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
            {stats.completionPercentage}%
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-700 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {stats.completedCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Verified modules</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Remaining</span>
            <BookOpen className="w-4 h-4 text-slate-400" aria-hidden="true" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {stats.remainingCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Ready to explore</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Bookmarked</span>
            <Bookmark className="w-4 h-4 text-amber-500" aria-hidden="true" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {stats.savedCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Saved for revision</p>
        </div>
      </div>

      {/* Continue Learning Section */}
      {stats.lastAccessedResource && (
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/30 text-blue-300 rounded border border-blue-400/30">
                Continue Learning
              </span>
              <span className="text-xs text-slate-300">Resume from where you stopped</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {stats.lastAccessedResource.title}
            </h3>
            <p className="text-xs text-slate-300">
              {stats.lastAccessedResource.category} • {stats.lastAccessedResource.type} • {stats.lastAccessedResource.duration}
            </p>
          </div>

          <button
            onClick={() => onSelectResource(stats.lastAccessedResource!)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-950 hover:bg-slate-100 text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-blue-950 text-blue-950" aria-hidden="true" />
            <span>Resume Module</span>
          </button>
        </div>
      )}

      {/* My Selected Skills */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <span>My Active Target Skills</span>
            </h2>
            <p className="text-xs text-slate-500">
              Select technical skills you are actively developing this semester
            </p>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900"
          >
            View All Categories →
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {SKILL_CATEGORIES.map((cat) => {
            const isSelected = progress.selectedSkills.includes(cat.name);
            return (
              <button
                key={cat.id}
                onClick={() => onToggleSkillInterest(cat.name)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {isSelected ? `✓ ${cat.name}` : `+ ${cat.name}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Access to Categories & Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended for Your Selected Skills */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-700" aria-hidden="true" />
                <span>Recommended for You</span>
              </h2>
              <button
                onClick={() => onNavigate('recommendations')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900"
              >
                View More
              </button>
            </div>

            <div className="space-y-3">
              {quickRecommendations.length > 0 ? (
                quickRecommendations.map((resource) => (
                  <div
                    key={resource.id}
                    onClick={() => onSelectResource(resource)}
                    className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800">
                          {resource.category}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {resource.difficulty} • {resource.duration}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {resource.title}
                      </h4>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
                  Select your target skills above to see tailored quick picks.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => onNavigate('recommendations')}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
            >
              <span>Explore Personalized Learning Paths</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Quick Access to Categories */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-700" aria-hidden="true" />
                <span>Quick Access to Categories</span>
              </h2>
              <button
                onClick={() => onNavigate('categories')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900"
              >
                All (10)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {SKILL_CATEGORIES.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.name)}
                  className="p-3 text-left rounded-xl border border-slate-200/80 hover:bg-blue-50/40 hover:border-blue-200 transition-all flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-800 truncate">
                    {cat.name}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
            <span>Find accessible resources in 1 click</span>
            <button
              onClick={() => onNavigate('discovery')}
              className="font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
