import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                In Loving Memory
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </div>

            {/* Content */}
            <div className="reading-panel">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-foreground leading-relaxed mb-6 font-display text-center">
                  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  This application is dedicated to the memory of my beloved grandfather, 
                  whose unwavering faith and gentle guidance continue to inspire me every day.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  He was a man of deep devotion, spending countless hours in prayer and 
                  contemplation of the Holy Quran. His life was a testament to the values 
                  of patience, kindness, and steadfast belief in Allah's wisdom.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Through his example, he taught me that true wealth lies not in material 
                  possessions, but in the richness of one's faith and the love shared with 
                  family and community.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  NoorPath was created in his honor—a digital companion for those seeking 
                  to deepen their understanding of Islamic practices, particularly Umrah, 
                  Hajj, and Quran reading. May this platform serve as a sadaqah jariyah 
                  (ongoing charity) in his name.
                </p>

                <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 bg-accent/30 rounded-r-lg">
                  <p className="font-display text-xl text-foreground italic">
                    "Whoever builds a mosque for Allah, Allah will build for him a house in Paradise."
                  </p>
                  <footer className="mt-2 text-primary">— Prophet Muhammad ﷺ</footer>
                </blockquote>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  In the same spirit, we hope this digital mosque of knowledge will be a 
                  source of guidance for Muslims around the world, helping them on their 
                  spiritual journey toward Allah.
                </p>

                <div className="text-center mt-12 pt-8 border-t border-border">
                  <p className="font-display text-xl text-primary mb-2">
                    إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                  </p>
                  <p className="text-sm text-muted-foreground">
                    "Indeed we belong to Allah, and indeed to Him we will return."
                  </p>
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

export default About;
