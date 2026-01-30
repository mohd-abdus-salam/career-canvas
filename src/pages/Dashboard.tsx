import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Compass, Moon, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      await fetchUserData(session.user.id);
    };

    checkAuth();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      
      if (profileData) {
        setProfile(profileData);
      }

      const { data: progressData } = await supabase
        .from("reading_progress")
        .select("*")
        .eq("user_id", userId)
        .order("last_read_at", { ascending: false });

      if (progressData) {
        setProgress(progressData);
      }

      const { data: historyData } = await supabase
        .from("reading_history")
        .select("*")
        .eq("user_id", userId)
        .order("visited_at", { ascending: false })
        .limit(10);

      if (historyData) {
        setHistory(historyData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const getContentLink = (type: string, sectionId: string) => {
    switch (type) {
      case "quran":
        return `/quran?surah=${sectionId}`;
      case "umrah":
        return `/umrah?chapter=${sectionId}`;
      case "hajj":
        return `/hajj?section=${sectionId}`;
      default:
        return "/";
    }
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

          {/* Reading History */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((item) => (
                    <Link
                      key={item.id}
                      to={getContentLink(item.content_type, item.section_id)}
                      className="flex items-center justify-between p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {getContentIcon(item.content_type)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground capitalize">
                            {item.content_type}: {item.section_title || item.section_id}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(item.visited_at)}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No reading history yet. Start your spiritual journey!
                  </p>
                  <Link to="/quran">
                    <Button className="glow-hover">
                      Start Reading
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
