import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Plus,
  Trash2,
  Loader2,
  Clock,
  Target,
  Download,
} from "lucide-react";
import { format } from "date-fns";

interface ResumeGeneration {
  id: string;
  job_title: string;
  company_name: string | null;
  skill_match_score: number | null;
  created_at: string;
  generated_resume: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generations, setGenerations] = useState<ResumeGeneration[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchGenerations();
    }
  }, [user]);

  const fetchGenerations = async () => {
    try {
      const { data, error } = await supabase
        .from("resume_generations")
        .select("id, job_title, company_name, skill_match_score, created_at, generated_resume")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGenerations(data || []);
    } catch (error: any) {
      console.error("Error fetching generations:", error);
      toast({
        title: "Error",
        description: "Failed to load your resume history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const { error } = await supabase
        .from("resume_generations")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setGenerations(generations.filter((g) => g.id !== id));
      toast({
        title: "Deleted",
        description: "Resume removed from history.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete resume.",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  const handleDownload = (gen: ResumeGeneration) => {
    const blob = new Blob([gen.generated_resume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${gen.job_title.replace(/\s+/g, "-")}-resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">
                Your <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-muted-foreground">
                View and manage your generated resumes
              </p>
            </div>
            <Link to="/generator">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2">
                <Plus className="w-4 h-4" />
                New Resume
              </Button>
            </Link>
          </div>

          {/* Generations List */}
          {generations.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                No Resumes Yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Generate your first tailored resume to see it here.
              </p>
              <Link to="/generator">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2">
                  <Plus className="w-4 h-4" />
                  Generate Resume
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {generations.map((gen) => (
                <div
                  key={gen.id}
                  className="glass-card rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">{gen.job_title}</h3>
                      {gen.company_name && (
                        <p className="text-sm text-muted-foreground">{gen.company_name}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {format(new Date(gen.created_at), "MMM d, yyyy")}
                        </div>
                        {gen.skill_match_score && (
                          <div className="flex items-center gap-1 text-sm">
                            <Target className="w-3 h-3 text-primary" />
                            <span className="text-primary font-medium">
                              {gen.skill_match_score}% match
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(gen)}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(gen.id)}
                      disabled={deleting === gen.id}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      {deleting === gen.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
