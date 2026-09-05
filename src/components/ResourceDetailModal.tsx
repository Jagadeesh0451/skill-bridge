import React, { useState, useEffect, useRef } from 'react';
import { LearningResource } from '../types';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  GraduationCap,
  FileText,
  FileCheck,
  Code2,
  Save,
  Check,
  ShieldCheck,
  Eye,
  BookOpen,
} from 'lucide-react';

interface ResourceDetailModalProps {
  resource: LearningResource | null;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
  isInProgress: boolean;
  onToggleCompleted: (id: string) => void;
  onToggleInProgress: (id: string) => void;
  studentNote: string;
  onSaveNote: (resourceId: string, note: string) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  isOpen,
  onClose,
  isCompleted,
  isInProgress,
  onToggleCompleted,
  onToggleInProgress,
  studentNote,
  onSaveNote,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'notes'>('overview');
  const [noteInput, setNoteInput] = useState(studentNote || '');
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNoteInput(studentNote || '');
  }, [studentNote, resource]);

  // Trap focus and close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !resource) return null;

  const handleSaveNote = () => {
    onSaveNote(resource.id, noteInput);
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resource-modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden outline-none animate-in fade-in zoom-in-95 duration-150 my-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-slate-50/70">
          <div className="pr-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                {resource.category}
              </span>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-slate-100 text-slate-700">
                {resource.difficulty}
              </span>
              <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-slate-100 text-slate-700">
                {resource.type}
              </span>
            </div>
            <h2 id="resource-modal-title" className="text-xl font-bold text-slate-900 leading-snug">
              {resource.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Curated Provider: <strong className="text-slate-700">{resource.provider}</strong> • Estimated Time: <strong>{resource.duration}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
            aria-label="Close resource dialog"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/30 px-6" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Overview & Practice Task
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'transcript'}
            onClick={() => setActiveTab('transcript')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'transcript'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Transcript & Accessibility
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'notes'}
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'notes'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            My Study Notes {noteInput.trim() ? '•' : ''}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  About this resource
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {resource.description}
                </p>
              </div>

              {/* Key Topics */}
              {resource.keyTopics.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Key Topics Covered
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {resource.keyTopics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Prerequisites */}
              {resource.prerequisites && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900">
                  <strong className="block font-bold mb-0.5">Prerequisites:</strong>
                  <span>{resource.prerequisites}</span>
                </div>
              )}

              {/* Practical Task */}
              {resource.practicalTask && (
                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 mb-1.5">
                    <Code2 className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                    <span>Recommended Hands-On CSE Practice Task</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-mono bg-white p-3 rounded-lg border border-indigo-100">
                    {resource.practicalTask}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                  <Eye className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                  <span>Accessibility Information & Verified Formats</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {resource.accessibility.map((a11y, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-700"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                      <span>{a11y}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transcript Preview */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Sample Content / Key Excerpt Preview
                </h3>
                <blockquote className="p-4 rounded-xl bg-slate-100/70 border-l-4 border-indigo-600 text-xs text-slate-700 leading-relaxed italic">
                  "{resource.transcriptPreview || 'Full readable text transcription and screen-reader accessible structural tags are present in this module.'}"
                </blockquote>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="student-notes-textarea"
                  className="text-xs font-bold uppercase tracking-wider text-slate-500"
                >
                  Personal Learning Notes (Saved Locally)
                </label>
                {noteSavedFeedback && (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 animate-in fade-in duration-200">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    Saved to LocalStorage!
                  </span>
                )}
              </div>
              <textarea
                id="student-notes-textarea"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Jot down key takeaways, code snippets, algorithm complexities, or questions for your professor..."
                rows={6}
                className="w-full p-3 text-sm text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNote}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" aria-hidden="true" />
                  Save Note
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompleted(resource.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg border transition-colors ${
                isCompleted
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>{isCompleted ? 'Completed' : 'Mark as Completed'}</span>
            </button>

            <button
              onClick={() => onToggleInProgress(resource.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                isInProgress
                  ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {isInProgress ? 'In Progress' : 'Mark In Progress'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              aria-label={`Open external resource: ${resource.title} (opens in a new tab)`}
            >
              <span>Go to Resource</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
