import React from 'react';
import { LearningResource } from '../types';
import {
  Clock,
  CheckCircle,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  BookOpen,
  Video,
  FileText,
  Code2,
  Layers,
  GraduationCap,
  Volume2,
  FileCode,
  FileCheck,
} from 'lucide-react';

interface ResourceCardProps {
  resource: LearningResource;
  isCompleted: boolean;
  isInProgress: boolean;
  isSaved: boolean;
  onToggleCompleted: (id: string) => void;
  onToggleSaved: (id: string) => void;
  onSelectResource: (resource: LearningResource) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isCompleted,
  isInProgress,
  isSaved,
  onToggleCompleted,
  onToggleSaved,
  onSelectResource,
}) => {
  // Difficulty color styling
  const difficultyBadgeClasses = {
    Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
    Advanced: 'bg-rose-50 text-rose-700 border-rose-200',
  }[resource.difficulty];

  // Resource type icon helper
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Video className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'Article':
        return <FileText className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'Course':
        return <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'Documentation':
        return <FileCode className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'Practice Resource':
        return <Code2 className="w-3.5 h-3.5" aria-hidden="true" />;
      case 'PDF':
        return <FileCheck className="w-3.5 h-3.5" aria-hidden="true" />;
      default:
        return <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />;
    }
  };

  return (
    <article
      id={`resource-card-${resource.id}`}
      className={`group relative flex flex-col justify-between bg-white rounded-2xl border transition-all duration-200 hover:shadow-lg ${
        isCompleted
          ? 'border-emerald-200 bg-emerald-50/20'
          : isInProgress
          ? 'border-indigo-200 ring-1 ring-indigo-100'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Top Header & Badges */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Category Tag */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-md bg-slate-100 text-slate-700">
              <Layers className="w-3 h-3 text-slate-500" aria-hidden="true" />
              {resource.category}
            </span>

            {/* Difficulty Badge */}
            <span
              className={`inline-flex items-center px-2 py-0.5 text-[11px] font-bold rounded-md border ${difficultyBadgeClasses}`}
            >
              {resource.difficulty}
            </span>

            {/* Resource Type */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
              {getTypeIcon(resource.type)}
              {resource.type}
            </span>
          </div>

          {/* Bookmark Action */}
          <button
            onClick={() => onToggleSaved(resource.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isSaved
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            aria-label={isSaved ? `Remove ${resource.title} from saved` : `Save ${resource.title} for later`}
            title={isSaved ? 'Saved for later' : 'Save for later'}
          >
            {isSaved ? (
              <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" aria-hidden="true" />
            ) : (
              <Bookmark className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {resource.title}
        </h3>

        {/* Provider */}
        <p className="text-xs font-medium text-slate-500 mt-1">
          Source: <span className="text-slate-700">{resource.provider}</span>
        </p>

        {/* Description */}
        <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
          {resource.description}
        </p>

        {/* Duration & Key Topics */}
        <div className="flex items-center gap-3 mt-3 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            {resource.duration}
          </span>
          {resource.keyTopics.length > 0 && (
            <span className="truncate">
              Topic: {resource.keyTopics[0]}
            </span>
          )}
        </div>

        {/* Accessibility Badges (Feature 5 Requirement) */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
            Accessibility features:
          </span>
          <div className="flex flex-wrap gap-1">
            {resource.accessibility.map((a11y) => (
              <span
                key={a11y}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200/80"
              >
                {a11y.toLowerCase().includes('caption') && <Volume2 className="w-3 h-3 text-indigo-500" aria-hidden="true" />}
                {a11y.toLowerCase().includes('transcript') && <FileText className="w-3 h-3 text-emerald-500" aria-hidden="true" />}
                {a11y.toLowerCase().includes('screen-reader') && <CheckCircle className="w-3 h-3 text-sky-500" aria-hidden="true" />}
                {a11y}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 pt-3 bg-slate-50/70 border-t border-slate-100 rounded-b-2xl flex items-center justify-between gap-2">
        {/* Toggle Complete status */}
        <button
          onClick={() => onToggleCompleted(resource.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
            isCompleted
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
          aria-pressed={isCompleted}
          aria-label={isCompleted ? `Mark ${resource.title} as incomplete` : `Mark ${resource.title} as completed`}
        >
          <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-white' : 'text-slate-400'}`} aria-hidden="true" />
          <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
        </button>

        {/* Start / View Details Button */}
        <button
          onClick={() => onSelectResource(resource)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors"
          aria-label={`Start or view details for ${resource.title}`}
        >
          <span>Start / View</span>
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};
