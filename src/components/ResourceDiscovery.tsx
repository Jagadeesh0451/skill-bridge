import React, { useState, useMemo } from 'react';
import { LearningResource, SkillCategoryName, DifficultyLevel, ResourceType, AccessibilityFeature } from '../types';
import { SKILL_CATEGORIES } from '../data/categories';
import { ResourceCard } from './ResourceCard';
import {
  Search,
  SlidersHorizontal,
  X,
  Filter,
  CheckCircle2,
  RefreshCw,
  Eye,
  BookOpen,
} from 'lucide-react';

interface ResourceDiscoveryProps {
  resources: LearningResource[];
  selectedCategoryFilter: SkillCategoryName | 'All';
  onSelectCategoryFilter: (cat: SkillCategoryName | 'All') => void;
  completedIds: string[];
  inProgressIds: string[];
  savedIds: string[];
  onToggleCompleted: (id: string) => void;
  onToggleSaved: (id: string) => void;
  onSelectResource: (resource: LearningResource) => void;
}

export const ResourceDiscovery: React.FC<ResourceDiscoveryProps> = ({
  resources,
  selectedCategoryFilter,
  onSelectCategoryFilter,
  completedIds,
  inProgressIds,
  savedIds,
  onToggleCompleted,
  onToggleSaved,
  onSelectResource,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<ResourceType | 'All'>('All');
  const [selectedA11yFilters, setSelectedA11yFilters] = useState<AccessibilityFeature[]>([]);
  const [showOnlySaved, setShowOnlySaved] = useState(false);

  // Toggle accessibility tag filter
  const toggleA11yFilter = (tag: AccessibilityFeature) => {
    setSelectedA11yFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const resetAllFilters = () => {
    setSearchTerm('');
    onSelectCategoryFilter('All');
    setDifficultyFilter('All');
    setTypeFilter('All');
    setSelectedA11yFilters([]);
    setShowOnlySaved(false);
  };

  // Filtered resources pipeline
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      // 1. Search filter (title, description, provider, keyTopics)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = res.title.toLowerCase().includes(query);
        const matchesDesc = res.description.toLowerCase().includes(query);
        const matchesProvider = res.provider.toLowerCase().includes(query);
        const matchesTopics = res.keyTopics.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesProvider && !matchesTopics) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategoryFilter !== 'All' && res.category !== selectedCategoryFilter) {
        return false;
      }

      // 3. Difficulty filter
      if (difficultyFilter !== 'All' && res.difficulty !== difficultyFilter) {
        return false;
      }

      // 4. Resource type filter
      if (typeFilter !== 'All' && res.type !== typeFilter) {
        return false;
      }

      // 5. Accessibility filters (must match ALL checked accessibility tags)
      if (selectedA11yFilters.length > 0) {
        const hasAllA11y = selectedA11yFilters.every((tag) => res.accessibility.includes(tag));
        if (!hasAllA11y) return false;
      }

      // 6. Saved filter
      if (showOnlySaved && !savedIds.includes(res.id)) {
        return false;
      }

      return true;
    });
  }, [
    resources,
    searchTerm,
    selectedCategoryFilter,
    difficultyFilter,
    typeFilter,
    selectedA11yFilters,
    showOnlySaved,
    savedIds,
  ]);

  const a11yFilterOptions: AccessibilityFeature[] = [
    'Captions available',
    'Transcript available',
    'Screen-reader friendly',
    'Text-based resource',
    'Accessible PDF',
  ];

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategoryFilter !== 'All' ||
    difficultyFilter !== 'All' ||
    typeFilter !== 'All' ||
    selectedA11yFilters.length > 0 ||
    showOnlySaved;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <span>Feature 2: Multi-Criteria Resource Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Curated Learning Materials
          </h1>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">
            Search across {resources.length} verified technical courses, documentation guides, practice sets,
            and videos filtered by difficulty, format, and assistive accessibility tags.
          </p>
        </div>

        {/* Main Search Input */}
        <div className="mt-6 relative">
          <label htmlFor="resource-search-input" className="sr-only">
            Search resources by title, topic, or keyword
          </label>
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" aria-hidden="true" />
            <input
              id="resource-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by topic, skill, or keyword (e.g. 'Pandas', 'React', 'OWASP', 'STAR method')..."
              className="w-full pl-12 pr-10 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 text-sm rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-md"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Category Filters */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Filter by Skill Domain
            </span>
            {selectedCategoryFilter !== 'All' && (
              <button
                onClick={() => onSelectCategoryFilter('All')}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Reset Category
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by Skill Category">
            <button
              onClick={() => onSelectCategoryFilter('All')}
              aria-pressed={selectedCategoryFilter === 'All'}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategoryFilter === 'All'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Categories ({resources.length})
            </button>
            {SKILL_CATEGORIES.map((cat) => {
              const count = resources.filter((r) => r.category === cat.name).length;
              const isSelected = selectedCategoryFilter === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategoryFilter(cat.name)}
                  aria-pressed={isSelected}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Difficulty & Resource Type Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          {/* Difficulty */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Difficulty Level
            </span>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by difficulty">
              {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficultyFilter(level)}
                  aria-pressed={difficultyFilter === level}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    difficultyFilter === level
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Resource Type */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Resource Format
            </span>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by resource type">
              {(
                ['All', 'Course', 'Video', 'Article', 'Documentation', 'Practice Resource', 'PDF'] as const
              ).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  aria-pressed={typeFilter === type}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    typeFilter === type
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Accessibility Format Filters */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
              Filter by Accessibility Format
            </span>
            {selectedA11yFilters.length > 0 && (
              <button
                onClick={() => setSelectedA11yFilters([])}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Clear Accessibility Filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {a11yFilterOptions.map((tag) => {
              const isChecked = selectedA11yFilters.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleA11yFilter(tag)}
                  role="checkbox"
                  aria-checked={isChecked}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border transition-all ${
                    isChecked
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-800 font-bold'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-sm flex items-center justify-center border text-[9px] ${
                      isChecked ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-400'
                    }`}
                  >
                    {isChecked ? '✓' : ''}
                  </span>
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Summary & Reset Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div
            className="text-xs font-medium text-slate-600"
            role="status"
            aria-live="polite"
          >
            Showing <strong className="text-slate-900">{filteredResources.length}</strong> of{' '}
            <strong>{resources.length}</strong> resources
            {selectedCategoryFilter !== 'All' && <span> in <strong>{selectedCategoryFilter}</strong></span>}
            {difficultyFilter !== 'All' && <span> • <strong>{difficultyFilter}</strong> level</span>}
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-100 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Resource Grid / Empty State */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isCompleted={completedIds.includes(resource.id)}
              isInProgress={inProgressIds.includes(resource.id)}
              isSaved={savedIds.includes(resource.id)}
              onToggleCompleted={onToggleCompleted}
              onToggleSaved={onToggleSaved}
              onSelectResource={onSelectResource}
            />
          ))}
        </div>
      ) : (
        /* Friendly Empty State with Reset CTA (Required by prompt) */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            No matching resources found
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Sorry, we couldn't find learning resources matching your current combination of search and filter criteria.
            Try adjusting your search terms or clearing specific filters.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={resetAllFilters}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
