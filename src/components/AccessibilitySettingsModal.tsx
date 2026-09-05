import React, { useEffect, useRef } from 'react';
import { AccessibilitySettings } from '../types';
import { X, Type, Eye, Zap, Check, HelpCircle } from 'lucide-react';

interface AccessibilitySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onSetFontSize: (size: 'normal' | 'large' | 'xl') => void;
  onToggleHighContrast: () => void;
  onToggleReduceMotion: () => void;
}

export const AccessibilitySettingsModal: React.FC<AccessibilitySettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSetFontSize,
  onToggleHighContrast,
  onToggleReduceMotion,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key and trap focus
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden outline-none animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
              <Eye className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="a11y-modal-title" className="text-lg font-bold text-slate-900">
                Accessibility Preferences
              </h2>
              <p className="text-xs text-slate-500">
                Customize typography, contrast, and motion for your learning experience
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close accessibility dialog"
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Text Size Controls */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Type className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                Text Size Scaling
              </label>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                Current: {settings.fontSize === 'xl' ? 'Extra Large (125%)' : settings.fontSize === 'large' ? 'Large (112%)' : 'Normal (100%)'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'normal', label: 'Default', size: '100%', sample: 'Aa' },
                  { id: 'large', label: 'Large', size: '112%', sample: 'Aa' },
                  { id: 'xl', label: 'Extra Large', size: '125%', sample: 'Aa' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onSetFontSize(opt.id)}
                  aria-pressed={settings.fontSize === opt.id}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                    settings.fontSize === opt.id
                      ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span className={`text-base font-semibold ${opt.id === 'xl' ? 'text-lg' : ''}`}>
                    {opt.sample}
                  </span>
                  <span className="text-xs mt-1">{opt.label}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{opt.size}</span>
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="space-y-0.5 pr-4">
              <span className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                High Contrast Theme
              </span>
              <p className="text-xs text-slate-600">
                Enhances border contrast and sharpens text color for higher legibility.
              </p>
            </div>
            <button
              onClick={onToggleHighContrast}
              role="switch"
              aria-checked={settings.highContrast}
              aria-label="Toggle high contrast mode"
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                settings.highContrast ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  settings.highContrast ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="space-y-0.5 pr-4">
              <span className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600" aria-hidden="true" />
                Reduce Motion
              </span>
              <p className="text-xs text-slate-600">
                Minimizes animations and transitions for users sensitive to motion.
              </p>
            </div>
            <button
              onClick={onToggleReduceMotion}
              role="switch"
              aria-checked={settings.reduceMotion}
              aria-label="Toggle reduced motion"
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                settings.reduceMotion ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  settings.reduceMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Accessibility Features Guide */}
          <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-2">
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Resource Accessibility Badges Explained</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
              <li>
                <strong className="text-slate-800">Captions available:</strong> Synchronized video captions for deaf and hard-of-hearing students.
              </li>
              <li>
                <strong className="text-slate-800">Transcript available:</strong> Full readable text equivalent of video or audio material.
              </li>
              <li>
                <strong className="text-slate-800">Screen-reader friendly:</strong> Verified semantic headings, ARIA attributes, and readable DOM structure.
              </li>
              <li>
                <strong className="text-slate-800">Accessible PDF:</strong> Tagged documents with logical reading orders and alt text on diagrams.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
