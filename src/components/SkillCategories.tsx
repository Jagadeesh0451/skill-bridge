import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/categories';
import { SAMPLE_RESOURCES } from '../data/resources';
import { SkillCategoryName } from '../types';
import {
  Code2,
  Globe,
  Cpu,
  Database,
  ShieldCheck,
  Cloud,
  MessageSquareText,
  BrainCircuit,
  Briefcase,
  Award,
  ArrowRight,
  BookOpen,
  Filter,
} from 'lucide-react';

interface SkillCategoriesProps {
  onSelectCategory: (categoryName: SkillCategoryName) => void;
  selectedSkills: SkillCategoryName[];
  onToggleSkillInterest: (categoryName: SkillCategoryName) => void;
}

export const SkillCategories: React.FC<SkillCategoriesProps> = ({
  onSelectCategory,
  selectedSkills,
  onToggleSkillInterest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6" aria-hidden="true" />;
      case 'Globe':
        return <Globe className="w-6 h-6" aria-hidden="true" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6" aria-hidden="true" />;
      case 'Database':
        return <Database className="w-6 h-6" aria-hidden="true" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" aria-hidden="true" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6" aria-hidden="true" />;
      case 'MessageSquareText':
        return <MessageSquareText className="w-6 h-6" aria-hidden="true" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-6 h-6" aria-hidden="true" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6" aria-hidden="true" />;
      case 'Award':
        return <Award className="w-6 h-6" aria-hidden="true" />;
      default:
        return <BookOpen className="w-6 h-6" aria-hidden="true" />;
    }
  };

  const filteredCategories = SKILL_CATEGORIES.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.popularTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Title & Intro */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-semibold mb-4">
            <span>Feature 1: Organized Skill Categories</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Explore 10 Core CSE Skill Domains
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Choose from industry-aligned technical, cognitive, and interpersonal learning tracks.
            Select any category to view curated accessible tutorials, documentation, and exercises.
          </p>

          {/* Quick Search inside categories */}
          <div className="mt-6 max-w-md">
            <label htmlFor="category-search-input" className="sr-only">
              Search skill categories
            </label>
            <input
              id="category-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search domains (e.g. Cloud, Python, STAR method, SQL)..."
              className="w-full px-4 py-3 text-sm text-slate-900 bg-white rounded-xl shadow-md placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Categories Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              All Skill Categories ({filteredCategories.length})
            </h2>
            <p className="text-xs text-slate-500">
              Click "Explore Resources" to discover curated learning materials for that category
            </p>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Clear Search
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const count = SAMPLE_RESOURCES.filter((r) => r.category === cat.name).length;
            const isInterested = selectedSkills.includes(cat.name);

            return (
              <div
                key={cat.id}
                className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200 shadow-xs">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700">
                        {count} resources
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Key Topic Chips */}
                  <div className="mt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Key Syllabus Topics
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.popularTopics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-50 text-slate-700 border border-slate-200"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Career Target */}
                  <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                    <span className="font-semibold text-slate-700">Target Roles: </span>
                    {cat.recommendedRole}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onToggleSkillInterest(cat.name)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      isInterested
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                    aria-pressed={isInterested}
                    aria-label={`${isInterested ? 'Remove from' : 'Add to'} your target skills`}
                  >
                    {isInterested ? '✓ In My Target Skills' : '+ Set as Target Skill'}
                  </button>

                  <button
                    onClick={() => onSelectCategory(cat.name)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
                    aria-label={`Explore resources for ${cat.name}`}
                  >
                    <span>Browse</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
