import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TranslationPanel from "@/components/reading/TranslationPanel";
import ChapterList from "@/components/reading/ChapterList";
import ReadingContent from "@/components/reading/ReadingContent";
import { supabase } from "@/integrations/supabase/client";

// Hajj sections content from the PDF guide
const hajjSections = [
  {
    id: "meaning",
    title: "Meaning & Conditions",
    arabicTitle: "معنى وشروط",
    content: `
      <h2>Literary and Educative Meanings</h2>
      <p>The meaning of Hajj in some inhabited places per Sharh is to glorify Holy Makkah for performing certain rituals with an intention to glorify Holy Makkah.</p>
      
      <p>The practical aspect with reverence and praises to Holy Kaaba is to start the journey, wearing of Ihraam, recitation of Talbiyah, Tawaf or circulating of Holy Kaaba, performing Saiee, staying in Mina, Arafath, Muzdalifah, doing Rami of three Jamrat, sacrificing an animal, shaving or doing Tawafe-Ziarat, and Tawaf-e-Vida.</p>
      
      <h2>Conditions and Pre-requisites for Doing Hajj</h2>
      <p>There are five conditions:</p>
      <ul>
        <li><strong>a)</strong> He should be a Muslim</li>
        <li><strong>b)</strong> He must be sane and adult</li>
        <li><strong>c)</strong> He must have full control over his mental faculties</li>
        <li><strong>d)</strong> He should be freed from slavery</li>
        <li><strong>e)</strong> He must be financially sound to bear all of his expenses for performing Hajj and coming back. He should provide finances adequately for his dependents during his absence and until his return back to his home country</li>
        <li><strong>f)</strong> Lastly the path from his residence to Holy MAKKAH should be peaceful</li>
      </ul>
      
      <h2>Obligatory and When to Perform Hajj</h2>
      <p>It is obligatory to perform HAJJ one time in the lifetime of a person. Once you fulfill the conditions of Hajj, then it becomes obligatory to do as early as possible. Any delay might create hindrances to perform Hajj with regard to health, financial conditions or any other important aspect of worldly life.</p>
      
      <h3>Period</h3>
      <p>HAJJ is performed during the months of Shawwal, Ziqaadah and first ten days of Dhul Hijja (as per the Islamic calendar).</p>
    `,
  },
  {
    id: "types",
    title: "Types of Hajj",
    arabicTitle: "أنواع الحج",
    content: `
      <h2>Types of Hajj</h2>
      <p>Hajj is done in 3 types:</p>
      
      <h3>1. HAJJ-E-IFRAD</h3>
      <p>Performing Hajj only without combining Umrah.</p>
      
      <h3>2. HAJJ-E-TAMATTU</h3>
      <p>Ihraam is first worn with the intention of Umrah and then it is taken off after completion of Umrah. Ihraam is again worn on the day of Tarviyyah i.e., 8th of Dhul Hijja with the intention of HAJJ.</p>
      
      <h3>3. HAJJ-E-QIRAAN</h3>
      <p>Single Ihraam is worn with the Niyyat (intention) of performing both Hajj and Umrah.</p>
      
      <h2>Important Notes</h2>
      <ol>
        <li>If the pilgrim is Mufrid or Qarin then first immediately after entering Masjid-ul-Haram, he will complete Tawaf-e-Qudoom of Holy Kaaba and then complete Saiee.</li>
        <li>If the pilgrim is Mutamatti who is bounded by the rules of Makkah then he can wear Ihraam from Masjid-ul-Haram and can proceed straight to Mina for Hajj.</li>
        <li>Pilgrims of India, Pakistan and Bangladesh generally perform Hajj-e-Tamattu i.e. first Ihraam is worn with the Niyyat (intention) of performing Umrah and is taken off after completing Umrah.</li>
      </ol>
    `,
  },
  {
    id: "day1",
    title: "8th Dhul Hijja - Mina",
    arabicTitle: "يوم التروية",
    content: `
      <h2>First Day of Hajj - Yaumul Tarviyyah</h2>
      <p>Our beloved Prophet Muhammad ﷺ during the course of Hajjatul Vida on 8th Dhul Hijja performed Namaz-e-Fajr in Makkah Mukkaramah in congregation. After Fajr prayers Prophet Muhammad ﷺ proceeded to Mina which is approximately 4 miles away from Makkah.</p>
      
      <h3>Wearing Ihram for Hajj</h3>
      <p>Pilgrims who have done the Umrah of Hajj-e-Tamattu should wear Ihraam after taking bath with the Niyyat (intention) of Hajj at the place wherever they are staying.</p>
      
      <p>With the upper cloth of Ihraam cover the head and offer 2 Rakat Nafil Namaz. In the first Rakat after Surah Fatiha recite a surah and in second Rakat after Surah Fatiha recite another surah.</p>
      
      <p>Immediately after the completion of Namaz remove the Ihraam cloth from the head and say loudly the intention of Hajj:</p>
      <blockquote>
        "O Allah! I intend to perform Hajj, make it easy for me and accept it from me."
      </blockquote>
      
      <p>After this recite loudly three times Talbiyah by male pilgrims. Female pilgrims should recite in low voice.</p>
      
      <h3>Words of Talbiyah</h3>
      <blockquote>
        لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ
      </blockquote>
      <p>"Here I am, O Allah! Here I am! Here I am, there is no one who is Your partner, Here I am! Surely, all praise and blessings are Yours and Dominion. You are without companion."</p>
      
      <h2>Stay in Mina</h2>
      <p>Immediately after reaching Mina proceed to designated tent. Here the pilgrim will be staying night and day of 8th Dhul Hijja and night of 9th Dhul Hijja.</p>
      
      <p>If all six prayers (Fajr to Isha and Fajr of 9th) are offered by Jamaat (in congregation) Pilgrim will get benefited by 27 times of the Salat.</p>
      
      <p><strong>Note:</strong> Aafaqui (Hajis coming from outside Makkah) will offer prayers of Mina/Arafath/Muzdalifa in Qasar mode. While staying in tent Hajis should rigorously recite Holy Quran, Durood and various Wazaif.</p>
    `,
  },
  {
    id: "day2",
    title: "9th Dhul Hijja - Arafat",
    arabicTitle: "يوم عرفة",
    content: `
      <h2>Actions of the Day of Arafa</h2>
      <p>9th Dhul Hijjah (Second Day of Hajj)</p>
      
      <p>After Fajr prayers, Pilgrims will have breakfast and get ready to proceed to Arafat. From the tent, Pilgrim will carry most necessary items from his luggage. Vehicles of Muallimeen (Guides) will arrive near the tent by 8-9 in the morning. Pilgrims will ride the vehicles and Insha Allah reach Arafat before Zuhar prayers.</p>
      
      <p>In the course of Journey Pilgrims will frequently recite Talbiyah, Durood-e-Shareef and Fourth Kalima:</p>
      <blockquote>
        لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ
      </blockquote>
      <p>"There is no God besides Allah. He is One, He has no partner. His is the Kingdom and for Him is all Praise. He gives Life and causes death. In His hand is all good. And He has power over everything."</p>
      
      <h2>Orders of Wuquf-e-Arafat</h2>
      <p><strong>Wuquf (Staying in) Wuquf-e-Arafat is an important Rukn, that is Farz of Hajj.</strong> If for any reason it is missed then Haj is not completed. It cannot be compensated by any Fidya etc.</p>
      
      <p>The interval of the Wuquf in Arafat begins after the Zawaal of the sun (in the afternoon) and ends on the morning of the 10th of Dhul Hijja (Eid day).</p>
      
      <h3>During Wuquf</h3>
      <p>Pilgrim is in HIS presence, so entreat HIM, plead, beg and pray for the welfare of All Muslims. Ask for His Forgiveness and Mercy. This is the special occasion for acceptance of your prayers. Send Durood and Salaam to Prophet Muhammad ﷺ.</p>
      
      <h3>Prophet Muhammad's ﷺ Invocations on the Day of Arafat</h3>
      <p>In the narration from Imam Tirmizi that the Prophet Muhammad ﷺ said that the best invocation is of the day of Arafat:</p>
      <blockquote>
        لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ
      </blockquote>
      <p>"There is no God besides Allah. He is one. He has no partner. His is the Kingdom and for Him is all praise. And He has power over everything."</p>
    `,
  },
  {
    id: "day3",
    title: "10th Dhul Hijja - Eid",
    arabicTitle: "يوم النحر",
    content: `
      <h2>Proceeding from Arafat to Muzdalifa</h2>
      <p>After sunset, proceed from Arafat to Muzdalifa. During journey to Muzdalifa engage in Durood and Talbiyah. When you reach Muzdalifa, pray Maghrib and Isha prayers combined.</p>
      
      <h2>Proceeding from Muzdalifa to Mina</h2>
      <p>After Fajr prayers, journey from Muzdalifa is undertaken a short while before the sunrise to Mina. Delaying the departure after sunrise is contrary to Sunna. Offer Fajr Prayers quite early in darkness in comparison to normal times.</p>
      
      <h2>Actions of Yawmun Nahr (Day of Sacrifice)</h2>
      <p>10th Dhul-Hijja is the third day of Hajj. Activities for today:</p>
      
      <h3>(a) Wuquf-e-Muzdalifa (First Wajib)</h3>
      <p>In Muzdalifa after Fajr prayers for some minutes is the Wuquf. With due humility, politeness, plead for Istaghfar (to beg pardon of Allah) and ask for forgiveness for our misdeeds:</p>
      <blockquote>
        أَسْتَغْفِرُ اللهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ
      </blockquote>
      <p>"I seek forgiveness from Almighty Allah for my sins."</p>
      
      <h3>(b) Rami of Jamrat ul Aqaba (Second Wajib)</h3>
      <p>Departing from Muzdalifa to proceed to Mina. Before throwing or casting pebbles at Shaitan, Talbiyah has to be stopped. Today Pilgrim will perform Rami of Jamrat-ul-Aqaba only, by casting/throwing seven pebbles.</p>
      <p>While throwing each pebble, Pilgrim has to say "Allahu Akbar". Then move on to the right side, facing Qibla start Takbeer, Istaghfar, and ending with Durood.</p>
      
      <h3>(c) Sacrifice (Qurbani) - Third Wajib</h3>
      <p>After Rami, arrange for the sacrifice. Only after getting the confirmation about the Sacrifice (Qurbani) then the pilgrim can get the head shaved.</p>
      
      <h3>(d) Halq/Taqsir (Shaving Head) - Fourth Wajib</h3>
      <p>After sacrifice, shave the head (for men) or trim hair. Then change into regular clothes (preferably new clothes).</p>
    `,
  },
  {
    id: "tashreeq",
    title: "Days of Tashreeq",
    arabicTitle: "أيام التشريق",
    content: `
      <h2>Days of Tashreeq (11th, 12th, 13th Dhul Hijjah)</h2>
      <p>These are the days of eating, drinking, and remembrance of Allah.</p>
      
      <h3>Daily Ritual - Stoning the Jamarat</h3>
      <p>Each day after Dhuhr, stone all three Jamarat:</p>
      <ol>
        <li><strong>Jamrat al-Sughra (smallest):</strong> 7 pebbles, then make dua</li>
        <li><strong>Jamrat al-Wusta (middle):</strong> 7 pebbles, then make dua</li>
        <li><strong>Jamrat al-Aqabah (largest):</strong> 7 pebbles, no dua after</li>
      </ol>
      
      <h3>Tasbih, Tahleel, Takbir</h3>
      <blockquote>
        سُبْحَانَ اللهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلٰهَ إِلَّا اللهُ، وَاللهُ أَكْبَرُ
      </blockquote>
      <p>"All Glory is to Allah! All Praise is to Allah! There is none worthy of Worship but Allah! Allah is the Greatest."</p>
      
      <h3>Option to Leave Early</h3>
      <p>On the 12th, you may leave Mina before sunset. This is called "taking the early option." Must leave before sunset. If sunset catches you in Mina, stay for the 13th.</p>
      
      <h2>Tawaf al-Wada (Farewell Tawaf)</h2>
      <p>This is the final rite of Hajj, performed just before leaving Makkah.</p>
      <blockquote>
        لَا يَنْفِرَنَّ أَحَدٌ حَتَّى يَكُونَ آخِرُ عَهْدِهِ بِالْبَيْتِ
      </blockquote>
      <p>"No one should depart until their last act is at the House (Kaaba)." — Prophet Muhammad ﷺ</p>
      
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
              Hajj Guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
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
