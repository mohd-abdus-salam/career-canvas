import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Compass, Moon, Clock, ArrowRight } from "lucide-react";
import { auth, db } from "@/integrations/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, doc, getDoc, getDocs, onSnapshot, orderBy, limit, FirestoreError, runTransaction } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { getChapters } from "@/lib/quran-api";

interface ReadingProgress {
  content_type: string;
  section_id: string;
  position: string | null;
  last_read_at: string;
}

interface ReadingHistory {
  id: string;
  content_type: string;
  section_id: string;
  section_title: string | null;
  visited_at: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [progress, setProgress] = useState<ReadingProgress[]>([]);
  const [history, setHistory] = useState<ReadingHistory[]>([]);
  const [chapterVerseCounts, setChapterVerseCounts] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [visitorStats, setVisitorStats] = useState({ today: 0, yesterday: 0, week: 0, lastWeek: 0 });
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let unloadProgress: (() => void) | null = null;
    let unloadHistory: (() => void) | null = null;
    let loadingTimeout: ReturnType<typeof setTimeout> | null = null;

    const getDayKey = (date: Date) => date.toISOString().slice(0, 10);
    const getWeekKey = (date: Date) => {
      const start = new Date(date);
      const day = date.getDay() || 7; // Sunday=7
      start.setDate(date.getDate() - day + 1);
      return start.toISOString().slice(0, 10);
    };

    const markUserAsVisitor = (todayKey: string) => {
      try {
        const savedKey = localStorage.getItem("visitor_last_visit_day");
        if (savedKey === todayKey) return false;
        localStorage.setItem("visitor_last_visit_day", todayKey);
        return true;
      } catch {
        return true;
      }
    };

    const syncVisitorStats = async () => {
      const visitorDoc = doc(db, "site_stats", "visitor_traffic");
      const todayKey = getDayKey(new Date());
      const weekKey = getWeekKey(new Date());
      const incrementHit = markUserAsVisitor(todayKey);

      try {
        await runTransaction(db, async (tx) => {
          const snapshot = await tx.get(visitorDoc);
          let newStats = { today: 0, yesterday: 0, week: 0, lastWeek: 0 };

          if (!snapshot.exists()) {
            newStats.today = incrementHit ? 1 : 0;
            newStats.yesterday = 0;
            newStats.week = incrementHit ? 1 : 0;
            newStats.lastWeek = 0;
            tx.set(visitorDoc, {
              ...newStats,
              dayKey: todayKey,
              weekKey: weekKey,
            });
          } else {
            const data = snapshot.data();
            let today = Number(data.today ?? 0);
            let yesterday = Number(data.yesterday ?? 0);
            let week = Number(data.week ?? 0);
            let lastWeek = Number(data.lastWeek ?? 0);
            const dataDayKey = String(data.dayKey ?? "");
            const dataWeekKey = String(data.weekKey ?? "");

            if (dataDayKey !== todayKey) {
              yesterday = today;
              today = 0;
            }
            if (dataWeekKey !== weekKey) {
              lastWeek = week;
              week = 0;
            }

            if (incrementHit) {
              today += 1;
              week += 1;
            }

            newStats = { today, yesterday, week, lastWeek };
            tx.set(visitorDoc, {
              ...newStats,
              dayKey: todayKey,
              weekKey: weekKey,
            }, { merge: true });
          }

          if (!newStats.today && snapshot?.exists()) {
            newStats = {
              today: Number(snapshot.data()?.today ?? 0),
              yesterday: Number(snapshot.data()?.yesterday ?? 0),
              week: Number(snapshot.data()?.week ?? 0),
              lastWeek: Number(snapshot.data()?.lastWeek ?? 0),
            };
          }

          setVisitorStats(newStats);
        });
      } catch (err) {
        console.warn("Failed to sync visitor stats", err);
      }
    };

    syncVisitorStats();

    const clearLoadingTimeout = () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
        loadingTimeout = null;
      }
    };

    const isOfflineError = (err: unknown) => {
      const code = (err as any)?.code;
      const message = (err as any)?.message;
      return (
        code === "unavailable" ||
        message?.toString().toLowerCase().includes("client is offline")
      );
    };

    const handleError = (err: unknown) => {
      console.error("Error fetching dashboard data:", err);
      const message = (err as any)?.message ?? "Unable to load your progress right now.";

      if (isOfflineError(err)) {
        setError("You appear to be offline. Showing cached progress if available.");
        toast({
          title: "Offline",
          description: "Unable to sync with the server. Showing cached progress if available.",
          variant: "destructive",
        });
      } else {
        setError(message);
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
      }

      setLoading(false);
      clearLoadingTimeout();
    };

    const loadCachedData = async (currentUser: any) => {
      try {
        const progressQuery = query(
          collection(db, "reading_progress"),
          where("user_id", "==", currentUser.uid)
        );
        const historyQuery = query(
          collection(db, "reading_history"),
          where("user_id", "==", currentUser.uid)
        );

        const [progressSnapshot, historySnapshot] = await Promise.all([
          getDocs(progressQuery, { source: "cache" }),
          getDocs(historyQuery, { source: "cache" }),
        ]);

        const cachedProgress = progressSnapshot.docs
          .map((doc) => doc.data() as ReadingProgress)
          .sort((a, b) => new Date(b.last_read_at).getTime() - new Date(a.last_read_at).getTime());
        setProgress(cachedProgress);

        const cachedHistory = historySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() } as ReadingHistory))
          .filter((item) => item.content_type && item.section_id)
          .sort((a, b) => new Date(b.visited_at).getTime() - new Date(a.visited_at).getTime());

        const seen = new Set<string>();
        const uniqueHistory: ReadingHistory[] = [];
        for (const item of cachedHistory) {
          const key = `${item.content_type}_${item.section_id}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueHistory.push(item);
          }
        }

        setHistory(uniqueHistory.slice(0, 5));
        setHistoryLoading(false);
      } catch {
        // Ignore cache errors; we’ll handle them via snapshot listener or toast.
        setHistoryLoading(false);
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/auth");
        return;
      }

      setUser(currentUser);
      setLoading(true);
      setError(null);

      // In case Firestore is slow, show the UI after this delay anyway
      clearLoadingTimeout();
      loadingTimeout = setTimeout(() => {
        setLoading(false);
      }, 1800);

      try {
        const profileRef = doc(db, "profiles", currentUser.uid);

        // Try to load profile from cache first (useful when offline). If not available, fall back to server.
        let profileSnap;
        try {
          profileSnap = await getDoc(profileRef, { source: "cache" });
        } catch {
          profileSnap = null;
        }

        if (!profileSnap || !profileSnap.exists()) {
          try {
            profileSnap = await getDoc(profileRef);
          } catch {
            profileSnap = null;
          }
        }

        if (profileSnap?.exists()) {
          setProfile(profileSnap.data());
        }

        // Load cached data immediately in case the client is offline
        await loadCachedData(currentUser);

        // Ensure UI renders ASAP even if Firestore is slow to respond
        setLoading(false);

        // Load Quran chapter metadata (needed for percent progress calculation)
        try {
          const chapters = await getChapters();
          setChapterVerseCounts(
            Object.fromEntries(chapters.map((chap) => [chap.id, chap.verses_count]))
          );
        } catch (err) {
          console.warn("Failed to load Quran chapter metadata:", err);
        }

        // Fetch only latest progress/history to reduce load time
        const progressQuery = query(
          collection(db, "reading_progress"),
          where("user_id", "==", currentUser.uid),
          // keep latest progress first
          // note: Firestore requires indexing for this combination if not already
          orderBy("last_read_at", "desc"),
          limit(3)
        );

        const historyQuery = query(
          collection(db, "reading_history"),
          where("user_id", "==", currentUser.uid),
          orderBy("visited_at", "desc"),
          limit(5)
        );

        unloadProgress = onSnapshot(
          progressQuery,
          (snapshot) => {
            const progressData = snapshot.docs
              .map((doc) => doc.data() as ReadingProgress)
              .sort((a, b) => new Date(b.last_read_at).getTime() - new Date(a.last_read_at).getTime());
            setProgress(progressData);
            setLoading(false);
          },
          (err: FirestoreError) => handleError(err)
        );

        unloadHistory = onSnapshot(
          historyQuery,
          (snapshot) => {
            const historyData = snapshot.docs
              .map((doc) => ({ id: doc.id, ...doc.data() } as ReadingHistory))
              .filter((item) => item.content_type && item.section_id)
              .sort((a, b) => new Date(b.visited_at).getTime() - new Date(a.visited_at).getTime());

            // Deduplicate by content_type + section_id, keeping latest visited at
            const seen = new Set<string>();
            const uniqueHistory: ReadingHistory[] = [];
            for (const item of historyData) {
              const key = `${item.content_type}_${item.section_id}`;
              if (!seen.has(key)) {
                seen.add(key);
                uniqueHistory.push(item);
              }
            }

            setHistory(uniqueHistory.slice(0, 5));
            setHistoryLoading(false);
            setLoading(false);
          },
          (err: FirestoreError) => handleError(err)
        );
      } catch (err) {
        handleError(err);
      }
    });

    return () => {
      unsubscribeAuth();
      unloadProgress?.();
      unloadHistory?.();
      clearLoadingTimeout();
    };
  }, [navigate, toast, refreshKey]);

  const getContentIcon = (type: string) => {
    switch (type) {
      case "quran":
        return <BookOpen className="w-5 h-5" />;
      case "umrah":
        return <Compass className="w-5 h-5" />;
      case "hajj":
        return <Moon className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getProgressEntry = (item: ReadingHistory) => {
    return progress.find((p) => p.content_type === item.content_type && p.section_id === item.section_id);
  };

  const getContentLink = (item: ReadingHistory) => {
    const progressEntry = getProgressEntry(item);

    switch (item.content_type) {
      case "quran": {
        const ayah = progressEntry?.position ? Number(progressEntry.position) : undefined;
        return `/quran?surah=${item.section_id}${ayah ? `&ayah=${ayah}` : ""}`;
      }
      case "umrah":
        return `/umrah?chapter=${item.section_id}`;
      case "hajj":
        return `/hajj?section=${item.section_id}`;
      default:
        return "/";
    }
  };

  const getLastReadingText = (item: ReadingHistory) => {
    const progressEntry = getProgressEntry(item);
    switch (item.content_type) {
      case "quran": {
        const ayah = progressEntry?.position ? Number(progressEntry.position) : null;
        return `Surah ${item.section_id}${ayah ? `, Ayah ${ayah}` : ""}`;
      }
      case "umrah":
        return `Chapter ${item.section_id}`;
      case "hajj":
        return `Section ${item.section_id}`;
      default:
        return item.section_title || item.section_id;
    }
  };

  const getProgressPercent = (item: ReadingHistory) => {
    if (!item.content_type) return null;

    const progressEntry = progress.find((p) => p.content_type === item.content_type && p.section_id === item.section_id);

    if (item.content_type === "quran") {
      const versesCount = chapterVerseCounts[Number(item.section_id)];
      const position = progressEntry?.position ? Number(progressEntry.position) : null;
      if (!versesCount || !position) return null;
      return Math.min(100, Math.round((position / versesCount) * 100));
    }

    if (item.content_type === "umrah") {
      const total = 17; // total Umrah sections
      const current = Number(progressEntry?.section_id ?? item.section_id);
      if (!Number.isFinite(current) || total === 0) return null;
      return Math.min(100, Math.round((current / total) * 100));
    }

    if (item.content_type === "hajj") {
      const total = 19; // total Hajj sections
      const current = Number(progressEntry?.section_id ?? item.section_id);
      if (!Number.isFinite(current) || total === 0) return null;
      return Math.min(100, Math.round((current / total) * 100));
    }

    return null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your journey...</p>
        </div>
      </div>
    );
  }

  const quranProgress = progress.find((p) => p.content_type === "quran");
  const umrahProgress = progress.find((p) => p.content_type === "umrah");
  const hajjProgress = progress.find((p) => p.content_type === "hajj");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              As-salamu alaykum, {profile?.display_name || user?.email?.split("@")[0]}
            </h1>
            <p className="text-muted-foreground">
              Welcome back to your spiritual journey. Continue where you left off.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link to="/quran" className="nav-card group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Continue Quran</h3>
                  {quranProgress ? (
                    <p className="text-sm text-muted-foreground">
                      Surah {quranProgress.section_id}, Ayah {quranProgress.position || "1"}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Start reading</p>
                  )}
                </div>
              </div>
            </Link>

            <Link to="/umrah" className="nav-card group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Compass className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Umrah Guide</h3>
                  {umrahProgress ? (
                    <p className="text-sm text-muted-foreground">
                      Chapter: {umrahProgress.section_id}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Begin learning</p>
                  )}
                </div>
              </div>
            </Link>

            <Link to="/hajj" className="nav-card group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Moon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Hajj Guide</h3>
                  {hajjProgress ? (
                    <p className="text-sm text-muted-foreground">
                      Section: {hajjProgress.section_id}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Start preparation</p>
                  )}
                </div>
              </div>
            </Link>
          </div>

          {/* Visitor Traffic Summary */}
          <div className="mb-12">
            <div className="nav-card bg-[#0e1b3d] border-[#1f3a7d] shadow-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-display font-bold text-[#e8f0ff]">Visitor Traffic</h2>
                <p className="text-sm text-[#cbd5f8]">Last updated just now</p>
              </div>

              <div className="h-28 mb-4 bg-[#12214a] rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_25%,rgba(38,205,152,0.28),transparent 50%),radial-gradient(circle_at_70%_50%,rgba(34,211,238,0.22),transparent 55%)]" />
                <svg viewBox="0 0 240 80" className="absolute inset-0 w-full h-full">
                  <path d="M0,58 L34,48 L71,52 L108,42 L146,46 L182,36 L218,39 L240,34" fill="none" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="0" cy="58" r="3" fill="#22d3ee" />
                  <circle cx="34" cy="48" r="3" fill="#22d3ee" />
                  <circle cx="71" cy="52" r="3" fill="#22d3ee" />
                  <circle cx="108" cy="42" r="3" fill="#22d3ee" />
                  <circle cx="146" cy="46" r="3" fill="#22d3ee" />
                  <circle cx="182" cy="36" r="3" fill="#22d3ee" />
                  <circle cx="218" cy="39" r="3" fill="#22d3ee" />
                </svg>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="visitor-card">
                  <p className="text-xs text-slate-400">Today</p>
                  <p className="text-2xl font-bold text-primary">{visitorStats.today}</p>
                </div>
                <div className="visitor-card">
                  <p className="text-xs text-slate-400">Yesterday</p>
                  <p className="text-2xl font-bold text-primary">{visitorStats.yesterday}</p>
                </div>
                <div className="visitor-card">
                  <p className="text-xs text-slate-400">This week</p>
                  <p className="text-2xl font-bold text-primary">{visitorStats.week}</p>
                </div>
                <div className="visitor-card">
                  <p className="text-xs text-slate-400">Last week</p>
                  <p className="text-2xl font-bold text-primary">{visitorStats.lastWeek}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
