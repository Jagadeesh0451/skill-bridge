import React from 'react';
import { SKILL_CATEGORIES } from '../data/categories';
import { SkillCategoryName } from '../types';
import { SkillBridgeLogo } from './SkillBridgeLogo';
import {
  Compass,
  Search,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Eye,
  Layers,
  BookOpen,
  GraduationCap,
  Award,
  ChevronRight,
  Cpu,
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
  onSelectCategory: (categoryName: SkillCategoryName) => void;
  onOpenA11yModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectCategory,
  onOpenA11yModal,
}) => {
  const featuredCategories = SKILL_CATEGORIES.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-20 animate-in fade-in duration-200">
      {/* High-Impact Hero Section */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-12 rounded-3xl bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl p-6 sm:p-12 lg:p-16 border border-slate-800">
        {/* Ambient subtle light glow */}
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Official Logo Display Banner */}
          <div className="flex items-center justify-center mb-2">
            <div className="p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-lg inline-flex items-center gap-3">
              <SkillBridgeLogo className="h-10 sm:h-12 w-auto" variant="white" />
            </div>
          </div>

          {/* Academic Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-blue-300" aria-hidden="true" />
            <span>Official Computer Science Engineering Skill Development Platform</span>
          </div>

          {/* Core Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-tight">
            Bridge the Gap to <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent">
              High-Impact Technical Careers
            </span>
          </h1>

          {/* Problem Statement & Mission */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Technical learning shouldn't be fragmented or inaccessible. <strong>SkillBridge</strong> connects college
            engineering students with verified, structured learning pathways, intelligent placement recommendations,
            and universal WCAG-compliant accessibility.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onNavigate('categories')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5"
            >
              <span>Explore 10 Domains</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={() => onNavigate('discovery')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl border border-white/20 backdrop-blur-xs transition-all hover:-translate-y-0.5"
            >
              <Search className="w-4 h-4 text-blue-300" aria-hidden="true" />
              <span>Find Resources</span>
            </button>

            <button
              onClick={() => onNavigate('recommendations')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Personalized Recommendations</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-3xl mx-auto text-xs text-slate-400">
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">10</div>
              <div>Skill Domains</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">100%</div>
              <div>Free & Open Access</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">WCAG 2.1</div>
              <div>Accessibility Tagged</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">Zero</div>
              <div>Paid API Constraints</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Educational Blueprint */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
            Structured Pedagogical Flow
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How SkillBridge Powers Your Growth
          </p>
          <p className="text-sm text-slate-600 mt-2">
            A cohesive progression built specifically for CSE curriculum mastery and placements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Select Your Target Domains
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore 10 curated domains including Programming, Web Dev, AI/ML, Cloud, and Aptitude without disjointed searching.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Multi-Criteria Search & Matching
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Filter by format, difficulty, and accessibility tags (captions, transcripts), or generate personalized recommendation paths.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Track Progress & Retain Notes
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mark modules completed, retain personal study notes in local storage, and resume seamlessly right from where you stopped.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Skill Domains Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
              Industry-Aligned Curriculum
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Skill Domains
            </p>
            <p className="text-sm text-slate-600 mt-1">
              Top tracks demanded by software development, data science, and cloud roles.
            </p>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 self-start sm:self-auto"
          >
            <span>View All 10 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                  Category
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-4">
                  {cat.popularTopics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 text-slate-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {cat.recommendedRole.split(',')[0]}
                </span>
                <button
                  onClick={() => onSelectCategory(cat.name)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900"
                >
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Universal Accessibility Statement Banner */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl bg-blue-50/70 border border-blue-200/80 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-blue-800">
              <Eye className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Universal Accessibility Commitment
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Built for Inclusive, Barrier-Free Learning
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              SkillBridge natively incorporates WCAG 2.1 principles: adjustable text scaling (up to 125%),
              high-contrast visual modes, screen-reader semantic landmarks, and verified captions and transcript tags
              across every learning resource.
            </p>
          </div>

          <button
            onClick={onOpenA11yModal}
            className="px-5 py-3 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            Adjust Accessibility Settings
          </button>
        </div>
      </section>
    </div>
  );
};
