import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Target, Users, Rocket, Heart, Send, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every resume we generate is precisely tailored to match job requirements with surgical accuracy.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "We believe everyone deserves access to powerful career tools, regardless of their background.",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "We leverage cutting-edge AI to stay ahead and provide the best resume tailoring experience.",
  },
  {
    icon: Heart,
    title: "Empathy",
    description: "We understand the stress of job hunting and design our tools to make it easier.",
  },
];

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/30 mb-6">
                <Zap className="w-4 h-4 text-secondary" />
                <span className="text-sm text-muted-foreground">Our Story</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                About <span className="gradient-text">CVGenix</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We're on a mission to help job seekers land their dream jobs by making professional resume tailoring accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-display font-bold mb-6">
                    Our <span className="gradient-text">Mission</span>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Job hunting is hard enough without having to spend hours tailoring your resume for each application. We built CVGenix to change that.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Our AI-powered platform analyzes job descriptions and automatically generates perfectly tailored resumes that highlight your relevant experience and skills.
                  </p>
                  <p className="text-muted-foreground">
                    We believe that finding a job should be about showcasing your potential, not fighting with formatting tools. CVGenix handles the technical work so you can focus on what matters – preparing for your dream role.
                  </p>
                </div>
                <div className="glass-card rounded-xl p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-display font-bold">50K+</div>
                        <div className="text-sm text-muted-foreground">Resumes Generated</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                        <Users className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <div className="text-2xl font-display font-bold">10K+</div>
                        <div className="text-sm text-muted-foreground">Happy Users</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-display font-bold">89%</div>
                        <div className="text-sm text-muted-foreground">Interview Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-center mb-12">
                Our <span className="gradient-text">Values</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div
                    key={value.title}
                    className="glass-card rounded-xl p-6 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold mb-4">
                  Get In <span className="gradient-text">Touch</span>
                </h2>
                <p className="text-muted-foreground">
                  Have questions or feedback? We'd love to hear from you.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    rows={5}
                    required
                    className="bg-card border-border"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
