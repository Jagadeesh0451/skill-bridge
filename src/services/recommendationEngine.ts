import {
  LearningResource,
  RecommendationFormInput,
  RecommendationResult,
  SkillCategoryName,
} from '../types';

/**
 * Intelligent Rule-Based Recommendation Engine
 * Decoupled service layer that computes tailored educational recommendations
 * based on student skill interests, current proficiency level, career goal, and format preference.
 * Designed to be zero-cost, 100% reliable, and pluggable for remote AI models.
 */

// Goal-to-skill affinity weights for contextual alignment
const GOAL_AFFINITY_MAP: Record<string, { skills: SkillCategoryName[]; types: string[] }> = {
  'Build Projects & Portfolio': {
    skills: ['Web Development', 'Programming', 'Cloud Computing', 'AI / Machine Learning'],
    types: ['Course', 'Practice Resource', 'Video'],
  },
  'Crack Campus Placements': {
    skills: ['Aptitude', 'Interview Skills', 'Programming', 'Communication Skills'],
    types: ['Practice Resource', 'PDF', 'Course'],
  },
  'Master Core Fundamentals': {
    skills: ['Programming', 'Web Development', 'Data Science', 'Cybersecurity'],
    types: ['Documentation', 'Course', 'Article'],
  },
  'Prepare for Technical Interviews': {
    skills: ['Interview Skills', 'Programming', 'Cloud Computing'],
    types: ['Practice Resource', 'Article', 'Video'],
  },
  'Prepare for Tech Internships': {
    skills: ['Web Development', 'Programming', 'Career Development', 'Cloud Computing'],
    types: ['Course', 'Documentation', 'Practice Resource'],
  },
  'Upskill for Higher Studies & Research': {
    skills: ['AI / Machine Learning', 'Data Science', 'Cybersecurity'],
    types: ['Article', 'PDF', 'Documentation'],
  },
};

export async function generateRecommendations(
  input: RecommendationFormInput,
  resources: LearningResource[]
): Promise<RecommendationResult[]> {
  // Simulate asynchronous dispatch so it behaves identically to an AI service
  await new Promise((resolve) => setTimeout(resolve, 350));

  try {
    if (!resources || resources.length === 0) {
      return [];
    }

    const { interestedSkills, currentLevel, careerGoal, preferredType } = input;
    const goalAffinity = GOAL_AFFINITY_MAP[careerGoal] || { skills: [], types: [] };

    const scoredResults: RecommendationResult[] = resources.map((res) => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Skill Match (Weight: 40 points)
      if (interestedSkills.length > 0 && interestedSkills.includes(res.category)) {
        score += 40;
        reasons.push(`Direct match for your interest in ${res.category}`);
      } else if (goalAffinity.skills.includes(res.category)) {
        score += 20;
        reasons.push(`High industry alignment with your goal: "${careerGoal}"`);
      }

      // 2. Difficulty Level Match (Weight: 30 points)
      if (res.difficulty === currentLevel) {
        score += 30;
        reasons.push(`Perfect match for your ${currentLevel} proficiency`);
      } else if (
        (currentLevel === 'Beginner' && res.difficulty === 'Intermediate') ||
        (currentLevel === 'Intermediate' && (res.difficulty === 'Beginner' || res.difficulty === 'Advanced')) ||
        (currentLevel === 'Advanced' && res.difficulty === 'Intermediate')
      ) {
        score += 15;
        reasons.push(`Suitable growth step adjacent to ${currentLevel} level`);
      }

      // 3. Career Goal Synergy (Weight: 20 points)
      if (goalAffinity.types.includes(res.type)) {
        score += 15;
        reasons.push(`${res.type} format is proven for ${careerGoal}`);
      }
      if (goalAffinity.skills.includes(res.category) && interestedSkills.includes(res.category)) {
        score += 5;
      }

      // 4. Preferred Resource Type (Weight: 10 points)
      if (preferredType === 'Any' || res.type === preferredType) {
        score += 10;
        if (preferredType !== 'Any') {
          reasons.push(`Matches your requested format: ${preferredType}`);
        }
      }

      // Accessibility feature bonus (+5 points for multi-modal accessibility)
      if (res.accessibility.length >= 3) {
        score += 5;
        reasons.push(`Multi-format accessibility available (${res.accessibility[0]})`);
      }

      // Cap at 100
      const finalScore = Math.min(100, Math.max(15, score));

      let priorityBadge: string | undefined;
      if (finalScore >= 85) {
        priorityBadge = 'Top Recommended';
      } else if (finalScore >= 70) {
        priorityBadge = 'Strong Match';
      } else if (finalScore >= 50) {
        priorityBadge = 'Relevant Choice';
      }

      return {
        resource: res,
        matchScore: finalScore,
        matchReasons: reasons.length > 0 ? reasons : ['General foundational resource for CSE students'],
        priorityBadge,
      };
    });

    // Sort by match score descending
    const filtered = scoredResults.sort((a, b) => b.matchScore - a.matchScore);

    // If top scores exist, return top matches (e.g. top 6 to 8)
    const topMatches = filtered.filter((r) => r.matchScore >= 45);
    return topMatches.length > 0 ? topMatches.slice(0, 8) : filtered.slice(0, 6);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    // Safe fallback: Return foundational beginner resources
    return resources
      .filter((r) => r.difficulty === 'Beginner')
      .slice(0, 4)
      .map((resource) => ({
        resource,
        matchScore: 65,
        matchReasons: ['Safe fallback foundational resource for CSE students'],
        priorityBadge: 'Foundational',
      }));
  }
}
