import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TranslationPanel from "@/components/reading/TranslationPanel";
import ChapterList from "@/components/reading/ChapterList";
import ReadingContent from "@/components/reading/ReadingContent";
import { supabase } from "@/integrations/supabase/client";

// Umrah chapters content
const umrahChapters = [
  {
    id: "ihram",
    title: "Ihram",
    arabicTitle: "الإحرام",
    content: `
      <h2>What is Ihram?</h2>
      <p>Ihram is the sacred state a Muslim must enter before performing the Umrah pilgrimage. It involves wearing specific garments and making a sincere intention (niyyah) to perform Umrah.</p>
      
      <h3>For Men</h3>
      <p>Men wear two white, unstitched cloths:</p>
      <ul>
        <li><strong>Izar</strong> - The lower garment wrapped around the waist</li>
        <li><strong>Rida</strong> - The upper garment covering the shoulders</li>
      </ul>
      
      <h3>For Women</h3>
      <p>Women may wear any modest clothing that covers the body, but the face and hands should remain uncovered during Ihram.</p>
      
      <h3>Making the Intention</h3>
      <p>Before entering the state of Ihram, one should:</p>
      <ol>
        <li>Perform ghusl (full body purification)</li>
        <li>Apply perfume (for men only, before Ihram)</li>
        <li>Pray two rak'ahs of Sunnah prayer</li>
        <li>Make the intention by saying: "Labbayk Allahumma 'Umrah" (Here I am O Allah, for Umrah)</li>
      </ol>
      
      <h3>The Talbiyah</h3>
      <p>After entering Ihram, pilgrims recite the Talbiyah:</p>
      <blockquote>
        لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ
      </blockquote>
      <p>"Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and sovereignty belong to You. You have no partner."</p>
    `,
  },
  {
    id: "tawaf",
    title: "Tawaf",
    arabicTitle: "الطواف",
    content: `
      <h2>What is Tawaf?</h2>
      <p>Tawaf is the ritual of circumambulating (walking around) the Kaaba seven times in an anti-clockwise direction. It is one of the essential pillars of Umrah.</p>
      
      <h3>Preparation</h3>
      <ul>
        <li>Enter Masjid al-Haram with your right foot, reciting the dua for entering a mosque</li>
        <li>Proceed towards the Kaaba with humility and reverence</li>
        <li>Men should perform Idtiba (exposing the right shoulder)</li>
      </ul>
      
      <h3>Starting Tawaf</h3>
      <p>Begin at the Black Stone (Hajar al-Aswad):</p>
      <ol>
        <li>Face the Black Stone and make intention for Tawaf</li>
        <li>If possible, kiss or touch the Black Stone</li>
        <li>If crowded, point towards it and say "Bismillah, Allahu Akbar"</li>
      </ol>
      
      <h3>During Tawaf</h3>
      <p>While performing Tawaf:</p>
      <ul>
        <li>Keep the Kaaba on your left side</li>
        <li>Perform Raml (walking briskly) in the first three circuits (for men)</li>
        <li>Make dua and dhikr throughout</li>
        <li>Between the Yemeni Corner and Black Stone, recite: "Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah waqina adhab an-nar"</li>
      </ul>
      
      <h3>Completing Tawaf</h3>
      <p>After seven circuits:</p>
      <ol>
        <li>Pray two rak'ahs behind Maqam Ibrahim (if possible)</li>
        <li>Drink Zamzam water</li>
        <li>Make dua at the Multazam (if possible)</li>
      </ol>
    `,
  },
  {
    id: "sai",
    title: "Sa'i",
    arabicTitle: "السعي",
    content: `
      <h2>What is Sa'i?</h2>
      <p>Sa'i is the ritual of walking seven times between the hills of Safa and Marwa. It commemorates Hajar's search for water for her son Ismail.</p>
      
      <h3>Beginning at Safa</h3>
      <p>Proceed to Mount Safa and recite:</p>
      <blockquote>
        إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ
      </blockquote>
      <p>"Indeed, Safa and Marwa are among the symbols of Allah." (Quran 2:158)</p>
      
      <p>Then say: "I begin with what Allah began with."</p>
      
      <h3>The Walk</h3>
      <ul>
        <li>Face the Kaaba from Safa and make dua</li>
        <li>Walk towards Marwa</li>
        <li>Men should run between the green lights</li>
        <li>Make dua and dhikr throughout</li>
        <li>Upon reaching Marwa, face the Kaaba and make dua</li>
      </ul>
      
      <h3>Counting the Laps</h3>
      <p>The seven laps are counted as follows:</p>
      <ol>
        <li>Safa to Marwa = 1st lap</li>
        <li>Marwa to Safa = 2nd lap</li>
        <li>Continue until you end at Marwa (7th lap)</li>
      </ol>
      
      <h3>Recommended Duas</h3>
      <p>There are no specific duas required, but you may:</p>
      <ul>
        <li>Recite Quran</li>
        <li>Make personal supplications</li>
        <li>Seek forgiveness</li>
        <li>Ask for your needs</li>
      </ul>
    `,
  },
  {
    id: "halq",
    title: "Halq / Taqsir",
    arabicTitle: "الحلق والتقصير",
    content: `
      <h2>What is Halq/Taqsir?</h2>
      <p>The final rite of Umrah is cutting the hair. Men have the option of Halq (shaving the entire head) or Taqsir (shortening the hair). Women only perform Taqsir.</p>
      
      <h3>For Men - Halq</h3>
      <p>Shaving the entire head is the preferred option and brings greater reward:</p>
      <ul>
        <li>The Prophet ﷺ made dua three times for those who shave and once for those who trim</li>
        <li>Hair should be shaved completely</li>
        <li>Can be done anywhere after completing Sa'i</li>
      </ul>
      
      <h3>For Men - Taqsir</h3>
      <p>If choosing to trim:</p>
      <ul>
        <li>Hair should be cut from all parts of the head</li>
        <li>At least the length of a fingertip should be cut</li>
      </ul>
      
      <h3>For Women</h3>
      <p>Women must only trim their hair:</p>
      <ul>
        <li>Cut approximately one inch from the ends</li>
        <li>Hair from all parts should be trimmed</li>
        <li>Can be done privately</li>
      </ul>
      
      <h3>Exiting Ihram</h3>
      <p>After Halq or Taqsir:</p>
      <ul>
        <li>You exit the state of Ihram</li>
        <li>All restrictions of Ihram are now lifted</li>
        <li>Your Umrah is complete, Alhamdulillah!</li>
      </ul>
      
      <h3>Dua Upon Completion</h3>
      <p>Thank Allah for enabling you to complete Umrah and ask Him to accept it from you:</p>
      <blockquote>
        اللَّهُمَّ تَقَبَّلْ مِنِّي وَاجْعَلْهُ عُمْرَةً مَبْرُورَةً
      </blockquote>
      <p>"O Allah, accept this from me and make it an accepted Umrah."</p>
    `,
  },
];

const Umrah = () => {
  const [selectedChapter, setSelectedChapter] = useState(umrahChapters[0]);
  const [translatedContent, setTranslatedContent] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  useEffect(() => {
    // Save reading progress
    if (user) {
      saveProgress();
    }
  }, [selectedChapter, user]);

  const saveProgress = async () => {
    if (!user) return;

    try {
      // Upsert progress
      await supabase.from("reading_progress").upsert({
        user_id: user.id,
        content_type: "umrah",
        section_id: selectedChapter.id,
        last_read_at: new Date().toISOString(),
      }, {
        onConflict: "user_id,content_type,section_id",
      });

      // Add to history
      await supabase.from("reading_history").insert({
        user_id: user.id,
        content_type: "umrah",
        section_id: selectedChapter.id,
        section_title: selectedChapter.title,
      });
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const handleTranslate = async (language: string) => {
    if (language === "en") {
      setTranslatedContent("");
      setSelectedLanguage("en");
      return;
    }

    setIsTranslating(true);
    setSelectedLanguage(language);

    try {
      // Strip HTML tags for translation
      const textContent = selectedChapter.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

      const response = await supabase.functions.invoke("translate-content", {
        body: { 
          content: textContent,
          targetLanguage: language,
        },
      });

      if (response.error) throw response.error;
      setTranslatedContent(response.data.translatedContent);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedContent("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 pt-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Umrah Guide
            </h1>
            <p className="text-muted-foreground">
              Complete step-by-step guidance for performing Umrah
            </p>
          </div>

          {/* Chapter Navigation */}
          <ChapterList
            chapters={umrahChapters}
            selectedId={selectedChapter.id}
            onSelect={(chapter) => {
              const fullChapter = umrahChapters.find(c => c.id === chapter.id);
              if (fullChapter) setSelectedChapter(fullChapter);
            }}
          />

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Translation Panel */}
            <TranslationPanel
              content={translatedContent}
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleTranslate}
              isLoading={isTranslating}
            />

            {/* Main Content */}
            <div className="lg:col-span-2">
              <ReadingContent
                title={selectedChapter.title}
                arabicTitle={selectedChapter.arabicTitle}
                content={selectedChapter.content}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Umrah;
