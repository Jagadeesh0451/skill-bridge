import React, { useState } from 'react';
import { SAMPLE_RESOURCES } from './data/resources';
import { LearningResource, SkillCategoryName } from './types';
import { useProgress } from './hooks/useProgress';
import { useAccessibility } from './hooks/useAccessibility';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { SkillCategories } from './components/SkillCategories';
import { ResourceDiscovery } from './components/ResourceDiscovery';
import { PersonalizedRecommendations } from './components/PersonalizedRecommendations';
import { LearningProgress } from './components/LearningProgress';
import { ResourceDetailModal } from './components/ResourceDetailModal';
import { AccessibilitySettingsModal } from './components/AccessibilitySettingsModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<SkillCategoryName | 'All'>('All');
  const [activeResource, setActiveResource] = useState<LearningResource | null>(null);
  const [isA11yModalOpen, setIsA11yModalOpen] = useState(false);

  // Hook for LocalStorage progress persistence (Feature 4)
  const {
    progress,
    toggleCompleted,
    toggleInProgress,
    toggleSaved,
    setLastAccessed,
    saveNote,
    setSelectedSkills,
    resetProgress,
    stats,
  } = useProgress();

  // Hook for accessibility management (Feature 5)
  const {
    settings: a11ySettings,
    setFontSize,
    toggleHighContrast,
    toggleReduceMotion,
    liveAnnouncement,
  } = useAccessibility();

  // Navigation handlers
  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: a11ySettings.reduceMotion ? 'auto' : 'smooth' });
  };

  const handleSelectCategoryFromGrid = (catName: SkillCategoryName) => {
    setSelectedCategoryFilter(catName);
    setCurrentTab('discovery');
    window.scrollTo({ top: 0, behavior: a11ySettings.reduceMotion ? 'auto' : 'smooth' });
  };

  const handleOpenResource = (resource: LearningResource) => {
    setActiveResource(resource);
    setLastAccessed(resource.id);
  };

  const handleCloseResource = () => {
    setActiveResource(null);
  };

  const handleToggleSkillInterest = (catName: SkillCategoryName) => {
    const isSelected = progress.selectedSkills.includes(catName);
    const next = isSelected
      ? progress.selectedSkills.filter((s) => s !== catName)
      : [...progress.selectedSkills, catName];
    setSelectedSkills(next);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Screen Reader Live Announcements Region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      {/* Accessible Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleNavigate}
        onOpenA11yModal={() => setIsA11yModalOpen(true)}
        completedCount={stats.completedCount}
        totalCount={stats.totalResourcesCount}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentTab === 'landing' && (
          <LandingPage
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategoryFromGrid}
            onOpenA11yModal={() => setIsA11yModalOpen(true)}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            progress={progress}
            stats={stats}
            resources={SAMPLE_RESOURCES}
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategoryFromGrid}
            onSelectResource={handleOpenResource}
            onToggleCompleted={toggleCompleted}
            onToggleSkillInterest={handleToggleSkillInterest}
          />
        )}

        {currentTab === 'categories' && (
          <SkillCategories
            onSelectCategory={handleSelectCategoryFromGrid}
            selectedSkills={progress.selectedSkills}
            onToggleSkillInterest={handleToggleSkillInterest}
          />
        )}

        {currentTab === 'discovery' && (
          <ResourceDiscovery
            resources={SAMPLE_RESOURCES}
            selectedCategoryFilter={selectedCategoryFilter}
            onSelectCategoryFilter={setSelectedCategoryFilter}
            completedIds={progress.completedIds}
            inProgressIds={progress.inProgressIds}
            savedIds={progress.savedIds}
            onToggleCompleted={toggleCompleted}
            onToggleSaved={toggleSaved}
            onSelectResource={handleOpenResource}
          />
        )}

        {currentTab === 'recommendations' && (
          <PersonalizedRecommendations
            resources={SAMPLE_RESOURCES}
            defaultSelectedSkills={progress.selectedSkills}
            completedIds={progress.completedIds}
            savedIds={progress.savedIds}
            onToggleCompleted={toggleCompleted}
            onToggleSaved={toggleSaved}
            onSelectResource={handleOpenResource}
          />
        )}

        {currentTab === 'progress' && (
          <LearningProgress
            resources={SAMPLE_RESOURCES}
            progress={progress}
            stats={stats}
            onToggleCompleted={toggleCompleted}
            onToggleSaved={toggleSaved}
            onSelectResource={handleOpenResource}
            onResetProgress={resetProgress}
          />
        )}
      </main>

      {/* Interactive Resource Detail & Practice Modal */}
      <ResourceDetailModal
        resource={activeResource}
        isOpen={!!activeResource}
        onClose={handleCloseResource}
        isCompleted={activeResource ? progress.completedIds.includes(activeResource.id) : false}
        isInProgress={activeResource ? progress.inProgressIds.includes(activeResource.id) : false}
        onToggleCompleted={toggleCompleted}
        onToggleInProgress={toggleInProgress}
        studentNote={activeResource ? progress.notes[activeResource.id] || '' : ''}
        onSaveNote={saveNote}
      />

      {/* Accessibility Preferences Modal */}
      <AccessibilitySettingsModal
        isOpen={isA11yModalOpen}
        onClose={() => setIsA11yModalOpen(false)}
        settings={a11ySettings}
        onSetFontSize={setFontSize}
        onToggleHighContrast={toggleHighContrast}
        onToggleReduceMotion={toggleReduceMotion}
      />

      {/* Informative Footer */}
      <Footer
        onSelectTab={handleNavigate}
        onOpenA11yModal={() => setIsA11yModalOpen(true)}
      />
    </div>
  );
}
