import { FileSearch, Wand2, Download, History, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Smart Job Analysis",
    description: "Paste any job URL or description. Our AI extracts key requirements, skills, and qualifications instantly.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Wand2,
    title: "AI Resume Tailoring",
    description: "Automatically rewrite your experience to match job requirements using powerful language models.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Download,
    title: "Instant PDF Export",
    description: "Download your tailored resume as a professionally formatted PDF ready to submit.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: History,
    title: "Resume History",
    description: "Access all your generated resumes anytime. Never lose a tailored application again.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Shield,
    title: "ATS-Optimized",
    description: "Every resume passes Applicant Tracking Systems with keyword-rich, properly formatted content.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate a complete tailored resume in under 30 seconds. Apply to more jobs, faster.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

const Features = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Everything You Need to
            <span className="gradient-text"> Land Your Dream Job</span>
          </h2>
          <p className="text-muted-foreground">
            Powerful features designed to give you an unfair advantage in your job search.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl glass-card hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
