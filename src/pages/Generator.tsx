import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Upload,
  Wand2,
  Download,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface GenerationResult {
  generatedResume: string;
  skillMatchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  jobTitle: string;
  companyName: string;
}

const Generator = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGenerate = async () => {
    if (!jobDescription.trim() || !resumeText.trim()) {
      toast({
        title: "Missing input",
        description: "Please provide both a job description and your resume.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-resume", {
        body: {
          jobDescription,
          resumeText,
        },
      });

      if (error) {
        if (error.message?.includes("429")) {
          toast({
            title: "Rate limit exceeded",
            description: "Please try again in a few moments.",
            variant: "destructive",
          });
        } else if (error.message?.includes("402")) {
          toast({
            title: "Usage limit reached",
            description: "Please add credits to continue using the service.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      setResult(data);

      // Save to history
      await supabase.from("resume_generations").insert({
        user_id: user.id,
        job_title: data.jobTitle || "Untitled Position",
        company_name: data.companyName,
        job_description: jobDescription,
        original_resume_text: resumeText,
        generated_resume: data.generatedResume,
        skill_match_score: data.skillMatchScore,
        matched_skills: data.matchedSkills,
        missing_skills: data.missingSkills,
      });

      toast({
        title: "Resume generated!",
        description: "Your tailored resume is ready.",
      });
    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    
    const blob = new Blob([result.generatedResume], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tailored-resume-${result.jobTitle?.replace(/\s+/g, "-") || "resume"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Your resume has been downloaded.",
    });
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
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Resume <span className="gradient-text">Generator</span>
            </h1>
            <p className="text-muted-foreground">
              Paste the job description and your resume to generate a perfectly tailored version.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div className="space-y-6">
                {/* Job Description */}
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">Job Description</h3>
                      <p className="text-sm text-muted-foreground">Paste the job posting</p>
                    </div>
                  </div>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here... Include requirements, responsibilities, and qualifications."
                    rows={10}
                    className="bg-card border-border resize-none"
                  />
                </div>

                {/* Resume Input */}
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">Your Resume</h3>
                      <p className="text-sm text-muted-foreground">Paste your resume content</p>
                    </div>
                  </div>
                  <Textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your current resume content here... Include your experience, skills, education, and achievements."
                    rows={10}
                    className="bg-card border-border resize-none"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !jobDescription.trim() || !resumeText.trim()}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2 py-6 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Tailored Resume
                    </>
                  )}
                </Button>
              </div>

              {/* Output Section */}
              <div className="space-y-6">
                {result ? (
                  <>
                    {/* Score Card */}
                    <div className="glass-card rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold">Skill Match Score</h3>
                        <span className="text-3xl font-display font-bold gradient-text">
                          {result.skillMatchScore}%
                        </span>
                      </div>
                      <Progress value={result.skillMatchScore} className="h-3 mb-4" />
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium">Matched Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {result.matchedSkills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">Skills to Highlight</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {result.missingSkills.map((skill, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Generated Resume */}
                    <div className="glass-card rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-semibold">Generated Resume</h3>
                        <Button
                          onClick={handleDownload}
                          size="sm"
                          variant="outline"
                          className="gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                      <div className="bg-card rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm font-mono text-foreground">
                          {result.generatedResume}
                        </pre>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="glass-card rounded-xl p-12 text-center">
                    <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mx-auto mb-6">
                      <Wand2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">
                      Ready to Generate
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Fill in the job description and your resume, then click generate to create your tailored resume.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Generator;
