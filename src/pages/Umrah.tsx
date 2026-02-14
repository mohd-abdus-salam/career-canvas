import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, Languages } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  arabic?: string;
  translation?: string;
}

const umrahGuide: Section[] = [
  {
    id: 1,
    title: "Literary, Shariah and Conventional Meaning",
    content: "Literary meaning of UMRAH is to have intention of any Inhabited place, and as per Shariah or conventionally it means to have intention of Holy Kaaba. Technically it means to do Tawaf of Holy Kaaba and Saiee between Hillocks of Safa and Marwah. Conventionally it is also known as Hajjul Asghar (Lesser Pilgrimage)."
  },
  {
    id: 2,
    title: "Status of Umrah Under Shariah",
    content: "It is Farz only one time like HAJJ for any individual in his lifetime. More than one time it is Nafl as per Imam Shafiee, Imam Ahmad-bin-Hambal, Dawood Zahiri, Ishaq, Sufyan Soury etc. It is Sunnah as per Imam Abu Hanifah and Abu Saur."
  },
  {
    id: 3,
    title: "Time for Umrah",
    content: "For UMRAH there is no Specific time. This can be done any time during the year except during the time of HAJJ. As per Imam Abu Yusuf the exception is for 9th of Dhul Hijja (Arafa). The exception is on the day of Qurbani (sacrifice) in HAJJ and days of Tashreeq (9/10/11/12/13 of Dhul Hijja) as per the fiqh of Imam Abu Hanifah."
  },
  {
    id: 4,
    title: "Rules of Umrah",
    content: `There are Two FARZ in Umrah:
a) Ihram        b) Tawaf

There are Two WAJIBAT in Umrah:
a) Saiee between SAFA and MARWAH
b) Doing Halaq (Shaving of Head)

In IHRAAM there are two FARZ:
a) Niyyat (Intention)     b) Talbiyah

There is one FARZ in Tawaf and it is Niyyat (Intention).
In Saiee the first four Circuits (Shawts) are FARZ and the remaining three Circuits (Shawts) are WAJIB.`
  },
  {
    id: 5,
    title: "Preparation for Umrah",
    content: `After completing bath/wudu (ablutions) then Pilgrim will wear the Ihraam. Hair oil can be applied to head. For the Ihraam, Two clean seamless white linen, woolen or towel sheets (preferably new ones) is required. Each sheet of Ihraam is to measure 2 yards x 1.25 yards. One of the white sheet should be wrapped around waist in such a way that it starts from left and moves on to the right side in anti clockwise direction and then end on the left side of the waist (similar to wearing Lungi). Drape the other white sheet over left shoulder, back and right shoulder. The right edge of the sheet should fall and rest on the left shoulder. The lower sheet of the Ihraam should be above the ankles. After this, cover the head with the upper sheet of the Ihraam and offer two Rakat Nafil prayers and in the first Rakat after Sura Al Fateha recite "Sura Al Kafeiroon" and in the second Rakat after Sura Al Fateha recite "Sura Al Ikhlaas".

After the completion of prayers remove the upper white sheet from the head and after this Pilgrim has to do the Niyyat (Intention) of UMRAH.`,
    arabic: "اللّهُمَّ إِنِّي أُرِيدُ الْعُمْرَةَ فَيَسِّرْهَا لِي وَتَقَبَّلْهَا مِنِّي",
    translation: `"O Allah! I intend to perform UMRAH, make it easy for me and accept it from me".

Male pilgrims to recite Talbiyah 3 times loudly and female pilgrims to recite Talbiyah 3 times in a low voice. Once the Pilgrim recites Talbiyah the regulations of Ihraam come into force immediately.`
  },
  {
    id: 6,
    title: "Rule of Talbiyah",
    content: "Reciting of Talbiyah is Farz only one time at the time of Niyyat (Intention) under the fiqh of Imam Abu Hanifah. Pilgrim must recite Talbiyah countless time throughout the pilgrimage journey. Talbiyah should be immediately stopped at the beginning of Tawaf."
  },
  {
    id: 7,
    title: "Words of Talbiyah",
    arabic: "لَبَّيْكَ اللّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لاَ شَرِيكَ لَكَ",
    translation: `"Here I am ! O Allah ! Here I am ! Here I am there is no one who is Your Partner, Here I am ! surely, all praise and blessings are Yours, and Dominion. You are without Companion"`
  },
  {
    id: 8,
    title: "Way to Journey",
    content: "Pilgrims proceeding by Air for Hajj / Umrah from Hyderabad, Bangalore, Mumbai, Chennai, Delhi, etc will wear Ihraam from their places of residential cities. These cities will become similar to Meeqat."
  },
  {
    id: 9,
    title: "Meeqat",
    content: `There are two types of Meeqat:
a) Meeqat Makani    b) Meeqat Zamani.

Meeqat Makani means the place where after reaching, the pilgrims will wear Ihraam for Hajj or Umrah or for both.

Meeqat Zamani (Period) means, it is that period in which Hajj is necessary. Or in other words wearing Ihraam for Hajj is Mustahab in the months of Hajj and it is Makruh to wear Ihraam for Hajj in other months. It is the saying of Allah:`,
    arabic: "الحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ",
    translation: `"Period of Hajj is known months" i.e. months of Shawwal, Zeeqadah and till 10th of Dhul Hijja.

Natives of INDIA have the Meeqat boundary at YALAMLAM on the way to Jeddah which is 75 miles before Jeddah. Pilgrims travelling by AIR will have difficulty in wearing Ihraam exactly at YALAMLAM inside the aircraft which is practically not possible.`
  },
  {
    id: 10,
    title: "Start of Journey",
    content: "From the residential place of city, Pilgrims will be travelling by Aeroplanes to Jeddah or Madinah. On reaching the Airports of Jeddah or Madinah, they will have to meet the Muallim whose name is endorsed in the Passport and complete the formalities with him. After reaching Jeddah the Pilgrims will proceed to Holy Makkah by Taxi and reach their place of stay. For Hajj, the pilgrims will stay in the designated building rented by Muallim. One wrist belt will be given to each pilgrim by the Muallim for the Hajj pilgrims. It has to be worn till the journey home country is undertaken."
  },
  {
    id: 11,
    title: "Entering in the Masjid ul Haram",
    content: "In normal times after reaching Makkah Mouzzama, room is taken on hire by the Pilgrim of UMRAH and the luggage is kept safely in the room. After this Pilgrim will enter MASJID UL HARAM (Baithullah) from BAB US SALAM or any other doors. It is Masnoon to put the right foot first in Haram and say:",
    arabic: "اللّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    translation: `"O Allah I seek forgiveness for all sins and request You to expand the doors of Mercy on me".`
  },
  {
    id: 12,
    title: "Supplications After Seeing Holy Kaaba",
    content: "The moment after entering Masjid Ul Haram, Pilgrims while going near to KAABA in Mataf should stop on the way for a while as they see Holy KAABA and offer three times the TAKBIR. During the recitation of TAKBIR keep the sight fixed on Holy KAABA.",
    arabic: `اللّهُ أَكْبَرُ اللّهُ أَكْبَرُ اللّهُ أَكْبَرُ
لاَ إِلَهَ إِلاَّ اللّهُ وَاللّهُ أَكْبَرُ
اللّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ`,
    translation: `"Allah is Great ! Allah is Great ! Allah is Great !
None has the right to be worshipped but Allah and He is Great".

Keep your sight fixed on Holy Kaaba and do this supplication that O ALLAH! accept this supplication that hereafter, whatever justified supplication I do is accepted i.e. to make me Mustajab Daawaat.`
  },
  {
    id: 13,
    title: "Istelam of Hajre Aswad (Touching or Kissing)",
    content: "Now the pilgrim should move towards HAJRE ASWAD and if no place is available near it, Pilgrim should stand in the direction of HAJRE ASWAD, so that the left of HAJRE ASWAD is onto the right side of the right shoulder of the Pilgrim. Now the pilgrim should do IDTIBA (The one end of upper cloth sheet of Ihraam should be taken from underneath the right armpit and put on to the top of the left shoulder). This way right hand and right shoulder is not covered and they are free from the cloth."
  },
  {
    id: 14,
    title: "Tawaf",
    content: "Before starting of Tawaf, recitation of Talbiyah shall be stopped. Niyyat (Intention) of Tawaf is now done (It is Farz).",
    arabic: "اللّهُمَّ إِنِّي أُرِيدُ طَوَافَ بَيْتِكَ الْحَرَامِ فَيَسِّرْهُ لِي وَتَقَبَّلْهُه مِنِّي",
    translation: `"O ALLAH! I desire to perform Tawaf of Your Sacred House. So make it easy for me and accept it from me".

Now move, slightly towards the right side and be opposite to HAJRE ASWAD (coming in straight line of Hajre Aswad), raise your hands like in Namaz upto your ears and palms facing Hajre Aswad, read Takbir and Hamd. After this drop down the hands and come to Hajre Aswad and kiss it in a humble manner. While doing Tawaf do not turn your face/chest towards Holy Kaaba, because it is Makruh-e-Tahreemi. In the first three Circuits male Pilgrims will do RAMAL. While doing Tawaf in every circuit at Rukn-e-Yamani touch and feel it and then proceed ahead. Between Rukn-e-Yamani and Hajre Aswad recite: "Our Lord! give us goodness in this world and goodness hereafter, and save us from the chastisement of fire".`
  },
  {
    id: 15,
    title: "Tawaf-e-Baithullah",
    content: "Tawaf consist of seven Shawts (circuits). One Shawt is passing from Hajre Aswad, Multazim, Bab Baithullah, Hatim and Rukn-e-yamani hereby finally reaching the starting point i.e. Hajre Aswad. The titles of the seven circuits are kept in such a manner that it is easy to remember, to do the supplication and keep track of the count of the circuits. It is very important to keep the count of circuits."
  },
  {
    id: 16,
    title: "The First Shawt (Circuit)",
    subtitle: "Praise and Glory to Almighty Allah",
    content: "First circuit supplication from Hajre Aswad to Rukn-e-Yamani:",
    arabic: `سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلاَ إِلَهَ إِلاَّ اللَّهُ وَاللَّهُ أَكْبَرُ
وَلاَ حَوْلَ وَلاَ قُوَّةَ إِلاَّ بِاللَّهِ الْعَلِيِّ الْعَظِيمِ
وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ مُحَمَّدٍ ﷺ`,
    translation: `"All Glory to Allah! All Praise is to Allah! There is nobody worthy of worship but Allah! Allah is the Greatest. There is no power nor strength except that from Allah, The Most High, The Greatest! Peace and Salutation be on the Prophet of Allah, Muhammad ﷺ. O Allah! By my faith in Allah, Muhammad ﷺ, O Allah! By my belief in the Book, and in fulfillment of the vows I made to Thee, and following the Sunnah of Thy beloved Prophet Muhammad ﷺ, O Allah! Truly I ask thy forgiveness, and thy protection, and everlasting soundness in Faith in this world and in the Hereafter, and that I be granted Paradise and be freed from the fires of Hell".`
  },
  {
    id: 17,
    title: "The Second Shawt (Circuit)",
    subtitle: "Praise the Baithullah",
    content: "Second circuit supplication from Hajre Aswad to Rukn-e-Yamani:",
    arabic: `اللَّهُمَّ إِنَّ هَذَا الْبَيْتَ بَيْتُكَ وَالْحَرَمَ حَرَمُكَ وَالأَمْنَ أَمْنُكَ
وَهَذَا عَبْدُكَ وَابْنُ عَبْدِكَ وَابْنُ أَمَتِكَ
وَهَذَا مَقَامُ الْعَائِذِ بِكَ مِنَ النَّارِ
اللَّهُمَّ حَرِّمْ لُحُومَنَا وَبُشُورَنَا عَلَى النَّارِ
اللَّهُمَّ حَبِّبْ إِلَيْنَا الإِيمَانَ وَزَيِّنْهُ فِي قُلُوبِنَا
وَكَرِّهْ إِلَيْنَا الْكُفْرَ وَالْفُسُوقَ وَالْعِصْيَانَ
وَاجْعَلْنَا مِنَ الرَّاشِدِينَ
اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ
اللَّهُمَّ أَدْخِلْنِي الْجَنَّةَ بِغَيْرِ حِسَابٍ`,
    translation: `"O Allah! This House is Thy House and this Haram is Thy Haram, and this security is Thy security, and this slave is Thy slave. I am Thy slave and son of Thy slave. And this place is a refuge from the fires of Hell for him who seeks Thy protection. Forbid our flesh and our bodies to the fire. O Allah! Endear to us the Faith, and adorn with it our hearts, and make hateful to us disbelief, wickedness and transgression, and cause us to be among those who are rightly guided. O Allah! Protect me from Thy punishment on the Day when Thou shalt resurrect Thy slaves. O Allah! Allow me to enter Paradise without any accounting".`
  },
  {
    id: 18,
    title: "The Third Shawt (Circuit)",
    subtitle: "Seek Forgiveness for the Sins",
    content: "Third circuit supplication from Hajre Aswad to Rukn-e-Yamani:",
    arabic: `اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الشَّكِّ وَالشِّرْكِ
وَالشِّقَاقِ وَالنِّفَاقِ وَسُوءِ الأَخْلاَقِ
وَسُوءِ الْمَنْظَرِ وَالْمُنْقَلَبِ فِي الْمَالِ وَالأَهْلِ وَالْوَلَدِ
اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ
وَأَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ`,
    translation: `"O Allah! Truly I seek refuge in Thee from doubt and from associating with Thee others (in worship), and from discord, hypocrisy, and immorality, and from returning home to see my family and my children in evil state of affairs. O Allah! Truly I ask Thee for Thy pleasure and that I be allowed to enter Paradise. And I take refuge in Thee from Thy anger and from the fire of Hell. O Allah! I seek refuge in Thee from falling from Thy grace in my grave and from the temptations in this life and trials at the time of death".`
  },
  {
    id: 19,
    title: "The Fourth Shawt (Circuit)",
    subtitle: "Seek Rewards and Blessings from Almighty Allah",
    content: "Fourth circuit supplication from Hajre Aswad to Rukn-e-Yamani:",
    arabic: `اللَّهُمَّ اجْعَلْهَا عُمْرَةً مَبْرُورَةً
وَسَعْيًا مَشْكُورًا وَذَنْبًا مَغْفُورًا
وَعَمَلًا صَالِحًا مَقْبُولًا وَتِجَارَةً لَنْ تَبُورَ
يَا عَالِمَ مَا فِي الصُّدُورِ
اللَّهُمَّ إِنِّي أَسْأَلُكَ مُوجِبَاتِ رَحْمَتِكَ
وَعَزَائِمَ مَغْفِرَتِكَ وَالسَّلَامَةَ مِنْ كُلِّ إِثْمٍ
وَالْغَنِيمَةَ مِنْ كُلِّ بِرٍّ وَالْفَوْزَ بِالْجَنَّةِ
وَالنَّجَاةَ مِنَ النَّارِ`,
    translation: `"O Allah! Allow this pilgrimage to be accepted, and this endeavour to be rewarded, and my sins to be forgiven, and my good deeds to be approved and cause my business to flourish, O Thou who knoweth all that is in our hearts! O Allah! Take me out of darkness into light. O Allah! I ask thee, that I be worthy of Thy Mercy, and certain of Thy Forgiveness, and immune to all sins, and be worthy of rewards for all my virtues, and be worthy of entering Paradise and be immune from Hell. O my Lord! Make me content with what Thou has bestowed upon me. And let Thy Blessings be with what Thou has given me. And compensate all that I lack with Thy own favour".`
  },
  {
    id: 20,
    title: "The Fifth Shawt (Circuit)",
    subtitle: "To Pray for Meeting Prophet Muhammad ﷺ at Hauz-e-Kausar",
    content: "Fifth circuit supplication from Hajre Aswad to Rukn-e-Yamani:",
    arabic: `اللَّهُمَّ أَظِلَّنِي تَحْتَ ظِلِّ عَرْشِكَ يَوْمَ لاَ ظِلَّ إِلاَّ ظِلُّكَ
وَاسْقِنِي مِنْ حَوْضِ نَبِيِّكَ مُحَمَّدٍ ﷺ
شَرْبَةً هَنِيئَةً مَرِيئَةً لاَ أَظْمَأُ بَعْدَهَا أَبَدًا
اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا سَأَلَكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ ﷺ
وَأَعُوذُ بِكَ مِنْ شَرِّ مَا اسْتَعَاذَكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ ﷺ`,
    translation: `"O Allah! Bestow upon me the shade of Thy Throne on the Day when there shall be no shade except Thine, and there shall be no countenance except Thine. O Allah! Provide me a pleasant and delicious draught from the Hauz-e-kausar (the Reservoir of Plenty) of Thy Prophet, that thereafter we feel no thirst whatsoever. O Allah! I request Thee for the blessings of all those things which Prophet Muhammad ﷺ asked and beg Thy protection against all those vices from which the Prophet Muhammad ﷺ sought your protection. O Allah! I invoke Thy Blessings for Paradise and its blissful possessions and for every word, act and deed which could draw me closer to Paradise. I seek Thy Protection from Hell Fire and for every word, act and deed which could draw me closer to Hell-Fire".`
  }
];

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },
  { code: 'sq', name: 'Albanian', native: 'Shqip' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'hy', name: 'Armenian', native: 'Հայերեն' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ay', name: 'Aymara', native: 'Aymar aru' },
  { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan' },
  { code: 'bm', name: 'Bambara', native: 'Bamanankan' },
  { code: 'eu', name: 'Basque', native: 'Euskara' },
  { code: 'be', name: 'Belarusian', native: 'Беларуская' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'bho', name: 'Bhojpuri', native: 'भोजपुरी' },
  { code: 'bs', name: 'Bosnian', native: 'Bosanski' },
  { code: 'bg', name: 'Bulgarian', native: 'Български' },
  { code: 'ca', name: 'Catalan', native: 'Català' },
  { code: 'ceb', name: 'Cebuano', native: 'Cebuano' },
  { code: 'ny', name: 'Chichewa', native: 'Chichewa' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', native: '简体中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', native: '繁體中文' },
  { code: 'co', name: 'Corsican', native: 'Corsu' },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski' },
  { code: 'cs', name: 'Czech', native: 'Čeština' },
  { code: 'da', name: 'Danish', native: 'Dansk' },
  { code: 'dv', name: 'Dhivehi', native: 'ދިވެހި' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'eo', name: 'Esperanto', native: 'Esperanto' },
  { code: 'et', name: 'Estonian', native: 'Eesti' },
  { code: 'ee', name: 'Ewe', native: 'Eʋegbe' },
  { code: 'tl', name: 'Filipino', native: 'Filipino' },
  { code: 'fi', name: 'Finnish', native: 'Suomi' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'fy', name: 'Frisian', native: 'Frysk' },
  { code: 'gl', name: 'Galician', native: 'Galego' },
  { code: 'ka', name: 'Georgian', native: 'ქართული' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'gn', name: 'Guarani', native: 'Guarani' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'ht', name: 'Haitian Creole', native: 'Kreyòl ayisyen' },
  { code: 'ha', name: 'Hausa', native: 'Hausa' },
  { code: 'haw', name: 'Hawaiian', native: 'ʻŌlelo Hawaiʻi' },
  { code: 'iw', name: 'Hebrew', native: 'עברית' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'hmn', name: 'Hmong', native: 'Hmong' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar' },
  { code: 'is', name: 'Icelandic', native: 'Íslenska' },
  { code: 'ig', name: 'Igbo', native: 'Igbo' },
  { code: 'ilo', name: 'Ilocano', native: 'Ilocano' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'ga', name: 'Irish', native: 'Gaeilge' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'jw', name: 'Javanese', native: 'Basa Jawa' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'kk', name: 'Kazakh', native: 'Қазақ тілі' },
  { code: 'km', name: 'Khmer', native: 'ខ្មែរ' },
  { code: 'rw', name: 'Kinyarwanda', native: 'Kinyarwanda' },
  { code: 'gom', name: 'Konkani', native: 'कोंकणी' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'kri', name: 'Krio', native: 'Krio' },
  { code: 'ku', name: 'Kurdish (Kurmanji)', native: 'Kurdî' },
  { code: 'ckb', name: 'Kurdish (Sorani)', native: 'کوردی' },
  { code: 'ky', name: 'Kyrgyz', native: 'Кыргызча' },
  { code: 'lo', name: 'Lao', native: 'ລາວ' },
  { code: 'la', name: 'Latin', native: 'Latina' },
  { code: 'lv', name: 'Latvian', native: 'Latviešu' },
  { code: 'ln', name: 'Lingala', native: 'Lingála' },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių' },
  { code: 'lg', name: 'Luganda', native: 'Luganda' },
  { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch' },
  { code: 'mk', name: 'Macedonian', native: 'Македонски' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली' },
  { code: 'mg', name: 'Malagasy', native: 'Malagasy' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mt', name: 'Maltese', native: 'Malti' },
  { code: 'mi', name: 'Maori', native: 'Te Reo Māori' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'mni-Mtei', name: 'Meiteilon (Manipuri)', native: 'ꯃꯩꯇꯩꯂꯣꯟ' },
  { code: 'lus', name: 'Mizo', native: 'Mizo ṭawng' },
  { code: 'mn', name: 'Mongolian', native: 'Монгол' },
  { code: 'my', name: 'Myanmar (Burmese)', native: 'မြန်မာ' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली' },
  { code: 'no', name: 'Norwegian', native: 'Norsk' },
  { code: 'or', name: 'Odia (Oriya)', native: 'ଓଡ଼ିଆ' },
  { code: 'om', name: 'Oromo', native: 'Afaan Oromoo' },
  { code: 'ps', name: 'Pashto', native: 'پښتو' },
  { code: 'fa', name: 'Persian', native: 'فارسی' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'qu', name: 'Quechua', native: 'Runasimi' },
  { code: 'ro', name: 'Romanian', native: 'Română' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'sm', name: 'Samoan', native: 'Gagana Samoa' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'gd', name: 'Scots Gaelic', native: 'Gàidhlig' },
  { code: 'nso', name: 'Sepedi', native: 'Sepedi' },
  { code: 'sr', name: 'Serbian', native: 'Српски' },
  { code: 'st', name: 'Sesotho', native: 'Sesotho' },
  { code: 'sn', name: 'Shona', native: 'chiShona' },
  { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
  { code: 'si', name: 'Sinhala', native: 'සිංහල' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina' },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina' },
  { code: 'so', name: 'Somali', native: 'Soomaali' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'su', name: 'Sundanese', native: 'Basa Sunda' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'tt', name: 'Tatar', native: 'Татарча' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'ti', name: 'Tigrinya', native: 'ትግርኛ' },
  { code: 'ts', name: 'Tsonga', native: 'Xitsonga' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'tk', name: 'Turkmen', native: 'Türkmençe' },
  { code: 'ak', name: 'Twi (Akan)', native: 'Twi' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'ug', name: 'Uyghur', native: 'ئۇيغۇرچە' },
  { code: 'uz', name: 'Uzbek', native: 'Oʻzbekcha' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'cy', name: 'Welsh', native: 'Cymraeg' },
  { code: 'xh', name: 'Xhosa', native: 'isiXhosa' },
  { code: 'yi', name: 'Yiddish', native: 'ייִדיש' },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá' },
  { code: 'zu', name: 'Zulu', native: 'isiZulu' },
];

const Umrah = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translatedContent, setTranslatedContent] = useState<{[key: string]: {[key: number]: any}}>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const currentSection = umrahGuide[currentPage];
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === umrahGuide.length - 1;

  // Get translated content or fallback to original
  const displayContent = selectedLanguage === 'en' 
    ? currentSection 
    : translatedContent[selectedLanguage]?.[currentPage] || currentSection;

  // Translate content when language or page changes
  useEffect(() => {
    if (selectedLanguage === 'en') {
      return;
    }

    const translateContent = async () => {
      // Check if already translated for this specific language and page
      if (translatedContent[selectedLanguage]?.[currentPage]) return;
      
      setIsTranslating(true);
      try {
        const textToTranslate = [
          currentSection.title,
          currentSection.subtitle || '',
          currentSection.content,
          currentSection.translation || ''
        ].filter(Boolean).join('\n---\n');

        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${selectedLanguage}&dt=t&q=${encodeURIComponent(textToTranslate)}`
        );
        
        const data = await response.json();
        const translated = data[0].map((item: any) => item[0]).join('');
        const parts = translated.split('\n---\n');
        
        setTranslatedContent(prev => ({
          ...prev,
          [selectedLanguage]: {
            ...(prev[selectedLanguage] || {}),
            [currentPage]: {
              ...currentSection,
              title: parts[0] || currentSection.title,
              subtitle: currentSection.subtitle ? parts[1] : currentSection.subtitle,
              content: parts[currentSection.subtitle ? 2 : 1] || currentSection.content,
              translation: currentSection.translation ? parts[parts.length - 1] : currentSection.translation
            }
          }
        }));
      } catch (error) {
        console.error('Translation error:', error);
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [selectedLanguage, currentPage]);

  const goToNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (!isFirstPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-28 pb-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Bismillah */}
            <div className="mb-10">
              <p className="text-5xl md:text-6xl lg:text-7xl font-arabic text-foreground mb-4" style={{ lineHeight: '1.8' }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-6">
              UMRAH
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">
              A Complete Guide to Performing the Lesser Pilgrimage
            </p>

            {/* Stats Badge */}
            <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-8 py-4 shadow-lg">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-lg font-medium text-foreground">{umrahGuide.length} Detailed Sections</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Section {currentPage + 1} of {umrahGuide.length}
              </div>
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:bg-secondary/50 transition-colors"
                >
                  <Languages className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    {languages.find(l => l.code === selectedLanguage)?.native}
                  </span>
                  {isTranslating && (
                    <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  )}
                </button>

                {/* Language Dropdown */}
                <AnimatePresence>
                  {showLanguageMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      <div className="max-h-96 overflow-y-auto">
                        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-2">
                          <input
                            type="text"
                            placeholder="Search languages..."
                            className="w-full px-3 py-2 text-sm bg-secondary rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                            onChange={(e) => {
                              const search = e.target.value.toLowerCase();
                              const items = document.querySelectorAll('[data-language]');
                              items.forEach((item) => {
                                const langName = item.getAttribute('data-language')?.toLowerCase() || '';
                                const display = langName.includes(search) ? '' : 'none';
                                (item as HTMLElement).style.display = display;
                              });
                            }}
                          />
                        </div>
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            data-language={`${lang.name} ${lang.native}`}
                            onClick={() => {
                              setSelectedLanguage(lang.code);
                              setShowLanguageMenu(false);
                            }}
                            className={cn(
                              "w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors flex items-center justify-between",
                              selectedLanguage === lang.code && "bg-primary/10"
                            )}
                          >
                            <div>
                              <div className="font-medium text-sm">{lang.native}</div>
                              <div className="text-xs text-muted-foreground">{lang.name}</div>
                            </div>
                            {selectedLanguage === lang.code && (
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="flex-1">
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentPage + 1) / umrahGuide.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <div className="text-sm font-medium text-foreground">
                {Math.round(((currentPage + 1) / umrahGuide.length) * 100)}%
              </div>
            </div>
          </div>

          {/* Current Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Section Header */}
              <div className="px-6 md:px-8 py-8 bg-gradient-to-r from-primary/5 to-transparent border-b border-border">
                <div className="flex items-center gap-4 mb-4">
                  {/* Number Badge */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{currentSection.id}</span>
                  </div>

                  {/* Title */}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
                      {isTranslating ? (
                        <span className="opacity-50">Translating...</span>
                      ) : (
                        displayContent.title
                      )}
                    </h2>
                    {displayContent.subtitle && (
                      <p className="text-base text-primary font-medium">{displayContent.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="px-6 md:px-8 py-10 space-y-8">
                {/* Main Content */}
                {displayContent.content && (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line font-light">
                      {displayContent.content}
                    </p>
                  </div>
                )}

                {/* Arabic Text */}
                {displayContent.arabic && (
                  <div className="relative mt-8 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border-2 border-primary/20 overflow-hidden">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                    
                    <p
                      className="text-3xl md:text-4xl lg:text-5xl font-arabic text-center leading-loose text-foreground relative z-10"
                      dir="rtl"
                      style={{ lineHeight: '2.2' }}
                    >
                      {displayContent.arabic}
                    </p>
                  </div>
                )}

                {/* Translation */}
                {displayContent.translation && (
                  <div className="mt-6 p-6 md:p-8 rounded-xl bg-muted/40 border-l-4 border-primary">
                    <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line italic font-serif">
                      {displayContent.translation}
                    </p>
                  </div>
                )}

                {/* Common Supplication Note */}
                {currentSection.id >= 16 && currentSection.id <= 20 && (
                  <div className="mt-6 p-6 rounded-xl bg-secondary/20">
                    <p className="text-sm text-muted-foreground italic">
                      <strong>Note:</strong> After reaching Rukn-e-Yamani and while proceeding to Hajre Aswad, recite:
                      <br />
                      <span className="font-arabic text-lg mr-2">رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ</span>
                      <br />
                      "Our Lord! give us goodness in this world and goodness hereafter, and save us from the chastisement of fire and enter us in Paradise alongwith the righteous ones, O Powerful, O All Forgiving, O Lord of the Universe".
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between gap-4">
            <button
              onClick={goToPreviousPage}
              disabled={isFirstPage}
              className={cn(
                "flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all shadow-lg",
                isFirstPage
                  ? "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                  : "bg-card border border-border text-foreground hover:bg-secondary/80 hover:shadow-xl"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {umrahGuide.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    index === currentPage
                      ? "bg-primary w-8"
                      : "bg-secondary hover:bg-primary/50"
                  )}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={isLastPage}
              className={cn(
                "flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all shadow-lg",
                isLastPage
                  ? "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90 hover:shadow-xl"
              )}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Umrah;
