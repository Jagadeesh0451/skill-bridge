import React, { useState } from 'react';
import { LearningResource, StudentProgress } from '../types';
import { SKILL_CATEGORIES } from '../data/categories';
import {
  CheckCircle2,
  Clock,
  BookOpen,
  Bookmark,
  Award,
  ArrowRight,
  RotateCcw,
  Layers,
  FileText,
  AlertTriangle,
  Play,
} from 'lucide-react';

interface LearningProgressProps {
  resources: LearningResource[];
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
  onToggleCompleted: (id: string) => void;
  onToggleSaved: (id: string) => void;
  onSelectResource: (resource: LearningResource) => void;
  onResetProgress: () => void;
}

export const LearningProgress: React.FC<LearningProgressProps> = ({
  resources,
  progress,
  stats,
  onToggleCompleted,
  onToggleSaved,
  onSelectResource,
  onResetProgress,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'completed' | 'inprogress' | 'saved'>('all');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Group resources based on student activity
  const completedResources = resources.filter((r) => progress.completedIds.includes(r.id));
  const inProgressResources = resources.filter((r) => progress.inProgressIds.includes(r.id));
  const savedResources = resources.filter((r) => progress.savedIds.includes(r.id));

  // Determine active list for current tab
  const displayedResources = (() => {
    switch (filterTab) {
      case 'completed':
        return completedResources;
      case 'inprogress':
        return inProgressResources;
      case 'saved':
        return savedResources;
      case 'all':
      default: {
        const trackedIds = new Set([
          ...progress.completedIds,
          ...progress.inProgressIds,
          ...progress.savedIds,
        ]);
        return resources.filter((r) => trackedIds.has(r.id));
      }
    }
  })();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Feature 4: Real-Time Learning Progress Tracker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Your Academic Learning Analytics
            </h1>
            <p className="mt-1 text-slate-600 text-sm">
              Instant LocalStorage synchronization • Track completed modules, remaining tasks, and personal notes.
            </p>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Reset Progress
          </button>
        </div>

        {/* Big Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between text-sm font-bold text-slate-900 mb-2">
            <span>Overall Curriculum Completion</span>
            <span className="text-indigo-600">{stats.completionPercentage}%</span>
          </div>
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionPercentage}%` }}
              role="progressbar"
              aria-valuenow={stats.completionPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      {/* 4 Dashboard Metric Cards (Feature 4 Requirement) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completed Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {stats.completedCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Verified finished modules</p>
        </div>

        {/* In-Progress Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">In Progress</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Clock className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {stats.inProgressCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Currently studying</p>
        </div>

        {/* Remaining Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Remaining</span>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {stats.remainingCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Available in catalog</p>
        </div>

        {/* Saved / Bookmarked */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Bookmarked</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Bookmark className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {stats.savedCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">Saved for revision</p>
        </div>
      </div>

      {/* Continue Learning From Where You Stopped (Feature 4 Requirement) */}
      {stats.lastAccessedResource && (
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 rounded border border-indigo-400/30">
                Continue Learning
              </span>
              <span className="text-xs text-slate-400">Jump straight back in</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              {stats.lastAccessedResource.title}
            </h3>
            <p className="text-xs text-slate-300">
              {stats.lastAccessedResource.category} • {stats.lastAccessedResource.duration} • {stats.lastAccessedResource.type}
            </p>
          </div>

          <button
            onClick={() => onSelectResource(stats.lastAccessedResource!)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-white" aria-hidden="true" />
            <span>Resume Module</span>
          </button>
        </div>
      )}

      {/* Category-by-Category Progress Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" aria-hidden="true" />
          <span>Category Completion Breakdown</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILL_CATEGORIES.map((cat) => {
            const catResources = resources.filter((r) => r.category === cat.name);
            const totalInCat = catResources.length;
            const completedInCat = catResources.filter((r) => progress.completedIds.includes(r.id)).length;
            const catPct = totalInCat > 0 ? Math.round((completedInCat / totalInCat) * 100) : 0;

            return (
              <div key={cat.id} className="p-3.5 rounded-xl bg-slate-50/60 border border-slate-200/70">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-800">{cat.name}</span>
                  <span className="text-slate-500">
                    <strong>{completedInCat}</strong> / {totalInCat} ({catPct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all"
                    style={{ width: `${catPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tracked Resources Filter Tabs & List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Filter Navigation */}
        <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex gap-1">
            {[
              { id: 'all', label: `Tracked Items (${displayedResources.length})` },
              { id: 'completed', label: `Completed (${stats.completedCount})` },
              { id: 'inprogress', label: `In Progress (${stats.inProgressCount})` },
              { id: 'saved', label: `Saved (${stats.savedCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  filterTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Table/List */}
        {displayedResources.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {displayedResources.map((resource) => {
              const isCompleted = progress.completedIds.includes(resource.id);
              const isSaved = progress.savedIds.includes(resource.id);
              const note = progress.notes[resource.id];

              return (
                <div
                  key={resource.id}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-md">
                        {resource.category}
                      </span>
                      <span className="px-2 py-0.5 text-[11px] font-bold bg-indigo-50 text-indigo-700 rounded-md">
                        {resource.difficulty}
                      </span>
                      <span className="text-xs text-slate-500">
                        {resource.duration} • {resource.type}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">
                      {resource.title}
                    </h4>

                    {note && (
                      <div className="flex items-center gap-1.5 text-xs text-indigo-800 bg-indigo-50/80 px-2.5 py-1 rounded-md mt-1">
                        <FileText className="w-3 h-3 text-indigo-600" aria-hidden="true" />
                        <span className="truncate">Note: {note}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => onToggleCompleted(resource.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        isCompleted
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isCompleted ? '✓ Done' : 'Mark Done'}
                    </button>

                    <button
                      onClick={() => onSelectResource(resource)}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
                    >
                      Study / View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-sm">
            No resources currently in this category. Browse resources and start your learning path!
          </div>
        )}
      </div>

      {/* Reset Confirmation Dialog Modal */}
      {showResetConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Reset All Learning Progress?</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                This will clear your completed resources, in-progress items, and local study notes.
                This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
