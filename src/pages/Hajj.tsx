import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TranslationPanel from "@/components/reading/TranslationPanel";
import ChapterList from "@/components/reading/ChapterList";
import ReadingContent from "@/components/reading/ReadingContent";
import { supabase } from "@/integrations/supabase/client";

// Hajj sections content
const hajjSections = [
  {
    id: "preparation",
    title: "Preparation",
    arabicTitle: "التحضير",
    content: `
      <h2>Preparing for Hajj</h2>
      <p>Hajj is one of the five pillars of Islam and a profound spiritual journey. Proper preparation is essential for a meaningful experience.</p>
      
      <h3>Spiritual Preparation</h3>
      <ul>
        <li>Seek sincere repentance (Tawbah) and purify your intentions</li>
        <li>Learn the rituals of Hajj thoroughly</li>
        <li>Settle all debts and seek forgiveness from others</li>
        <li>Write a will if necessary</li>
        <li>Increase in worship and dua</li>
      </ul>
      
      <h3>Physical Preparation</h3>
      <ul>
        <li>Ensure good physical health - consult your doctor</li>
        <li>Practice walking long distances</li>
        <li>Get all required vaccinations</li>
        <li>Pack comfortable, modest clothing</li>
      </ul>
      
      <h3>Essential Documents</h3>
      <ul>
        <li>Valid passport with sufficient validity</li>
        <li>Hajj visa</li>
        <li>Vaccination certificates</li>
        <li>Travel insurance</li>
        <li>Copies of all important documents</li>
      </ul>
      
      <h3>What to Pack</h3>
      <ul>
        <li>Ihram garments (two for men)</li>
        <li>Comfortable walking shoes and sandals</li>
        <li>Prayer rug</li>
        <li>Quran and dua books</li>
        <li>Personal medications</li>
        <li>Sunscreen and umbrella</li>
      </ul>
    `,
  },
  {
    id: "day1-8dhul",
    title: "8th Dhul Hijjah",
    arabicTitle: "يوم التروية",
    content: `
      <h2>Yawm al-Tarwiyah (Day of Watering)</h2>
      <p>The 8th of Dhul Hijjah marks the official beginning of Hajj. Pilgrims prepare to leave for Mina.</p>
      
      <h3>Morning Rituals</h3>
      <ol>
        <li>Perform ghusl (ritual bath)</li>
        <li>Put on Ihram garments</li>
        <li>Pray two rak'ahs of Sunnah</li>
        <li>Make intention for Hajj: "Labbayk Allahumma Hajj"</li>
        <li>Begin reciting the Talbiyah</li>
      </ol>
      
      <h3>Journey to Mina</h3>
      <p>After entering Ihram, proceed to Mina:</p>
      <ul>
        <li>Continue reciting Talbiyah throughout the journey</li>
        <li>Arrive in Mina before Dhuhr if possible</li>
        <li>Pray Dhuhr, Asr, Maghrib, Isha (shortened but not combined)</li>
        <li>Spend the night in Mina in worship</li>
      </ul>
      
      <h3>Night in Mina</h3>
      <p>The night should be spent in:</p>
      <ul>
        <li>Prayer and dhikr</li>
        <li>Recitation of Quran</li>
        <li>Reflection and contemplation</li>
        <li>Rest for the days ahead</li>
      </ul>
    `,
  },
  {
    id: "day2-9dhul",
    title: "9th Dhul Hijjah - Arafah",
    arabicTitle: "يوم عرفة",
    content: `
      <h2>The Day of Arafah</h2>
      <p>This is the most important day of Hajj. Standing at Arafah is the pillar of Hajj - without it, the Hajj is invalid.</p>
      
      <h3>The Prophet ﷺ said:</h3>
      <blockquote>
        الحَجُّ عَرَفَة
      </blockquote>
      <p>"Hajj is Arafah."</p>
      
      <h3>Journey to Arafah</h3>
      <ol>
        <li>Pray Fajr in Mina</li>
        <li>After sunrise, proceed to Arafah</li>
        <li>Continue reciting Talbiyah</li>
        <li>Arrive before Dhuhr</li>
      </ol>
      
      <h3>Wuquf (Standing) at Arafah</h3>
      <p>This is from Dhuhr until Maghrib:</p>
      <ul>
        <li>Pray Dhuhr and Asr combined and shortened</li>
        <li>Face the Qiblah and make abundant dua</li>
        <li>Raise your hands and beseech Allah</li>
        <li>Ask for forgiveness repeatedly</li>
        <li>Recite the Talbiyah frequently</li>
      </ul>
      
      <h3>Best Dua</h3>
      <blockquote>
        لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ
      </blockquote>
      
      <h3>After Sunset</h3>
      <ul>
        <li>Proceed to Muzdalifah calmly</li>
        <li>Do not pray Maghrib until reaching Muzdalifah</li>
        <li>Continue making dua and Talbiyah</li>
      </ul>
    `,
  },
  {
    id: "day3-10dhul",
    title: "10th Dhul Hijjah - Eid",
    arabicTitle: "يوم النحر",
    content: `
      <h2>Yawm al-Nahr (Day of Sacrifice)</h2>
      <p>This is the busiest day of Hajj with multiple rituals to be performed.</p>
      
      <h3>Night at Muzdalifah</h3>
      <ul>
        <li>Pray Maghrib and Isha combined upon arrival</li>
        <li>Collect 7 pebbles for Jamarat (or 70 for all days)</li>
        <li>Rest and prepare for the next day</li>
        <li>Pray Fajr at its earliest time</li>
        <li>Make dua until just before sunrise</li>
      </ul>
      
      <h3>Rituals of the 10th</h3>
      <p>Perform these in order (preferably):</p>
      <ol>
        <li><strong>Stoning Jamrat al-Aqabah:</strong> Throw 7 pebbles saying "Allahu Akbar" with each</li>
        <li><strong>Sacrifice:</strong> Offer your sacrificial animal (Hady)</li>
        <li><strong>Halq/Taqsir:</strong> Shave or trim the hair</li>
        <li><strong>Tawaf al-Ifadah:</strong> Perform Tawaf of the Kaaba</li>
        <li><strong>Sa'i:</strong> Walk between Safa and Marwa</li>
      </ol>
      
      <h3>Exiting Ihram</h3>
      <p>After the first three rituals (stoning, sacrifice, haircut):</p>
      <ul>
        <li>You enter partial release (Tahallul Asghar)</li>
        <li>All Ihram restrictions are lifted except intimacy</li>
        <li>After Tawaf and Sa'i, you are in complete release</li>
      </ul>
      
      <h3>Return to Mina</h3>
      <p>Return to Mina to spend the nights of Tashreeq (11th, 12th, 13th).</p>
    `,
  },
  {
    id: "days-tashreeq",
    title: "Days of Tashreeq",
    arabicTitle: "أيام التشريق",
    content: `
      <h2>The Days of Tashreeq (11th, 12th, 13th Dhul Hijjah)</h2>
      <p>These are the days of eating, drinking, and remembrance of Allah.</p>
      
      <h3>Daily Ritual - Stoning the Jamarat</h3>
      <p>Each day after Dhuhr, stone all three Jamarat:</p>
      <ol>
        <li><strong>Jamrat al-Sughra (smallest):</strong> 7 pebbles, then make dua</li>
        <li><strong>Jamrat al-Wusta (middle):</strong> 7 pebbles, then make dua</li>
        <li><strong>Jamrat al-Aqabah (largest):</strong> 7 pebbles, no dua after</li>
      </ol>
      
      <h3>Best Time for Stoning</h3>
      <ul>
        <li>After Dhuhr until sunset is the preferred time</li>
        <li>From sunrise is permissible if needed</li>
        <li>After sunset until Fajr for the elderly and weak</li>
      </ul>
      
      <h3>Option to Leave Early</h3>
      <p>On the 12th, you may leave Mina before sunset:</p>
      <ul>
        <li>This is called "taking the early option"</li>
        <li>Must leave before sunset</li>
        <li>If sunset catches you in Mina, stay for the 13th</li>
      </ul>
      
      <h3>Staying the 13th (Recommended)</h3>
      <ul>
        <li>More reward for staying all three days</li>
        <li>Stone the Jamarat on the 13th</li>
        <li>Then proceed to Makkah</li>
      </ul>
    `,
  },
  {
    id: "farewell",
    title: "Farewell Tawaf",
    arabicTitle: "طواف الوداع",
    content: `
      <h2>Tawaf al-Wada (Farewell Tawaf)</h2>
      <p>This is the final rite of Hajj, performed just before leaving Makkah.</p>
      
      <h3>Obligation</h3>
      <blockquote>
        لَا يَنْفِرَنَّ أَحَدٌ حَتَّى يَكُونَ آخِرُ عَهْدِهِ بِالْبَيْتِ
      </blockquote>
      <p>"No one should depart until their last act is at the House (Kaaba)."</p>
      <p>— Prophet Muhammad ﷺ</p>
      
      <h3>How to Perform</h3>
      <ol>
        <li>Perform Tawaf of 7 circuits around the Kaaba</li>
        <li>Pray 2 rak'ahs behind Maqam Ibrahim</li>
        <li>Drink Zamzam water</li>
        <li>Make your final duas at the Multazam</li>
      </ol>
      
      <h3>Exemptions</h3>
      <p>Farewell Tawaf is waived for:</p>
      <ul>
        <li>Women in menstruation or post-natal bleeding</li>
        <li>Those with severe illness</li>
      </ul>
      
      <h3>After Farewell Tawaf</h3>
      <ul>
        <li>Leave the Masjid immediately after</li>
        <li>Walk out backwards (optional, showing respect)</li>
        <li>Make dua for acceptance of your Hajj</li>
        <li>Ask Allah to return you again</li>
      </ul>
      
      <h3>Completion</h3>
      <p>Alhamdulillah! Your Hajj is complete. May Allah accept it from you.</p>
      <blockquote>
        اللَّهُمَّ تَقَبَّلْ حَجِّي وَاغْفِرْ ذَنْبِي وَاجْزِ سَعْيِي
      </blockquote>
      <p>"O Allah, accept my Hajj, forgive my sins, and reward my effort."</p>
    `,
  },
];

const Hajj = () => {
  const [selectedSection, setSelectedSection] = useState(hajjSections[0]);
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
    if (user) {
      saveProgress();
    }
  }, [selectedSection, user]);

  const saveProgress = async () => {
    if (!user) return;

    try {
      await supabase.from("reading_progress").upsert({
        user_id: user.id,
        content_type: "hajj",
        section_id: selectedSection.id,
        last_read_at: new Date().toISOString(),
      }, {
        onConflict: "user_id,content_type,section_id",
      });

      await supabase.from("reading_history").insert({
        user_id: user.id,
        content_type: "hajj",
        section_id: selectedSection.id,
        section_title: selectedSection.title,
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
      const textContent = selectedSection.content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

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
              Hajj Guide
            </h1>
            <p className="text-muted-foreground">
              Complete step-by-step guidance for performing the sacred pilgrimage
            </p>
          </div>

          {/* Section Navigation */}
          <ChapterList
            chapters={hajjSections}
            selectedId={selectedSection.id}
            onSelect={(section) => {
              const fullSection = hajjSections.find(s => s.id === section.id);
              if (fullSection) setSelectedSection(fullSection);
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
                title={selectedSection.title}
                arabicTitle={selectedSection.arabicTitle}
                content={selectedSection.content}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Hajj;
