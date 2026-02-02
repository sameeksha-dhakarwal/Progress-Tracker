# Progress Tracker
Live link : https://progress-tracker-712.netlify.app/
A modern **year-long activity & productivity tracker** inspired by the *Year in Pixels* concept.  
Built with **React + Vite**, backed by **Supabase**, and designed to help you **visualize habits, streaks, and progress** across an entire year.

Track daily activities, maintain streaks, analyze weekly productivity, and export your data — all securely persisted per user.

---

## Features

### Year View
- Interactive **Year in Pixels grid**
- Visualize daily activity completion at a glance
- Month-wise layout with horizontal scrolling
- Color-coded days based on activity levels

### Daily Activities
- Click any day to add activities
- Track multiple activities per day
- Assign levels (low / medium / high)
- Automatic daily completion calculation

### Streaks
- 🔥 **Current Streak**
- 🏆 **Best Streak**
- Automatically resets on missed days
- Persists across logout / login

### Analytics
-  **Weekly Progress Chart**
  - X-axis: Date
  - Y-axis: Productivity %
  - Smooth, wavy line graph
- Yearly summary:
  - Total tracked days
  - Productivity percentage
  - Best & worst months

### Highlights
- Best day
- Worst day
- Missed days count

### Filters
- Filter by:
  - Month
  - Activity
  - Level
- One-click reset

### Data Export
- Download all data as **CSV**
- Useful for backups or external analysis

### Authentication & Persistence
- Secure authentication with **Supabase Auth**
- All data stored per user
- Data persists across:
  - Page refresh
  - Logout / Login
  - Browser restarts

---

## Tech Stack

- React + Vite
- Tailwind CSS
- Supabase
  - Authentication
  - PostgreSQL
  - Row Level Security (RLS)
- Recharts
- Day.js
- Lucide Icons

---

## Project Structure

```bash
year-in-pixels/
├─ public/
│  └─ preview.png
├─ src/
│  ├─ components/
│  │  ├─ YearGrid.jsx
│  │  ├─ DailyActivities.jsx
│  │  ├─ Filters.jsx
│  │  ├─ StreaksCards.jsx
│  │  ├─ Highlights.jsx
│  │  ├─ YearlySummary.jsx
│  │  ├─ WeeklyProgressChart.jsx
│  │  └─ ...
│  ├─ context/
│  │  └─ AuthContext.jsx
│  ├─ pages/
│  │  ├─ Login.jsx
│  │  └─ Signup.jsx
│  ├─ utils/
│  │  ├─ supabaseData.js
│  │  ├─ streaks.js
│  │  ├─ exportData.js
│  │  └─ chartData.js
│  ├─ supabase.js
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ package.json
├─ vite.config.js
└─ README.md
```
## Environment Variables

Create a `.env` file in the project root (same level as `package.json`):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
## Getting Started
1) Clone
git clone https://github.com/<your-username>/year-in-pixels.git
cd year-in-pixels

2) Install dependencies
npm install

3) Add environment variables

Create a .env file and add your Supabase credentials:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4) Run locally
npm run dev


## Open in browser:

http://localhost:5173

## Build for Production
npm run build
npm run preview

## How It Works (High Level)
1.  Data Flow
- User authenticates via Supabase Auth
- App loads yearly data using user.id
- All daily activity data is stored as a single yearly JSON
- Changes auto-save using upsert
- A unique (user_id, year) constraint prevents duplicate rows and data loss

2. Streak Logic
- Iterates days in chronological order
- Streak breaks on a missed day
- Automatically calculates:
  Current streak
  Best streak
  Weekly Chart
- Calculates daily productivity percentage
- Groups data by week
- Renders a smooth, wavy line chart using Recharts
