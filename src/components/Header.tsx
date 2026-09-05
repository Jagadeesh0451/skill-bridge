import React, { useState } from 'react';
import {
  Compass,
  LayoutDashboard,
  FolderTree,
  Search,
  Sparkles,
  CheckCircle2,
  Sliders,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { SkillBridgeLogo } from './SkillBridgeLogo';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenA11yModal: () => void;
  completedCount: number;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenA11yModal,
  completedCount,
  totalCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Compass },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'categories', label: 'Skill Domains', icon: FolderTree },
    { id: 'discovery', label: 'Explore Resources', icon: Search },
    { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
    { id: 'progress', label: 'Progress Tracker', icon: CheckCircle2 },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Skip to Content accessible link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-blue-700 focus:text-white focus:rounded-xl focus:font-semibold focus:shadow-xl focus:ring-2 focus:ring-blue-400"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-xl p-1 -ml-1 transition-transform hover:scale-[1.01]"
            aria-label="SkillBridge Home"
          >
            {/* The Authentic SkillBridge Vector Logo */}
            <div className="hidden sm:block">
              <SkillBridgeLogo className="h-9 w-auto" variant="full" />
            </div>
            <div className="sm:hidden flex items-center gap-2">
              <SkillBridgeLogo className="h-8 w-auto" variant="mark" />
              <span className="font-extrabold text-lg tracking-tight text-slate-800">
                SKILL<span className="text-blue-700">BRIDGE</span>
              </span>
            </div>

            {/* University & Degree Badge */}
            <div className="hidden xl:flex flex-col border-l border-slate-200 pl-3 py-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                CSE Capstone
              </span>
              <span className="text-[10px] text-slate-500 font-medium leading-none">
                Skill Development Portal
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Primary Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 ring-1 ring-blue-600/30 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-500'}`}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                  {item.id === 'progress' && completedCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {progressPercent}%
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Tools: Accessibility & Mobile Menu */}
          <div className="flex items-center gap-2.5">
            {/* Quick Progress Badge (Desktop) */}
            {completedCount > 0 && (
              <button
                onClick={() => handleNavClick('progress')}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                title={`${completedCount} of ${totalCount} modules completed`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{completedCount}/{totalCount} Done</span>
              </button>
            )}

            {/* Accessibility Settings Trigger with WCAG 2.1 indicator */}
            <button
              onClick={onOpenA11yModal}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-xl shadow-xs transition-all focus:ring-2 focus:ring-blue-600"
              aria-label="Open accessibility options dialog"
              title="Adjust Font Size, High Contrast, and Motion Preferences"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
              <span className="hidden sm:inline">Accessibility</span>
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-slate-100 text-slate-600 border border-slate-200">
                A11y
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden py-4 border-t border-slate-200 space-y-1.5 animate-in slide-in-from-top-2 duration-150"
            aria-label="Mobile Navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 font-bold ring-1 ring-blue-200'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'progress' && (
                    <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-full bg-emerald-100 text-emerald-800">
                      {completedCount} completed
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};
