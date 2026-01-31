import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TranslationPanel from "@/components/reading/TranslationPanel";
import ChapterList from "@/components/reading/ChapterList";
import ReadingContent from "@/components/reading/ReadingContent";
import { supabase } from "@/integrations/supabase/client";

// Umrah chapters content from the PDF guide
const umrahChapters = [
  {
    id: "introduction",
    title: "Introduction",
    arabicTitle: "مقدمة",
    content: `
      <h2>Literary, Shariah and Conventional Meaning</h2>
      <p>Literary meaning of UMRAH is to have intention of any inhabited place, and as per Shariah or conventionally it means to have intention of Holy Kaaba. Technically it means to do Tawaf of Holy Kaaba and Saiee between Hillocks of Safa and Marwah. Conventionally it is also known as <strong>Hajjul Asghar</strong> (Lesser Pilgrimage).</p>
      
      <h2>Status of Umrah Under Shariah</h2>
      <p>It is Farz only one time like HAJJ for any individual in his lifetime. More than one time it is Nafil as per Imam Shafaiee, Imam Ahmad-ibn-Hambal, Dawood Zaahiri, Ishaq, Sufyan Soury etc. It is Sunna as per Imam Abu Hanifah and Abu Saur.</p>
      
      <h2>Time for Umrah</h2>
      <p>For UMRAH there is no specific time. This can be done any time during the year except during the time of HAJJ. As per Imam Abu Yosuf the exception is for 9th of Dhul Hijja (Arafa). The exception is on the day of Qurbani (sacrifice) and days of Tashreeq (9/10/11/12/13 of Dhul Hijja) as per the fiqh of Imam Abu Hanifah.</p>
      
      <h2>Rules of Umrah</h2>
      <p>There are <strong>Two FARZ</strong> in Umrah:</p>
      <ul>
        <li>Ihraam</li>
        <li>Tawaf</li>
      </ul>
      
      <p>There are <strong>Two WAJIBAT</strong> in Umrah:</p>
      <ul>
        <li>Saiee between SAFA and MARWAH</li>
        <li>Doing Halaq (Shaving of Head)</li>
      </ul>
      
      <p>In IHRAAM there are two FARZ: Niyyat (Intent) and Talbiyah.</p>
      <p>There is one FARZ in Tawaf and it is Niyyat (Intention).</p>
      <p>In Saiee the first four Circuits (Shawts) are FARZ and the remaining three Circuits (Shawts) are WAJIB.</p>
    `,
  },
  {
    id: "ihram",
    title: "Ihram",
    arabicTitle: "الإحرام",
    content: `
      <h2>Preparation for Umrah - Wearing Ihram</h2>
      <p>After completing bath/Wudu (ablutions) then Pilgrim will wear the Ihraam. Hair oil can be applied to head.</p>
      
      <p>For the Ihraam, <strong>two clean seamless white linen, woolen or towel sheets</strong> (preferably new ones) are required. Each sheet of Ihraam is to measure 2 yards x 1.25 yards.</p>
      
      <h3>How to Wear Ihram</h3>
      <ul>
        <li>One of the white sheets should be wrapped around the waist in such a way that it starts from left and moves on to the right side in an anti-clockwise fashion</li>
        <li>The right shoulder of the sheet should fall and rest on the left shoulder</li>
        <li>The lower sheet of the Ihraam should be above the ankles</li>
      </ul>
      
      <h3>Nafil Prayer</h3>
      <p>After this, cover the head with the upper sheet of the Ihraam and offer two Rakat Nafil prayers:</p>
      <ul>
        <li>In the first Rakat, after Sura Al Fateha, recite "Sura Al Kafeeroon"</li>
        <li>In the second Rakat, after Sura Al Fateha, recite "Sura Al Ikhlaas"</li>
      </ul>
      
      <h3>Making the Intention (Niyyat)</h3>
      <p>After the completion of prayers, remove the upper white sheet from the head and do the Niyyat (Intention) of UMRAH:</p>
      <blockquote>
        "O Allah! I intend to perform UMRAH, make it easy for me and accept it from me."
      </blockquote>
      
      <p>Male pilgrims should recite Talbiyah 3 times loudly and female pilgrims should recite Talbiyah 3 times in a low voice. Once the Pilgrim recites Talbiyah, the regulations of Ihraam come into force immediately.</p>
      
      <h3>Rule of Talbiyah</h3>
      <p>Reciting of Talbiyah is Farz only one time at the time of Niyyat (Intention) under the fiqh of Imam Abu Hanifah. The Pilgrim must recite Talbiyah countless times throughout the pilgrimage journey.</p>
      
      <h3>Words of Talbiyah</h3>
      <blockquote>
        لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ
      </blockquote>
      <p>"Here I am! O Allah! Here I am! Here I am! There is no one who is Your Partner, Here I am! Surely, all praise and blessings are Yours, and Dominion. You are without Companion."</p>
    `,
  },
  {
    id: "tawaf",
    title: "Tawaf",
    arabicTitle: "الطواف",
    content: `
      <h2>Entering Masjid ul Haram</h2>
      <p>After reaching Makkah Mouzzama, the Pilgrim will enter MASJID UL HARAM (Baithullah) from BAB US SALAM or any other doors. It is Masnoon to put the right foot first in Haram and say:</p>
      <blockquote>
        "O Allah I seek forgiveness for all sins and request You to expand the doors of Mercy on me."
      </blockquote>
      
      <h2>Supplications After Seeing Holy Kaaba</h2>
      <p>The moment after entering Masjid Ul Haram, Pilgrims while going near to KAABA in Mataf should stop on the way for a while as they see Holy KAABA and offer three times the TAKBIR. During the recitation of TAKBIR keep the sight fixed on Holy KAABA.</p>
      <blockquote>
        الله أكبر، الله أكبر، الله أكبر، لا إله إلا الله والله أكبر
      </blockquote>
      <p>"Allah is Great! Allah is Great! Allah is Great. None has the right to be worshipped but Allah and He is Great."</p>
      
      <h2>Istelam of Hajre Aswad (Touching or Kissing)</h2>
      <p>Move towards HAJRE ASWAD and stand in the direction of HAJRE ASWAD, so that the left of HAJRE ASWAD is onto the right side of the right shoulder.</p>
      
      <h3>Idtiba</h3>
      <p>Now do IDTIBA: The one end of upper cloth sheet of Ihraam should be taken from underneath the right armpit and put on to the top of the left shoulder. This way right hand and right shoulder is not covered.</p>
      
      <h2>Performing Tawaf</h2>
      <p>Before starting Tawaf, recitation of Talbiyah shall be stopped. Make Niyyat (Intention) of Tawaf (It is Farz):</p>
      <blockquote>
        "O ALLAH! I desire to perform Tawaf of Your Sacred House. So make it easy for me and accept it from me."
      </blockquote>
      
      <h3>Seven Circuits</h3>
      <p>Tawaf consists of seven Shawts (circuits). One Shawt is passing from Hajre Aswad, Multazim, Bab Baithullah, Hatim and Rukn-e-Yamani thereby finally reaching the starting point i.e. Hajre Aswad.</p>
      
      <p><strong>In the first three Circuits</strong> male Pilgrims will do RAMAL (walking hurriedly with forceful and narrow paces).</p>
      
      <h3>Between Rukn-e-Yamani and Hajre Aswad</h3>
      <blockquote>
        رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
      </blockquote>
      <p>"Our Lord! Give us goodness in this world and goodness hereafter, and save us from the chastisement of fire."</p>
      
      <h3>After Completing Tawaf</h3>
      <ul>
        <li>Pray two rak'ahs behind Maqam Ibrahim</li>
        <li>Drink Zamzam water</li>
        <li>Make dua at the Multazam</li>
      </ul>
    `,
  },
  {
    id: "sai",
    title: "Sa'i",
    arabicTitle: "السعي",
    content: `
      <h2>Going to Safa</h2>
      <p>After completing Tawaf, proceed to Mount Safa. Sa'i is the ritual of walking seven times between the hills of Safa and Marwah.</p>
      
      <h3>Niyyat (Intention) of Saiee at Safa Hillock</h3>
      <p>At Safa, recite:</p>
      <blockquote>
        إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ
      </blockquote>
      <p>"Indeed, Safa and Marwa are among the symbols of Allah." (Quran 2:158)</p>
      
      <p>Then say: "I begin with what Allah began with."</p>
      
      <h2>The Circuits Between Safa and Marwah</h2>
      <ul>
        <li>Face the Kaaba from Safa and make dua</li>
        <li>Walk towards Marwah</li>
        <li>Men should run between the green lights (Meelain Akhdarain - Two Green Lights - hastened walking)</li>
        <li>Make dua and dhikr throughout</li>
        <li>Upon reaching Marwah, face the Kaaba and make dua</li>
      </ul>
      
      <h3>Counting the Seven Laps</h3>
      <ol>
        <li>Safa to Marwah = 1st lap</li>
        <li>Marwah to Safa = 2nd lap</li>
        <li>Continue until you end at Marwah (7th lap)</li>
      </ol>
      
      <p>In Saiee the first four Circuits (Shawts) are FARZ and the remaining three Circuits (Shawts) are WAJIB.</p>
      
      <h3>After Completing Saiee</h3>
      <p>Two Rakath Nafil in Mataf are recommended after completing the Sa'i.</p>
    `,
  },
  {
    id: "halq",
    title: "Halq / Taqsir",
    arabicTitle: "الحلق والتقصير",
    content: `
      <h2>Halaq - Shaving of Head</h2>
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
      
      <h2>Coming out of Ihraam</h2>
      <p>After Halq or Taqsir:</p>
      <ul>
        <li>You exit the state of Ihram</li>
        <li>All restrictions of Ihram are now lifted</li>
        <li>Your Umrah is complete, Alhamdulillah!</li>
      </ul>
      
      <h3>Dua Upon Completion</h3>
      <blockquote>
        اللَّهُمَّ تَقَبَّلْ عُمْرَتِي - آمِين
      </blockquote>
      <p>"O ALLAH! Please Accept my Umrah - Aameen"</p>
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
              Umrah Guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
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
