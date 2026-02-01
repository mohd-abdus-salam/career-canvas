import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Compass, Moon, BarChart3 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 islamic-pattern" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Bismillah */}
          <div className="mb-8 animate-fade-in">
            <p className="text-2xl md:text-3xl font-display text-primary arabic-text">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>

          {/* Headline */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fade-in text-foreground" 
            style={{ animationDelay: "0.1s" }}
          >
            Illuminate Your
            <span className="block gradient-text">Spiritual Journey</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" 
            style={{ animationDelay: "0.2s" }}
          >
            Your complete guide to Umrah, Hajj, and Quran reading. 
            Experience a calm, focused environment designed for spiritual growth and learning.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" 
            style={{ animationDelay: "0.3s" }}
          >
            <Link to="/auth?mode=signup">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 glow-hover bg-primary hover:bg-primary/90">
                Begin Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 glow-hover">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Navigation Cards */}
          <div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in" 
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/umrah" className="nav-card group">
              <Compass className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Umrah Guide</h3>
              <p className="text-muted-foreground text-sm">
                Step-by-step guidance for performing Umrah with translations.
              </p>
            </Link>

            <Link to="/hajj" className="nav-card group">
              <Moon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Hajj Guide</h3>
              <p className="text-muted-foreground text-sm">
                Complete Hajj instructions with multi-language support.
              </p>
            </Link>

            <Link to="/quran" className="nav-card group">
              <BookOpen className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Read Quran</h3>
              <p className="text-muted-foreground text-sm">
                Read the Holy Quran and track your reading progress.
              </p>
            </Link>

            <div className="nav-card group flex flex-col">
              <BarChart3 className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">Tracking</h3>
              <p className="text-muted-foreground text-sm flex-1">
                Keep track of your daily reading and spiritual progress.
              </p>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Link to="/auth?mode=signup" className="w-full">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/auth" className="w-full">
                  <Button size="sm" variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Small image gallery below */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <img src="/home%20page.jpg" alt="Kaaba crowd" className="w-full h-64 object-cover rounded-lg shadow-lg" />
            <img src="/umrah.jpg" alt="View of Kaaba" className="w-full h-64 object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
