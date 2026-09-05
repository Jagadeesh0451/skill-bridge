import { useState, useEffect, useCallback } from 'react';
import { StudentProgress, SkillCategoryName, LearningResource } from '../types';
import { SAMPLE_RESOURCES } from '../data/resources';

const STORAGE_KEY = 'skillbridge_student_progress_v1';

const DEFAULT_PROGRESS: StudentProgress = {
  completedIds: ['res-web-01'], // 1 realistic completed starter item for immediate demo visibility
  inProgressIds: ['res-prog-01', 'res-ai-01'],
  savedIds: ['res-cloud-01', 'res-int-01'],
  lastAccessedId: 'res-prog-01',
  notes: {
    'res-prog-01': 'Review Big-O asymptotic analysis and practice reverse singly linked list implementation before midterm.',
  },
  selectedSkills: ['Programming', 'Web Development', 'AI / Machine Learning'],
  lastUpdated: new Date().toISOString(),
};

export function useProgress() {
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_PROGRESS,
          ...parsed,
          notes: parsed.notes || {},
          completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
          inProgressIds: Array.isArray(parsed.inProgressIds) ? parsed.inProgressIds : [],
          savedIds: Array.isArray(parsed.savedIds) ? parsed.savedIds : [],
          selectedSkills: Array.isArray(parsed.selectedSkills) ? parsed.selectedSkills : DEFAULT_PROGRESS.selectedSkills,
        };
      }
    } catch (e) {
      console.warn('Failed to parse progress from localStorage, using defaults', e);
    }
    return DEFAULT_PROGRESS;
  });

  // Save to LocalStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  const toggleCompleted = useCallback((resourceId: string) => {
    setProgress((prev) => {
      const isCompleted = prev.completedIds.includes(resourceId);
      const nextCompleted = isCompleted
        ? prev.completedIds.filter((id) => id !== resourceId)
        : [...prev.completedIds, resourceId];

      // If marked completed, remove from inProgress
      const nextInProgress = !isCompleted
        ? prev.inProgressIds.filter((id) => id !== resourceId)
        : prev.inProgressIds;

      return {
        ...prev,
        completedIds: nextCompleted,
        inProgressIds: nextInProgress,
        lastAccessedId: resourceId,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []);

  const toggleInProgress = useCallback((resourceId: string) => {
    setProgress((prev) => {
      const isInProgress = prev.inProgressIds.includes(resourceId);
      const nextInProgress = isInProgress
        ? prev.inProgressIds.filter((id) => id !== resourceId)
        : [...prev.inProgressIds, resourceId];

      // If marked in-progress, remove from completed if it was
      const nextCompleted = !isInProgress
        ? prev.completedIds.filter((id) => id !== resourceId)
        : prev.completedIds;

      return {
        ...prev,
        inProgressIds: nextInProgress,
        completedIds: nextCompleted,
        lastAccessedId: resourceId,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []);

  const toggleSaved = useCallback((resourceId: string) => {
    setProgress((prev) => {
      const isSaved = prev.savedIds.includes(resourceId);
      return {
        ...prev,
        savedIds: isSaved
          ? prev.savedIds.filter((id) => id !== resourceId)
          : [...prev.savedIds, resourceId],
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []);

  const setLastAccessed = useCallback((resourceId: string) => {
    setProgress((prev) => ({
      ...prev,
      lastAccessedId: resourceId,
      // Automatically add to inProgress if not already completed
      inProgressIds: prev.completedIds.includes(resourceId) || prev.inProgressIds.includes(resourceId)
        ? prev.inProgressIds
        : [...prev.inProgressIds, resourceId],
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const saveNote = useCallback((resourceId: string, noteText: string) => {
    setProgress((prev) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [resourceId]: noteText,
      },
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const setSelectedSkills = useCallback((skills: SkillCategoryName[]) => {
    setProgress((prev) => ({
      ...prev,
      selectedSkills: skills,
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({
      completedIds: [],
      inProgressIds: [],
      savedIds: [],
      notes: {},
      selectedSkills: ['Programming', 'Web Development'],
      lastUpdated: new Date().toISOString(),
    });
  }, []);

  // Derived statistics computed against all resources
  const totalResourcesCount = SAMPLE_RESOURCES.length;
  const completedCount = progress.completedIds.length;
  const inProgressCount = progress.inProgressIds.length;
  const savedCount = progress.savedIds.length;
  const remainingCount = Math.max(0, totalResourcesCount - completedCount);
  const completionPercentage = totalResourcesCount > 0
    ? Math.round((completedCount / totalResourcesCount) * 100)
    : 0;

  // Last accessed resource object
  const lastAccessedResource: LearningResource | undefined = progress.lastAccessedId
    ? SAMPLE_RESOURCES.find((r) => r.id === progress.lastAccessedId) || SAMPLE_RESOURCES[0]
    : SAMPLE_RESOURCES[0];

  return {
    progress,
    toggleCompleted,
    toggleInProgress,
    toggleSaved,
    setLastAccessed,
    saveNote,
    setSelectedSkills,
    resetProgress,
    stats: {
      totalResourcesCount,
      completedCount,
      inProgressCount,
      savedCount,
      remainingCount,
      completionPercentage,
      lastAccessedResource,
    },
  };
}
