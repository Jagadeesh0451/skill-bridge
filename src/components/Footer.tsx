import React from 'react';
import { ShieldCheck, Github, ExternalLink, GraduationCap } from 'lucide-react';
import { SkillBridgeLogo } from './SkillBridgeLogo';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenA11yModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenA11yModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Platform Info with Official Logo */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <SkillBridgeLogo className="h-8 w-auto" variant="white" />
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-900/60 text-blue-300 rounded border border-blue-700/50">
                CSE Student Portal
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An accessible skill-development platform created for college students to discover,
              organize, and master technical and career skills through structured, high-quality
              educational resources.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Built with 100% Free & Open-Source technologies • Zero Paid API Dependencies</span>
            </div>
          </div>

          {/* Col 2: Core Platform Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Core Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('landing')}
                  className="hover:text-white transition-colors text-left"
                >
                  Home / Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('dashboard')}
                  className="hover:text-white transition-colors text-left"
                >
                  Student Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('categories')}
                  className="hover:text-white transition-colors text-left"
                >
                  Skill Domains (10)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('discovery')}
                  className="hover:text-white transition-colors text-left"
                >
                  Resource Discovery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('recommendations')}
                  className="hover:text-white transition-colors text-left"
                >
                  Personalized Recommendations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('progress')}
                  className="hover:text-white transition-colors text-left"
                >
                  Learning Progress Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Accessibility & Deployment */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Accessibility & Standards
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={onOpenA11yModal}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors text-left"
                >
                  Accessibility Settings
                </button>
              </li>
              <li>WCAG 2.1 AA Compliant</li>
              <li>Verified Captions & Transcripts</li>
              <li>High-Contrast & Scalable Fonts</li>
              <li className="pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400 block font-mono">
                  GitHub & Vercel Ready
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-400" aria-hidden="true" />
            <span>&copy; {new Date().getFullYear()} SkillBridge • Computer Science Engineering Final Year Capstone MVP</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              Open Source MVP
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 font-medium">
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              Zero Cost Deployment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
