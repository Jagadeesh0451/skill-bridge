export type SkillCategoryName =
  | 'Programming'
  | 'Web Development'
  | 'AI / Machine Learning'
  | 'Data Science'
  | 'Cybersecurity'
  | 'Cloud Computing'
  | 'Communication Skills'
  | 'Aptitude'
  | 'Interview Skills'
  | 'Career Development';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type ResourceType =
  | 'Video'
  | 'Article'
  | 'Course'
  | 'PDF'
  | 'Documentation'
  | 'Practice Resource';

export type AccessibilityFeature =
  | 'Captions available'
  | 'Transcript available'
  | 'Text-based resource'
  | 'Screen-reader friendly'
  | 'Accessible PDF'
  | 'High-contrast friendly';

export interface LearningResource {
  id: string;
  title: string;
  category: SkillCategoryName;
  description: string;
  difficulty: DifficultyLevel;
  type: ResourceType;
  duration: string;
  accessibility: AccessibilityFeature[];
  url: string;
  provider: string;
  keyTopics: string[];
  prerequisites?: string;
  transcriptPreview?: string;
  practicalTask?: string;
  rating?: number;
}

export interface SkillCategoryInfo {
  id: string;
  name: SkillCategoryName;
  icon: string;
  description: string;
  popularTopics: string[];
  recommendedRole: string;
}

export interface StudentProgress {
  completedIds: string[];
  inProgressIds: string[];
  savedIds: string[];
  lastAccessedId?: string;
  notes: Record<string, string>; // resourceId -> text notes
  selectedSkills: SkillCategoryName[];
  lastUpdated: string;
}

export type CareerGoal =
  | 'Build Projects & Portfolio'
  | 'Crack Campus Placements'
  | 'Master Core Fundamentals'
  | 'Prepare for Technical Interviews'
  | 'Prepare for Tech Internships'
  | 'Upskill for Higher Studies & Research';

export interface RecommendationFormInput {
  interestedSkills: SkillCategoryName[];
  currentLevel: DifficultyLevel;
  careerGoal: CareerGoal;
  preferredType: ResourceType | 'Any';
}

export interface RecommendationResult {
  resource: LearningResource;
  matchScore: number; // 0 to 100
  matchReasons: string[];
  priorityBadge?: string;
}

export interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'xl';
  highContrast: boolean;
  reduceMotion: boolean;
  screenReaderAnnouncements: boolean;
}
