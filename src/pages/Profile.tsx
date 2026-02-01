import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Linkedin } from "lucide-react";

const profiles: Record<string, { url: string; display?: string }> = {
  "abdus-salam-mohammad-212468234": {
    url: "https://www.linkedin.com/in/abdus-salam-mohammad-212468234/",
    display: "Abdus Salam",
  },
  "syedtajuddin7": {
    url: "https://www.linkedin.com/in/syedtajuddin7/",
    display: "Syed Tajuddin",
  },
};

const Profile = () => {
  const { username } = useParams();
  const profile = username ? profiles[username] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center py-24">
              <h2 className="text-2xl font-semibold">Profile not found</h2>
              <p className="text-muted-foreground mt-4">The requested profile could not be located.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Linkedin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">{profile.display ?? username}</h1>
                <p className="text-sm text-muted-foreground">LinkedIn profile</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              You can open the LinkedIn profile in a new tab by clicking the button below.
            </p>

            <div className="flex items-center justify-center gap-4">
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Open on LinkedIn
              </a>

              <a
                href={profile.url}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border text-muted-foreground hover:text-primary transition-colors"
              >
                View URL
              </a>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Note: external profile opens in LinkedIn. If you want the profile embedded here, we can add an iframe view (may be blocked by LinkedIn).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
