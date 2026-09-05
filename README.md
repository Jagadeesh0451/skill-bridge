# SkillBridge — Accessible Skill Development Platform for Engineering Students

SkillBridge is an accessible, modern, and student-centric Minimum Viable Product (MVP) web application designed to help college Computer Science Engineering (CSE) students discover, organize, and master technical and career-readiness skills through structured learning paths.

---

## 1. Project Overview

College students often find it challenging to navigate career preparation. High-quality tutorials, documentation, and practice sets exist across the internet, but they are fragmented, poorly organized, or lack essential accessibility support (such as captions, transcripts, and screen-reader semantics). 

**SkillBridge** solves this by providing a unified, accessible skill portal where students can:
- Explore organized skill domains
- Discover learning resources with multi-criteria filtering
- Receive personalized study recommendations based on their proficiency and career ambitions
- Track real-time learning progress and take study notes locally

---

## 2. Problem Statement

Many college students want to develop technical and career skills, but learning resources are often difficult to discover, poorly organized, or not available in accessible formats. Students need a simple platform where they can find skill-development resources and choose learning options that match their interests, skill level, learning preferences, and career goals without having to search through dozens of disconnected websites.

---

## 3. Exactly 5 Core Features

1. **Feature 1 — Skill Categories:**
   - 10 curated CSE domains: *Programming, Web Development, AI / Machine Learning, Data Science, Cybersecurity, Cloud Computing, Communication Skills, Aptitude, Interview Skills, Career Development*.
   - Includes descriptions, syllabus topics, target job roles, and resource counters.

2. **Feature 2 — Resource Discovery:**
   - Multi-criteria real-time search by title, topic, or keyword.
   - Filters by Skill Category, Difficulty Level (*Beginner, Intermediate, Advanced*), and Resource Format (*Course, Video, Article, Documentation, Practice Resource, PDF*).
   - Dedicated filter checkboxes for verified accessibility features.
   - Resource cards with direct "Start / View" details modal, duration, provider, and status toggles.

3. **Feature 3 — Personalized Learning Recommendations:**
   - Interactive profile questionnaire capturing: Target Skills, Current Proficiency Level, Career/Placement Goal, and Preferred Format.
   - Intelligent rule-based recommendation engine scoring affinity, difficulty pacing, and format synergy (calculating percentage match and rationale bullets).
   - Completely free and decoupled architecture ready for remote LLM connection without paid API dependencies.

4. **Feature 4 — Learning Progress Tracking:**
   - Real-time LocalStorage synchronization.
   - Status tracking: Completed modules, In-Progress items, Bookmarked resources, and private study notes.
   - Visual dashboard metric cards, overall percentage progress bar, and category breakdown bars.
   - "Continue Learning" banner to instantly resume from the last accessed module.

5. **Feature 5 — Universal Accessibility Support:**
   - Complies with WCAG 2.1 AA standards.
   - Dynamic text scaling controls: Normal (100%), Large (112%), Extra Large (125%).
   - High-contrast visual mode toggle.
   - Reduced motion mode toggle for motion-sensitive users.
   - Verified resource tags: *Captions available, Transcript available, Text-based resource, Screen-reader friendly, Accessible PDF*.
   - Keyboard accessible: skip-to-content links, visible focus indicators, and ARIA dialog semantics.

---

## 4. Technologies Used

- **Frontend Framework:** React 19 (Functional components, custom hooks)
- **Language:** TypeScript 5.8+ (Strict type safety)
- **Styling:** Tailwind CSS 4 with accessible font scaling & custom contrast variables
- **Icons:** Lucide React (Accessible SVG icons)
- **Build Tool:** Vite 6
- **Storage:** Browser LocalStorage API (Zero database cost)
- **Hosting / Deployment Target:** Vercel & GitHub

---

## 5. Accessibility Features

- **Typography & Scale:** Fluid scaling using Plus Jakarta Sans and Space Grotesk. Text size can be scaled up to 125% without layout breakage.
- **Color Contrast:** All body text exceeds WCAG AA 4.5:1 contrast standards. High Contrast mode increases border weight and deepens text color.
- **Keyboard Navigation:** Full keyboard navigation support (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`). Skip-to-content bypass link provided at document start.
- **Screen Reader Announcements:** Hidden polite live region (`aria-live="polite"`) announcing filter changes and text size updates.

---

## 6. AI / Recommendation Implementation

- **Architecture:** The recommendation system is isolated in `src/services/recommendationEngine.ts`.
- **Intelligent Rule-Based Scoring:**
  - Evaluates domain affinity (40%), difficulty alignment (30%), career goal synergy (20%), format preference (10%), and multi-modal accessibility bonus (5%).
  - Generates human-readable pedagogical explanations for why a resource was matched.
- **Zero Cost / Zero Billing:** Runs entirely in the client runtime without requiring paid API keys, credit cards, or external cloud quotas.
- **Future AI Expansion:** An asynchronous service interface (`generateRecommendations`) allows seamless swapping with Google Gemini API or local open-source models later.

---

## 7. Data Storage

- **No Paid Database Required:** Runs completely on client-side state and browser `localStorage`.
- **Persistence Key:** `skillbridge_student_progress_v1` and `skillbridge_a11y_settings_v1`.
- **Data Persisted:**
  - Completed resource IDs
  - In-progress resource IDs
  - Bookmarked resource IDs
  - Last accessed resource ID
  - Personal study notes per resource
  - Selected target skills
  - Accessibility preferences (font size, contrast mode, motion preference)

---

## 8. How to Run Locally

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/skillbridge.git
   cd skillbridge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`.

---

## 9. Environment Variables

The core MVP application is 100% functional with zero environment variables needed. If you choose to connect server-side AI features in the future, refer to `.env.example`:
```env
# Optional Gemini API Key for server-side enhancements
GEMINI_API_KEY=""
```

---

## 10. How to Push to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "feat: complete SkillBridge accessible CSE learning MVP"
   ```

2. Create a new repository on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Name it `skillbridge`
   - Set it to Public or Private

3. Link and push to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/skillbridge.git
   git branch -M main
   git push -u origin main
   ```

---

## 11. How to Deploy to Vercel

### Option A: Via Vercel Web Dashboard (Recommended)
1. Sign up / Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Import your `skillbridge` GitHub repository.
4. Keep the default build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. Your app will be live on a `*.vercel.app` URL in under 1 minute!

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## License

This project is open-source and built for educational and academic evaluation.
