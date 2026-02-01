import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display text-xl">☪</span>
              </div>
              <span className="text-xl font-display font-bold text-foreground">
                NoorPath
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Your spiritual companion for Umrah, Hajj, and Quran guidance. 
              Illuminating the path to a deeper connection with faith.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/umrah" className="text-muted-foreground hover:text-primary transition-colors">
                  Umrah Guide
                </Link>
              </li>
              <li>
                <Link to="/hajj" className="text-muted-foreground hover:text-primary transition-colors">
                  Hajj Guide
                </Link>
              </li>
              <li>
                <Link to="/quran" className="text-muted-foreground hover:text-primary transition-colors">
                  Read Quran
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/abdus-salam-mohammad-212468234/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-hover"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <Link to="/profile/abdus-salam-mohammad-212468234" className="text-sm text-muted-foreground hover:text-primary">
                  Abdus Salam
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/syedtajuddin7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-hover"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <Link to="/profile/syedtajuddin7" className="text-sm text-muted-foreground hover:text-primary">
                  Syed Tajuddin
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} NoorPath. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
