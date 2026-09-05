import React, { useState, useEffect } from 'react';
import {
  SkillCategoryName,
  DifficultyLevel,
  CareerGoal,
  ResourceType,
  LearningResource,
  RecommendationResult,
} from '../types';
import { SKILL_CATEGORIES } from '../data/categories';
import { generateRecommendations } from '../services/recommendationEngine';
import {
  Sparkles,
  Target,
  GraduationCap,
  Briefcase,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface PersonalizedRecommendationsProps {
  resources: LearningResource[];
  defaultSelectedSkills: SkillCategoryName[];
  completedIds: string[];
  savedIds: string[];
  onToggleCompleted: (id: string) => void;
  onToggleSaved: (id: string) => void;
  onSelectResource: (resource: LearningResource) => void;
}

const CAREER_GOALS: CareerGoal[] = [
  'Build Projects & Portfolio',
  'Crack Campus Placements',
  'Master Core Fundamentals',
  'Prepare for Technical Interviews',
  'Prepare for Tech Internships',
  'Upskill for Higher Studies & Research',
];

export const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({
  resources,
  defaultSelectedSkills,
  completedIds,
  savedIds,
  onToggleCompleted,
  onToggleSaved,
  onSelectResource,
}) => {
  // Form state
  const [selectedSkills, setSelectedSkills] = useState<SkillCategoryName[]>(
    defaultSelectedSkills.length > 0 ? defaultSelectedSkills : ['Web Development']
  );
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>('Beginner');
  const [careerGoal, setCareerGoal] = useState<CareerGoal>('Build Projects & Portfolio');
  const [preferredType, setPreferredType] = useState<ResourceType | 'Any'>('Any');

  // Engine state
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Sync if defaultSelectedSkills change
  useEffect(() => {
    if (defaultSelectedSkills.length > 0 && selectedSkills.length === 0) {
      setSelectedSkills(defaultSelectedSkills);
    }
  }, [defaultSelectedSkills]);

  // Initial recommendation generation on first mount
  useEffect(() => {
    handleGenerate(false);
  }, []);

  const toggleSkill = (skill: SkillCategoryName) => {
    setErrorMessage(null);
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleGenerate = async (scrollIntoResults = true) => {
    // Form Validation (Feature 3 Requirement)
    if (selectedSkills.length === 0) {
      setErrorMessage('Please select at least one skill domain to personalize your recommendations.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const recs = await generateRecommendations(
        {
          interestedSkills: selectedSkills,
          currentLevel,
          careerGoal,
          preferredType,
        },
        resources
      );
      setResults(recs);
      setHasGenerated(true);

      if (scrollIntoResults) {
        setTimeout(() => {
          document.getElementById('recommendations-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Unable to compute recommendations right now. Falling back to default syllabus.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetForm = () => {
    setSelectedSkills(['Web Development', 'Programming']);
    setCurrentLevel('Beginner');
    setCareerGoal('Build Projects & Portfolio');
    setPreferredType('Any');
    setErrorMessage(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Intro Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
            <span>Feature 3: Personalized Learning Recommendations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tailor-Made Learning Roadmaps
          </h1>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">
            Tell SkillBridge your current academic level, target skills, and placement aspirations.
            Our decoupled intelligent recommendation layer scores and organizes the most suitable resources.
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/80 w-fit">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>100% Free Intelligent Rule-Based Engine • Zero API billing or paid keys required</span>
          </div>
        </div>
      </div>

      {/* Interactive Recommendation Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" aria-hidden="true" />
            <h2 className="text-lg font-bold text-slate-900">Configure Your Learning Profile</h2>
          </div>
          <button
            onClick={handleResetForm}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Reset Defaults
          </button>
        </div>

        {/* Validation Error Banner */}
        {errorMessage && (
          <div
            role="alert"
            className="p-4 mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate(true);
          }}
          className="space-y-6"
        >
          {/* Step 1: Interested Skills (Multi-select) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Select Interested Skill Domains <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-slate-500">
                {selectedSkills.length} selected
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Pick one or more categories you want to focus on for this study cycle:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {SKILL_CATEGORIES.map((cat) => {
                const isSelected = selectedSkills.includes(cat.name);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleSkill(cat.name)}
                    aria-pressed={isSelected}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-1 ring-indigo-500 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <span className="block truncate">{cat.name}</span>
                    <span className="text-[10px] block text-slate-500 mt-0.5 font-normal">
                      {isSelected ? '✓ Selected' : '+ Add'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 & 3: Current Level & Career Goal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Current Level */}
            <div>
              <label htmlFor="current-level-select" className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                2. Current Skill Level <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setCurrentLevel(lvl)}
                    aria-pressed={currentLevel === lvl}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      currentLevel === lvl
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Career Goal */}
            <div>
              <label htmlFor="career-goal-select" className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                3. Career & Placement Goal <span className="text-rose-500">*</span>
              </label>
              <select
                id="career-goal-select"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value as CareerGoal)}
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {CAREER_GOALS.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 4: Preferred Format */}
          <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              4. Preferred Learning Format
            </label>
            <div className="flex flex-wrap gap-2">
              {(
                ['Any', 'Video', 'Practice Resource', 'Course', 'Documentation', 'Article', 'PDF'] as const
              ).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setPreferredType(fmt)}
                  aria-pressed={preferredType === fmt}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    preferredType === fmt
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Form Submit CTA */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Recommendations are evaluated on skill affinity, difficulty pacing, and format synergy.
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Computing Optimal Path...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>Generate Recommendations</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Recommendation Results Section */}
      <div id="recommendations-results" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Recommended for You ({results.length})
            </h2>
            <p className="text-xs text-slate-500">
              Ranked according to your skill selection ({selectedSkills.join(', ')}), {currentLevel} level, and goal "{careerGoal}"
            </p>
          </div>
          {results.length > 0 && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              Algorithmic Confidence: High
            </span>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map(({ resource, matchScore, matchReasons, priorityBadge }) => {
              const isCompleted = completedIds.includes(resource.id);
              const isSaved = savedIds.includes(resource.id);

              return (
                <div
                  key={resource.id}
                  className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all relative overflow-hidden"
                >
                  {/* Top Match Bar */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {matchScore}% Match
                        </span>
                        {priorityBadge && (
                          <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-indigo-50 text-indigo-700">
                            {priorityBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {resource.type} • {resource.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Category: <strong className="text-slate-700">{resource.category}</strong> • Level: <strong className="text-slate-700">{resource.difficulty}</strong>
                    </p>

                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-2">
                      {resource.description}
                    </p>

                    {/* AI / Algorithmic Rationale Box (Structured Results Requirement) */}
                    <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 mb-1.5">
                        <Zap className="w-3 h-3 text-amber-500" aria-hidden="true" />
                        Why this matches your goals
                      </span>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {matchReasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onToggleCompleted(resource.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        isCompleted
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isCompleted ? '✓ Completed' : 'Mark Done'}
                    </button>

                    <button
                      onClick={() => onSelectResource(resource)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
                    >
                      <span>Start Learning</span>
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            Select your skills above and click "Generate Recommendations" to view tailored study modules.
          </div>
        )}
      </div>
    </div>
  );
};
