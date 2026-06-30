# CyberAmbassador — Coding Agent Master Prompt

> Copy this entire prompt into your coding agent (Cursor, GitHub Copilot Workspace, Claude Code, etc.)
> It is self-contained. The agent should be able to scaffold and build the full application from this document alone.

---

## 1. Project Overview

You are building **CyberAmbassador** — a Progressive Web App (PWA) that trains and certifies youth (ages 15–22) as digital citizenship ambassadors in Cameroon and across Africa.

The app has **three distinct user roles**:
- **Ambassador** — a young person going through the training program
- **Parent** — linked to their child's account, receives reports, participates in challenges
- **Admin** — manages the program, reviews submissions, moderates the forum, sends alerts

The platform must work **offline-first** — content must be accessible without internet, with data syncing when connectivity is restored. This is critical for the Cameroonian context where connectivity is intermittent.

---

## 2. Tech Stack — Do Not Deviate

```
Framework:        Next.js 14+ with App Router (TypeScript, strict mode)
Styling:          Tailwind CSS + shadcn/ui
Database:         Supabase (PostgreSQL + Row Level Security)
Auth:             Supabase Auth — phone number OTP as primary, Google OAuth as secondary
Storage:          Supabase Storage (challenge photos — auto-delete after 30 days)
Offline:          Dexie.js (IndexedDB wrapper for offline data)
Push notifs:      Web Push API + Firebase Cloud Messaging (FCM)
Video hosting:    Bunny.net embed (do NOT self-host videos)
PWA:              next-pwa library
State management: React Query (TanStack Query v5) for server state, Zustand for client state
Forms:            React Hook Form + Zod validation
Email/SMS:        Supabase Auth handles OTP SMS via Twilio
Hosting:          Vercel (frontend) + Supabase (backend)
```

---

## 3. Design System & UI

### Color Palette
```css
:root {
  --primary:        #1A5276;   /* Deep blue — trust, authority */
  --primary-light:  #D6EAF8;   /* Light blue — backgrounds */
  --secondary:      #1E8449;   /* Green — growth, Africa */
  --secondary-light:#D5F5E3;   /* Light green */
  --accent:         #F39C12;   /* Amber — energy, youth, alerts */
  --accent-light:   #FDEBD0;   /* Light amber */
  --danger:         #C0392B;   /* Red — errors, high risk */
  --surface:        #F8F9FA;   /* Page background */
  --card:           #FFFFFF;   /* Card background */
  --text-primary:   #1B2631;   /* Main text */
  --text-secondary: #5D6D7E;   /* Muted text */
  --border:         #AED6F1;   /* Borders */
}
```

### Typography
Use **Google Fonts**:
- Display/Headings: `Sora` (bold, modern, African tech feel)
- Body: `DM Sans` (readable, clean, accessible)

### Design Principles
- Mobile-first — design for 360px width minimum
- Bold cards with clear visual hierarchy
- Progress bars and gamification elements prominent
- High contrast — accessible for all literacy levels
- Use emoji sparingly as visual anchors (🛡️ for safety, 🏆 for leaderboard, etc.)
- Bottom navigation bar on mobile for ambassador and parent roles
- Sidebar navigation for admin dashboard (desktop-first)

---

## 4. Database Schema

Run this SQL in Supabase to create all tables:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── USERS ───────────────────────────────────────────────────
CREATE TABLE public.users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone         TEXT UNIQUE,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('ambassador', 'parent', 'admin')),
  avatar_url    TEXT,
  city          TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── COHORTS ─────────────────────────────────────────────────
CREATE TABLE public.cohorts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,        -- e.g. "Yaoundé Pilot — July 2025"
  type          TEXT NOT NULL CHECK (type IN ('onsite', 'remote')),
  start_date    DATE,
  max_size      INT DEFAULT 100,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── AMBASSADOR PROFILES ─────────────────────────────────────
CREATE TABLE public.ambassador_profiles (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  cohort_id           UUID REFERENCES public.cohorts(id),
  level               TEXT DEFAULT 'junior' CHECK (level IN ('junior', 'senior', 'master')),
  total_points        INT DEFAULT 0,
  modules_completed   INT DEFAULT 0,
  certified_at        TIMESTAMPTZ,
  kit_dispatched      BOOLEAN DEFAULT FALSE,
  capstone_submitted  BOOLEAN DEFAULT FALSE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON public.ambassador_profiles(total_points DESC);
CREATE INDEX ON public.ambassador_profiles(cohort_id);

-- ─── FAMILY LINKS ─────────────────────────────────────────────
CREATE TABLE public.family_links (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id       UUID REFERENCES public.users(id) ON DELETE CASCADE,
  child_id        UUID REFERENCES public.users(id) ON DELETE CASCADE,
  family_code     TEXT UNIQUE NOT NULL,   -- 6-char uppercase code generated at child registration
  linked_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(parent_id, child_id)
);

-- ─── MODULES ──────────────────────────────────────────────────
CREATE TABLE public.modules (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_index     INT NOT NULL,           -- 1, 2, 3, 4
  title           TEXT NOT NULL,
  subtitle        TEXT,
  description     TEXT,
  color           TEXT,                   -- hex color for module card
  icon            TEXT,                   -- emoji icon
  video_url       TEXT,                   -- Bunny.net embed URL
  is_published    BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── LESSONS ──────────────────────────────────────────────────
CREATE TABLE public.lessons (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id       UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  order_index     INT NOT NULL,
  title           TEXT NOT NULL,
  content         JSONB NOT NULL,         -- rich content blocks: [{type: 'text'|'image'|'tip'|'warning', content: '...'}]
  estimated_mins  INT DEFAULT 5,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── QUIZZES ──────────────────────────────────────────────────
CREATE TABLE public.quiz_questions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id       UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  order_index     INT NOT NULL,
  question        TEXT NOT NULL,
  options         JSONB NOT NULL,         -- ["Option A", "Option B", "Option C", "Option D"]
  correct_index   INT NOT NULL,           -- 0-3
  explanation     TEXT,                   -- shown after answering
  points          INT DEFAULT 10
);

-- ─── MODULE PROGRESS ──────────────────────────────────────────
CREATE TABLE public.module_progress (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
  module_id       UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  status          TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  lessons_done    INT DEFAULT 0,
  quiz_score      INT,
  quiz_attempts   INT DEFAULT 0,
  points_earned   INT DEFAULT 0,
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  UNIQUE(user_id, module_id)
);

-- ─── WEEKLY CHALLENGES ────────────────────────────────────────
CREATE TABLE public.challenges (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  instructions    TEXT NOT NULL,
  points          INT DEFAULT 50,
  week_start      DATE NOT NULL,
  requires_photo  BOOLEAN DEFAULT TRUE,
  requires_report BOOLEAN DEFAULT TRUE,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CHALLENGE SUBMISSIONS ────────────────────────────────────
CREATE TABLE public.challenge_submissions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
  challenge_id    UUID REFERENCES public.challenges(id) ON DELETE CASCADE,
  report_text     TEXT,
  photo_url       TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  points_awarded  INT DEFAULT 0,
  reviewer_id     UUID REFERENCES public.users(id),
  reviewer_note   TEXT,
  reviewed_at     TIMESTAMPTZ,
  auto_delete_at  TIMESTAMPTZ GENERATED ALWAYS AS (reviewed_at + INTERVAL '30 days') STORED,
  submitted_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- ─── PARENT CHALLENGES ────────────────────────────────────────
CREATE TABLE public.parent_challenges (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id        UUID REFERENCES public.users(id) ON DELETE CASCADE,
  parent_id       UUID REFERENCES public.users(id) ON DELETE CASCADE,
  challenge_id    UUID REFERENCES public.challenges(id),
  message         TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'completed')),
  bonus_points    INT DEFAULT 20,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── CAPSTONE PROJECTS ────────────────────────────────────────
CREATE TABLE public.capstone_projects (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  action_type     TEXT NOT NULL,          -- 'whatsapp_broadcast'|'school_talk'|'social_post'|'other'
  reach_count     INT,                    -- estimated people reached
  evidence_url    TEXT,
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewer_id     UUID REFERENCES public.users(id),
  submitted_at    TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at     TIMESTAMPTZ
);

-- ─── FORUM REPORTS ────────────────────────────────────────────
CREATE TABLE public.forum_reports (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id     UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type            TEXT NOT NULL CHECK (type IN ('scam', 'bullying', 'misinformation', 'other')),
  platform        TEXT,                   -- 'facebook'|'whatsapp'|'tiktok'|'instagram'|'other'
  description     TEXT NOT NULL,
  evidence_url    TEXT,
  target_url      TEXT,                   -- URL or account handle being reported
  status          TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'actioned', 'rejected')),
  admin_id        UUID REFERENCES public.users(id),
  admin_note      TEXT,
  ambassadors_notified INT DEFAULT 0,
  outcome         TEXT,
  verified_at     TIMESTAMPTZ,
  actioned_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── LEADERBOARD SNAPSHOTS ────────────────────────────────────
CREATE TABLE public.weekly_snapshots (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
  week_start      DATE NOT NULL,
  points_earned   INT DEFAULT 0,
  rank            INT,
  challenges_done INT DEFAULT 0,
  UNIQUE(user_id, week_start)
);

-- ─── NOTIFICATIONS ────────────────────────────────────────────
CREATE TABLE public.notifications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type            TEXT NOT NULL,          -- 'challenge_approved'|'forum_action'|'parent_report'|'level_up'
  title           TEXT NOT NULL,
  body            TEXT NOT NULL,
  data            JSONB,                  -- extra payload
  read            BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON public.notifications(user_id, read, created_at DESC);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambassador_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "users_own" ON public.users FOR ALL USING (auth.uid() = id);
-- Ambassadors own their progress
CREATE POLICY "progress_own" ON public.module_progress FOR ALL USING (auth.uid() = user_id);
-- Ambassadors own their submissions
CREATE POLICY "submissions_own" ON public.challenge_submissions FOR ALL USING (auth.uid() = user_id);
-- Parents can read linked child data (via family_links)
CREATE POLICY "parent_read_child" ON public.ambassador_profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.family_links WHERE parent_id = auth.uid() AND child_id = user_id));
-- Notifications are private
CREATE POLICY "notifs_own" ON public.notifications FOR ALL USING (auth.uid() = user_id);
-- Forum reports: ambassadors can create, admins can do all
CREATE POLICY "forum_create" ON public.forum_reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "forum_read_own" ON public.forum_reports FOR SELECT USING (auth.uid() = reporter_id);
```

---

## 5. Application Routes & Pages

### Public Routes
```
/                     → Landing page (app description, download/install CTA)
/login                → Phone OTP login
/register             → Registration (role selection: ambassador or parent)
/register/ambassador  → Ambassador registration form
/register/parent      → Parent registration + family code entry
```

### Ambassador Routes (authenticated, role: ambassador)
```
/dashboard            → Home: progress overview, active challenge, quick stats
/modules              → All 4 modules list with progress indicators
/modules/[id]         → Module detail: lessons list + quiz access
/modules/[id]/lesson/[lessonId] → Individual lesson content (offline-capable)
/modules/[id]/quiz    → Module quiz
/challenges           → Current weekly challenge
/challenges/submit    → Challenge submission form (photo + report)
/leaderboard          → Rankings (cohort + global tabs)
/forum                → Community forum: report submission + feed of actioned alerts
/forum/report         → New report form
/profile              → Ambassador profile, points, badges, certification status
/capstone             → Capstone project submission
/notifications        → All notifications
```

### Parent Routes (authenticated, role: parent)
```
/parent/dashboard     → Child overview: recent activity, points, module progress
/parent/reports       → Weekly reports archive
/parent/challenge     → Accept child's parent challenge
/parent/link          → Link to child via family code (if not yet linked)
```

### Admin Routes (authenticated, role: admin)
```
/admin                → Dashboard: key metrics, pending items count
/admin/ambassadors    → List of all ambassadors with filters
/admin/submissions    → Challenge submission review queue
/admin/forum          → Forum report review queue
/admin/forum/[id]     → Single report detail + action buttons
/admin/capstone       → Capstone project review queue
/admin/cohorts        → Cohort management
/admin/modules        → Module content management (CMS)
/admin/notifications  → Send broadcast notifications
```

---

## 6. Core Features — Implementation Details

### 6.1 Registration & Family Linking

**Ambassador registration flow:**
1. Enter full name, phone number, city, age
2. Supabase sends OTP SMS
3. OTP verified → account created with role: ambassador
4. System generates a unique 6-character family code (e.g. `KJH7P2`) stored in `family_links` with child_id set, parent_id null
5. Family code shown prominently with "Share with your parent" button (WhatsApp share deep link)
6. Ambassador lands on dashboard

**Parent registration flow:**
1. Enter full name, phone number
2. OTP verified → account created with role: parent
3. Prompted to enter family code from child
4. Family code validated → `family_links` row updated with parent_id
5. Parent lands on parent dashboard showing child's profile

### 6.2 Offline Module Content

Use Dexie.js to cache module and lesson content locally:

```typescript
// lib/offline/db.ts
import Dexie, { Table } from 'dexie';

export interface CachedModule {
  id: string;
  data: any;
  cachedAt: Date;
}

export interface CachedLesson {
  id: string;
  moduleId: string;
  data: any;
  cachedAt: Date;
}

export interface PendingSync {
  id?: number;
  type: 'quiz_progress' | 'challenge_submission' | 'lesson_complete';
  payload: any;
  createdAt: Date;
}

export interface LocalProgress {
  moduleId: string;
  lessonsRead: string[];
  quizAnswers: Record<string, number>;
  updatedAt: Date;
}

class CyberAmbassadorDB extends Dexie {
  modules!: Table<CachedModule>;
  lessons!: Table<CachedLesson>;
  pendingSync!: Table<PendingSync>;
  localProgress!: Table<LocalProgress>;

  constructor() {
    super('CyberAmbassadorDB');
    this.version(1).stores({
      modules: 'id, cachedAt',
      lessons: 'id, moduleId, cachedAt',
      pendingSync: '++id, type, createdAt',
      localProgress: 'moduleId, updatedAt'
    });
  }
}

export const db = new CyberAmbassadorDB();

// Sync pending items when online
export async function syncPending() {
  const pending = await db.pendingSync.toArray();
  for (const item of pending) {
    try {
      await pushToSupabase(item);
      await db.pendingSync.delete(item.id!);
    } catch (e) {
      console.error('Sync failed for item', item.id, e);
    }
  }
}
```

Add an online/offline listener in the root layout to trigger sync automatically.

### 6.3 Quiz Engine

- Each module has 5–10 questions
- Minimum passing score: 70%
- Unlimited attempts but points only awarded on first pass
- Show correct answer + explanation after each question
- Confetti animation on module completion
- If offline: save answers to Dexie, sync when reconnected

### 6.4 Challenge Submission & Verification

**Submission form fields:**
- Written report (minimum 100 characters)
- Photo upload (max 5MB, compressed client-side before upload using `browser-image-compression`)
- Optional: location city

**Verification flow:**
```
Ambassador submits → status: 'pending'
Admin reviews in /admin/submissions queue
Admin approves/rejects with optional note → status: 'approved'|'rejected'
Points awarded automatically on approval
Ambassador receives in-app + push notification
Photo auto-deleted after 30 days (cron job via Supabase Edge Function)
```

**Admin review UI must show:**
- Report text
- Photo (full size on click)
- Ambassador name, cohort, current points
- Quick approve/reject buttons with optional note field

### 6.5 Leaderboard

Three tabs:
- **My Cohort** — ranked within same cohort (most relevant, keeps it fair)
- **National** — all ambassadors in Cameroon
- **Weekly** — points earned in current week only

Display: rank, avatar, name, city, level badge, total points. Highlight current user's row.

Update leaderboard in real-time using Supabase Realtime subscriptions on `ambassador_profiles`.

### 6.6 Forum & Collective Action

**Report submission (ambassador):**
- Type: Scam / Bullying / Misinformation / Other
- Platform: Facebook / WhatsApp / TikTok / Instagram / Other
- Description (min 50 chars)
- Evidence photo or screenshot (optional)
- Target URL or account handle

**Admin review queue (/admin/forum):**
- List of pending reports sorted by newest
- Single report view with all details
- Action buttons:
  - ✅ Verify & Notify Ambassadors (sends push + in-app notification to all certified ambassadors)
  - ❌ Reject (with required reason)
- Notification message to ambassadors must include:
  - Type of threat
  - Platform
  - Clear action instructions (e.g. "Go to this account and report it using these steps")
  - Link/handle of target

**Ambassador notification (forum action):**
- Push notification + in-app alert
- Shows in `/forum` feed as verified alert card
- Ambassador can mark "Action taken" to track participation

### 6.7 Parent Weekly Report

Generate automatically every Sunday at 23:59 via Supabase Edge Function (cron):

```typescript
// Report content:
{
  child_name: string,
  week_period: string,           // "July 14–20, 2025"
  points_earned_this_week: number,
  challenges_completed: number,
  modules_progress: {
    module_name: string,
    status: 'not_started' | 'in_progress' | 'completed',
    percentage: number
  }[],
  forum_contributions: number,   // reports submitted
  current_rank: number,
  level: 'junior' | 'senior' | 'master',
  message: string                // auto-generated encouraging message
}
```

Store in `notifications` table with type `parent_report`. Parent sees it in `/parent/reports`.

### 6.8 Ambassador Level Progression

```
Junior Ambassador    →  0 points, just registered
Senior Ambassador    →  complete all 4 modules + 4 challenges (500+ points)
Master Ambassador    →  senior + capstone submitted + approved (1000+ points)
```

Check and upgrade level automatically after any points-awarding event. Trigger a "Level Up" celebration screen with confetti when level changes.

### 6.9 PWA Configuration

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'supabase-api',
        expiration: { maxEntries: 200, maxAgeSeconds: 7 * 24 * 60 * 60 }
      }
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: { cacheName: 'images', expiration: { maxEntries: 100 } }
    }
  ]
});
```

Add to `<head>` in root layout:
```html
<meta name="theme-color" content="#1A5276" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<link rel="apple-touch-icon" href="/icons/icon-192.png" />
```

---

## 7. Key Components to Build

### 7.1 Bottom Navigation (Ambassador & Parent mobile)
```
Ambassador: Home | Modules | Challenges | Leaderboard | Forum
Parent:     Home | Reports | Challenge  | Profile
```
Fixed at bottom on mobile, hidden on desktop (use sidebar instead).

### 7.2 Module Card
Shows: module number, color, icon, title, progress bar, status badge (locked/in progress/completed).
Locked if previous module not completed.

### 7.3 Quiz Component
- One question at a time (no scrolling through all)
- Progress bar at top (Question 3 of 8)
- Answer options as large tappable cards (minimum 48px touch target)
- Immediate feedback after selection (green correct / red wrong + explanation)
- Final score screen with points earned + next action CTA

### 7.4 Challenge Card
Shows: title, description, deadline (days remaining), points value, current submission status.

### 7.5 Leaderboard Row
Shows: rank number (with medal emoji for top 3), avatar, name, city, level badge, points. Highlighted if current user.

### 7.6 Forum Report Card
Shows: type badge (color-coded), platform, description excerpt, status badge, date. Verified reports show action instructions prominently.

### 7.7 Admin Stats Dashboard
Show 6 key metrics as cards:
- Total ambassadors certified
- Pending challenge submissions
- Pending forum reports
- Active cohorts
- Parent accounts linked
- Weekly active users

---

## 8. Environment Variables

Create `.env.local`:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # server-side only

# Firebase (push notifications)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_VAPID_KEY=

# Bunny.net (video)
BUNNY_STREAM_API_KEY=
NEXT_PUBLIC_BUNNY_PULL_ZONE=

# App
NEXT_PUBLIC_APP_URL=https://cyberambassador.cm
NEXT_PUBLIC_APP_NAME=CyberAmbassador
```

---

## 9. Content — The Four Modules

Seed this content into the `modules` and `lessons` tables:

### Module 1 — Hygiène Numérique
**Color:** #1A5276 | **Icon:** 🛡️
**Lessons:**
1. Comment les algorithmes influencent ce que tu vois en ligne
2. Gérer le temps d'écran et les habitudes numériques
3. Protéger ta vie privée: paramètres et mots de passe
4. Reconnaître les signaux d'alerte du surmenage numérique
5. Utiliser la technologie de manière saine au quotidien

### Module 2 — E-Réputation & Désinformation
**Color:** #1E8449 | **Icon:** 🌐
**Lessons:**
1. Ton empreinte numérique est permanente — comprendre l'impact
2. Construire une identité numérique positive intentionnelle
3. Comment vérifier une information avant de la partager
4. Reconnaître et résister à la désinformation
5. Réagir de manière constructive aux contenus en ligne

### Module 3 — Online Scams & Digital Safety
**Color:** #B7950B | **Icon:** ⚠️
**Lessons:**
1. Les types d'arnaques les plus courants au Cameroun
2. Reconnaître le phishing, la sextorsion et la fraude financière
3. Que faire si tu es victime: étapes concrètes
4. Comment aider un ami ou un membre de la famille victime
5. Où signaler les arnaques au Cameroun

### Module 4 — Leadership & Advocacy
**Color:** #6C3483 | **Icon:** 🏆
**Lessons:**
1. Ce que signifie être un leader numérique positif
2. Utiliser le forum CyberAmbassador pour protéger ta communauté
3. Signaler collectivement les contenus nuisibles
4. Soutenir les victimes de harcèlement en ligne
5. Concevoir ton projet capstone communautaire

---

## 10. Supabase Edge Functions to Create

### 10.1 Weekly Parent Report Generator
```
Schedule: Every Sunday at 23:59 UTC+1
Function: generate-parent-reports
Logic: For each active ambassador with a linked parent, compile the weekly report and insert into notifications table
```

### 10.2 Photo Auto-Deletion
```
Schedule: Every day at 02:00 UTC
Function: cleanup-expired-photos
Logic: Find challenge_submissions where auto_delete_at < NOW() and photo_url IS NOT NULL, delete from Supabase Storage, set photo_url = NULL
```

### 10.3 Level Upgrade Check
```
Trigger: After INSERT or UPDATE on ambassador_profiles (total_points changed)
Function: check-level-upgrade
Logic: Calculate new level based on points + completions, update level if changed, insert level_up notification
```

### 10.4 Leaderboard Weekly Snapshot
```
Schedule: Every Monday at 00:01 UTC
Function: snapshot-leaderboard
Logic: Insert weekly_snapshots rows for all ambassadors with points earned in the past week + calculated rank
```

---

## 11. Build Order — Follow This Sequence

Build in this exact order to have something testable at each step:

```
Step 1:  Project setup (Next.js + Supabase + Tailwind + shadcn)
Step 2:  Database schema (run SQL above)
Step 3:  Auth flows (register ambassador, register parent, login, OTP)
Step 4:  Family code generation and linking
Step 5:  Ambassador dashboard (skeleton with placeholder data)
Step 6:  Module list page + module detail page
Step 7:  Lesson content renderer (JSON content blocks → UI)
Step 8:  Offline caching (Dexie setup + module content sync)
Step 9:  Quiz engine (full flow: question → answer → feedback → score)
Step 10: Module progress tracking (DB sync + offline fallback)
Step 11: Weekly challenge page + submission form
Step 12: Admin submission review queue
Step 13: Leaderboard (cohort + national + weekly tabs)
Step 14: Forum report submission
Step 15: Admin forum review + ambassador notification system
Step 16: Parent dashboard + weekly report display
Step 17: Parent challenge mechanic
Step 18: Capstone project submission
Step 19: Level progression logic + level-up celebration
Step 20: Push notifications (FCM setup + Web Push)
Step 21: PWA configuration (next-pwa + manifest + service worker)
Step 22: Admin analytics dashboard
Step 23: Offline sync (pendingSync queue + online listener)
Step 24: Performance audit + Lighthouse PWA score
Step 25: Seed module content (4 modules, lessons, quiz questions)
```

---

## 12. Critical Technical Rules

- **Never store sensitive personal data in forum posts** — no full names, no phone numbers visible publicly in forum
- **All photo uploads must be compressed client-side** before uploading (use `browser-image-compression` library, target <500KB)
- **Parental consent must be recorded** at ambassador registration for users under 18 — add a checkbox + timestamp field to `ambassador_profiles`
- **Forum access is gated** — ambassador must complete all 4 modules before posting to forum
- **Admin routes must be protected** server-side — check role in middleware, never client-side only
- **Use Supabase RLS for all data access** — never bypass with service role key on the client
- **All forms must work offline** — save to Dexie if no connection, sync when back online
- **Minimum touch target: 48px** on all interactive elements — many users are on small screens
- **Images must have alt text** — accessibility is non-negotiable
- **Test on slow 3G** — use Chrome DevTools network throttling during development

---

## 13. Seed Data for Development

Create a seed script that generates:
- 1 admin user
- 1 cohort: "Yaoundé Pilot — Juillet 2025" (onsite, 15 max)
- 5 ambassador users in that cohort with varying progress levels
- 2 parent users linked to 2 of the ambassadors
- All 4 modules with 5 lessons each (placeholder content)
- 5 quiz questions per module
- 2 weekly challenges (one past, one current)
- 3 forum reports (one pending, one verified, one actioned)

---

## 14. Definition of Done for Pilot Launch

The app is ready for the 15-person onsite pilot when:

- [ ] Ambassador can register with phone OTP
- [ ] Parent can register and link via family code
- [ ] All 4 modules navigable with lesson content
- [ ] Quiz works with scoring and points awarded
- [ ] Weekly challenge submission works (text + photo)
- [ ] Admin can approve/reject submissions
- [ ] Leaderboard updates after approval
- [ ] Parent receives weekly report notification
- [ ] App installs as PWA on Android
- [ ] App loads module content offline after first visit
- [ ] Admin can send forum alert to all ambassadors
- [ ] No Lighthouse PWA score below 85

---

*CyberAmbassador — Building digital citizens, one ambassador at a time.*
*Pilot: Yaoundé, Cameroon — 2025*