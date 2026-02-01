import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main
        className="pt-24 pb-16"
        style={{
          backgroundImage: "url('/about.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 bg-black/30 backdrop-blur-sm rounded-xl py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
                Expression of Gratitude
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </div>

            {/* Content */}
            <div className="reading-panel">
              <div className="prose prose-xl max-w-none">
                <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 font-display text-center">
                  بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                </p>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  It is thanks to Almighty Allah that I express my gratitude to the Lord of the Worlds. 
                  Many, many thanks to Allah's kindness and benevolence that has given me an opportunity 
                  to perform HAJJ. Based on this blessed experience, Almighty Allah has bestowed upon me the 
                  ability to write and publish this booklet for the guidance of prospective HAJIS.
                </p>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  It is my humble effort in the way of Allah, and I pray that Allah accepts this as a means 
                  of reward and gratification. Aameen.
                </p>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  My parents requested that all HAJIS, before reading this booklet, should also read books 
                  which cover the topics of the pilgrimage exhaustively.
                </p>

                <div className="bg-accent/30 rounded-xl p-6 md:p-8 my-10">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-4">
                    Acknowledgement of Translation
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    The English translation of this booklet was completed with the sincere efforts of my father, 
                    <span className="highlight-name"> M.A. Moiz</span>, and my uncle, 
                    <span className="highlight-name"> M.A. Haq</span>, whose dedication and devotion made it possible 
                    to present this work to a wider audience. Their contribution in translating and refining the 
                    content is deeply appreciated and will always remain a source of pride for our family.
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-6 md:p-8 my-10">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-4">
                    Publication History
                  </h3>
                  <ul className="space-y-3 text-lg text-muted-foreground">
                    <li><strong>1st Edition:</strong> 2000 – <span className="highlight-name">M.A. Shakoor</span></li>
                    <li><strong>2nd Edition (Urdu/English):</strong> 2009 – Completed</li>
                    <li><strong>3rd Edition (Urdu/English):</strong> 2013 – Near complete</li>
                  </ul>
                </div>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  The original work was done in Urdu, and the English translation could not be published 
                  before the remaining work was completed. Unfortunately, he passed away on 25-01-2007.
                </p>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  After the 2nd edition was published, the response from pilgrims was overwhelming. 
                  The third edition is now published with necessary revisions in Urdu and English.
                </p>

                <blockquote className="border-l-4 border-primary pl-6 py-4 my-10 bg-accent/30 rounded-r-lg">
                  <p className="font-display text-xl md:text-2xl text-foreground italic">
                    "Whoever builds a mosque for Allah, Allah will build for him a house in Paradise."
                  </p>
                  <footer className="mt-3 text-lg text-primary">— Prophet Muhammad ﷺ</footer>
                </blockquote>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  In the same spirit, we hope this digital mosque of knowledge will be a source of 
                  guidance for Muslims around the world, helping them on their spiritual journey toward Allah.
                </p>

                <div className="bg-card border border-border rounded-xl p-6 md:p-8 my-10">
                  <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-4">
                    In Loving Memory
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2">
                    <strong>Late <span className="highlight-name">M. A. SHAKOOR</span></strong>
                  </p>
                  <p className="text-muted-foreground">
                    Audit Officer (Retd), A.G.'s Office, Hyderabad
                  </p>
                </div>

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-center italic">
                  Request for Dua - Sons of M.A. Shakoor
                </p>

                <div className="text-center mt-12 pt-8 border-t border-border">
                  <p className="font-display text-2xl md:text-3xl text-primary mb-3">
                    إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                  </p>
                  <p className="text-lg text-muted-foreground">
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
