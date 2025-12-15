import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Upload, Wand2, Download, ArrowRight, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Paste Job Description",
    description: "Copy the job posting from LinkedIn, Indeed, or any company website. Paste the full description or just the key requirements.",
    details: [
      "Works with any job posting format",
      "AI extracts required skills automatically",
      "Identifies must-have vs nice-to-have skills",
    ],
  },
  {
    number: "02",
    icon: Upload,
    title: "Upload Your Resume",
    description: "Upload your current resume in PDF format. Our AI will analyze your experience, skills, and achievements.",
    details: [
      "Supports PDF format",
      "Extracts all relevant information",
      "Identifies your key strengths",
    ],
  },
  {
    number: "03",
    icon: Wand2,
    title: "AI Tailoring Magic",
    description: "Our AI compares your resume with the job requirements and generates a perfectly tailored version highlighting your match.",
    details: [
      "Skill gap analysis",
      "Keyword optimization for ATS",
      "Experience rewriting to match job",
    ],
  },
  {
    number: "04",
    icon: Download,
    title: "Download & Apply",
    description: "Get your tailored resume instantly. Download as PDF and submit your application with confidence.",
    details: [
      "Professional formatting",
      "ATS-optimized structure",
      "Ready to submit",
    ],
  },
];

const faqs = [
  {
    question: "How does CVGenix tailor my resume?",
    answer: "CVGenix uses advanced AI to analyze both the job description and your resume. It identifies key requirements, matches them with your experience, and rewrites your resume content to highlight relevant skills and achievements that align with what employers are looking for.",
  },
  {
    question: "Is my resume data secure?",
    answer: "Absolutely. We use industry-standard encryption and never share your data with third parties. Your resumes are stored securely in your account and you can delete them at any time.",
  },
  {
    question: "What makes CVGenix different from other resume builders?",
    answer: "Unlike generic resume builders, CVGenix creates a unique, tailored resume for each job application. Our AI understands context and rewrites your experience to match specific job requirements, giving you the best chance of passing ATS systems and impressing recruiters.",
  },
  {
    question: "Can I use CVGenix for multiple job applications?",
    answer: "Yes! That's exactly what CVGenix is designed for. Generate a new tailored resume for each job application to maximize your chances. All your generated resumes are saved in your history for easy access.",
  },
  {
    question: "What file formats are supported?",
    answer: "Currently, you can upload resumes in PDF format. The generated tailored resumes are also provided as PDF files, which is the most widely accepted format by employers and ATS systems.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                How <span className="gradient-text">CVGenix</span> Works
              </h1>
              <p className="text-lg text-muted-foreground">
                Four simple steps to transform your resume and land more interviews. Our AI does the heavy lifting so you can focus on preparing for your dream job.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative flex gap-6 pb-16 last:pb-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary to-secondary" />
                  )}
                  
                  {/* Step Number */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="text-sm text-primary font-mono mb-1">Step {step.number}</div>
                    <h3 className="text-2xl font-display font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <div className="glass-card rounded-lg p-4">
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-8">
                Generate your first tailored resume in under a minute.
              </p>
              <Link to="/generator">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2">
                  Start Generating
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="glass-card rounded-lg px-6 border-none"
                  >
                    <AccordionTrigger className="text-left font-display hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
