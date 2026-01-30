import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation?: string;
}

const Quran = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingSurahs, setLoadingSurahs] = useState(true);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    fetchSurahs();
  }, []);

  useEffect(() => {
    if (selectedSurah && user) {
      saveProgress();
    }
  }, [selectedSurah, user]);

  const fetchSurahs = async () => {
    try {
      const response = await fetch("https://api.alquran.cloud/v1/surah");
      const data = await response.json();
      if (data.code === 200) {
        setSurahs(data.data);
      }
    } catch (error) {
      console.error("Error fetching surahs:", error);
      toast({
        title: "Error",
        description: "Failed to load Quran data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingSurahs(false);
    }
  };

  const fetchSurahContent = async (surahNumber: number) => {
    setLoadingAyahs(true);
    try {
      // Fetch Arabic text
      const arabicResponse = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}`
      );
      const arabicData = await arabicResponse.json();

      // Fetch English translation
      const translationResponse = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`
      );
      const translationData = await translationResponse.json();

      if (arabicData.code === 200 && translationData.code === 200) {
        const combinedAyahs = arabicData.data.ayahs.map((ayah: any, index: number) => ({
          number: ayah.number,
          numberInSurah: ayah.numberInSurah,
          text: ayah.text,
          translation: translationData.data.ayahs[index]?.text || "",
        }));
        setAyahs(combinedAyahs);
      }
    } catch (error) {
      console.error("Error fetching surah content:", error);
      toast({
        title: "Error",
        description: "Failed to load surah. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingAyahs(false);
    }
  };

  const handleSurahSelect = (surah: Surah) => {
    setSelectedSurah(surah);
    fetchSurahContent(surah.number);
  };

  const saveProgress = async () => {
    if (!user || !selectedSurah) return;

    try {
      await supabase.from("reading_progress").upsert({
        user_id: user.id,
        content_type: "quran",
        section_id: selectedSurah.number.toString(),
        position: "1",
        last_read_at: new Date().toISOString(),
      }, {
        onConflict: "user_id,content_type,section_id",
      });

      await supabase.from("reading_history").insert({
        user_id: user.id,
        content_type: "quran",
        section_id: selectedSurah.number.toString(),
        section_title: `${selectedSurah.englishName} (${selectedSurah.name})`,
      });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.name.includes(searchTerm) ||
      surah.number.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 pt-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Read the Holy Quran
            </h1>
            <p className="text-muted-foreground">
              Read and contemplate the words of Allah
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Surah List */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-4 sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold">Surahs</h3>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search surah..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-background"
                  />
                </div>

                <ScrollArea className="h-[500px]">
                  {loadingSurahs ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {filteredSurahs.map((surah) => (
                        <button
                          key={surah.number}
                          onClick={() => handleSurahSelect(surah)}
                          className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                            selectedSurah?.number === surah.number
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-accent"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center text-sm font-medium">
                                {surah.number}
                              </span>
                              <div>
                                <p className="font-medium text-sm">{surah.englishName}</p>
                                <p className="text-xs opacity-75">{surah.englishNameTranslation}</p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 opacity-50" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>

            {/* Reading Area */}
            <div className="lg:col-span-3">
              {selectedSurah ? (
                <div className="reading-panel">
                  {/* Surah Header */}
                  <div className="text-center mb-8 pb-6 border-b border-border">
                    <h2 className="text-3xl font-display font-bold text-primary arabic-text mb-2">
                      {selectedSurah.name}
                    </h2>
                    <p className="text-xl font-display text-foreground mb-1">
                      {selectedSurah.englishName}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {selectedSurah.englishNameTranslation} • {selectedSurah.numberOfAyahs} Ayahs • {selectedSurah.revelationType}
                    </p>

                    {/* Translation Toggle */}
                    <div className="mt-4">
                      <Button
                        variant={showTranslation ? "default" : "outline"}
                        size="sm"
                        onClick={() => setShowTranslation(!showTranslation)}
                        className="glow-hover"
                      >
                        {showTranslation ? "Hide Translation" : "Show Translation"}
                      </Button>
                    </div>
                  </div>

                  {/* Bismillah */}
                  {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
                    <div className="text-center mb-8">
                      <p className="text-2xl font-display text-primary arabic-text">
                        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                      </p>
                      {showTranslation && (
                        <p className="text-sm text-muted-foreground mt-2">
                          In the name of Allah, the Most Gracious, the Most Merciful
                        </p>
                      )}
                    </div>
                  )}

                  {/* Ayahs */}
                  {loadingAyahs ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {ayahs.map((ayah) => (
                        <div key={ayah.number} className="group">
                          <div className="flex gap-4">
                            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                              {ayah.numberInSurah}
                            </span>
                            <div className="flex-1">
                              <p className="text-xl font-display leading-loose arabic-text text-foreground mb-2">
                                {ayah.text}
                              </p>
                              {showTranslation && ayah.translation && (
                                <p className="text-muted-foreground leading-relaxed">
                                  {ayah.translation}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="reading-panel text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    Select a Surah
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a surah from the list to begin reading
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quran;
