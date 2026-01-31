import { useEffect, useState } from "react";

import YearGrid from "./components/YearGrid";
import DailyActivities from "./components/DailyActivities";
import Filters from "./components/Filters";
import StreaksCards from "./components/StreaksCards";
import Highlights from "./components/Highlights";
import YearlySummary from "./components/YearlySummary";
import WeeklyProgressChart from "./components/WeeklyProgressChart";

import { loadUserProfile } from "./utils/profile";
import {
  loadUserYearData,
  saveUserYearData,
} from "./utils/supabaseData";

import { exportCSV } from "./utils/exportData";

import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { supabase } from "./supabase";

function App() {
  const { user } = useAuth();
  const [showSignup, setShowSignup] = useState(false);

  const [profile, setProfile] = useState(null);
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  const [showProgress, setShowProgress] = useState(false);

  const [filters, setFilters] = useState({
    month: "all",
    level: "all",
    activity: "all",
  });

  /* ---------- LOAD PROFILE ---------- */
  useEffect(() => {
    if (!user) return;
    setLoadingProfile(true);
    loadUserProfile(user.id).then((p) => {
      setProfile(p);
      setLoadingProfile(false);
    });
  }, [user]);

  /* ---------- LOAD YEAR DATA ---------- */
  useEffect(() => {
    if (!user) return;
    setLoadingData(true);
    loadUserYearData(user.id).then((d) => {
      setData(d || {});
      setLoadingData(false);
    });
  }, [user]);

  /* ---------- SAVE DATA ---------- */
  useEffect(() => {
    if (!user || loadingData) return;
    saveUserYearData(user.id, data);
  }, [data, user, loadingData]);

  /* ---------- AUTH ---------- */
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        {showSignup ? <Signup /> : <Login />}
        <button
          className="mt-4 text-blue-400"
          onClick={() => setShowSignup(!showSignup)}
        >
          {showSignup ? "Login" : "Create account"}
        </button>
      </div>
    );
  }

  if (loadingProfile || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  /* ---------- DERIVED DATA ---------- */
  const months = [...new Set(Object.keys(data).map((d) => d.slice(0, 7)))];

  const activities = [
    ...new Set(
      Object.values(data).flatMap((d) =>
        Object.keys(d?.activities || {})
      )
    ),
  ];

  return (
    <div className="min-h-screen p-6 space-y-6">

      {/* ---------- TOP BAR ---------- */}
      <div className="flex justify-between items-start">
        <h1 className="text-4xl font-bold">
          Hello {profile?.first_name} {profile?.last_name} !
        </h1>

        <div className="flex flex-col items-end gap-4">
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-4 py-2 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm"
          >
            Logout
          </button>

          <StreaksCards data={data} />
        </div>
      </div>

      {/* ---------- FILTERS + ACTIONS ---------- */}
      <Filters
        filters={filters}
        setFilters={setFilters}
        months={months}
        activities={activities}
        onExportCSV={() => exportCSV(data)}
        onShowProgress={() => setShowProgress(true)}
      />

      {/* ---------- YEAR GRID ---------- */}
      <YearGrid
        data={data}
        filters={filters}
        setSelectedDate={setSelectedDate}
      />

      {/* ---------- LOWER SECTION ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {selectedDate ? (
            <DailyActivities
              date={selectedDate}
              dayData={data[selectedDate]}
              setData={setData}
            />
          ) : (
            <p className="text-slate-400">
              Click a day to add activities
            </p>
          )}
        </div>

        <div className="space-y-6">
          <Highlights data={data} />
          <YearlySummary data={data} />
        </div>
      </div>

      {/* ---------- PROGRESS MODAL ---------- */}
      {showProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-white/10 rounded-xl p-6">
            <button
              onClick={() => setShowProgress(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-4">
             Progress
            </h3>

            <WeeklyProgressChart data={data} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
