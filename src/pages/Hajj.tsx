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

const hajjGuide: Section[] = [
  {
    id: 1,
    title: "Literary and Educative Meanings",
    content: "The literary meaning of Hajj is to have intention to visit some inhabited place. As per Shariah and literary meaning, the Hajj means Visiting to Holy Makkah for performing certain rituals with an intention to glorify Holy Makkah.\n\nThe meaning of Hajj in practical aspect with all reverence and praises to Holy Kaaba is to start the journey, wearing of Ihraam, recitation of Talbiyah, Tawaf or circuting of Holy Kaaba, performing Saiee, staying in Mina, Arafath, Muzdalifah, doing Rami of three Jamrat, sacrificing of animal, shaving of head, doing Tawaf-e-Ziarat, and Tawaf-e-Vida."
  },
  {
    id: 2,
    title: "Conditions and Pre-requisites for Doing Hajj",
    content: "There are five conditions:\n\na) He should be a Muslim.\nb) He must be sane and adult.\nc) He must have full control over his mental faculties.\nd) He should be freed from slavery.\ne) He must be financially sound to bear all of his expenses for performing Hajj and coming back. He should provide finances adequately for dependents during his absence and until his return back to his home country.\nf) Lastly the path from his residence to Holy MAKKAH should be peaceful."
  },
  {
    id: 3,
    title: "Obligatory and Period to Perform Hajj",
    content: "It is obligatory to perform HAJJ one time in the lifetime of a person. Once you fulfill the conditions of Hajj, then it becomes obligatory to do as early as possible. Any delay might create hindrances to perform Hajj with regard to health, financial conditions or any other important aspect of worldly life.\n\nHAJJ is performed during the months of Shawwal, Ziqaadah and first ten days of Dhul Hijja (as per the Islamic calender)."
  },
  {
    id: 4,
    title: "Types of Hajj",
    content: "There are three types of Ihraam i.e. HAJJ can be done in 3 types.\n\n1) HAJJ-E-IFRAD\nIhraam is worn with the intention of Hajj only.\n\n2) HAJJ-E-TAMATTU\nIhraam is first worn with the intention of Umrah and then it is taken off after completion of Umrah. Ihraam is again worn on the day of Tarviyyah i.e., 8th of Dhul Hijja with the intention of HAJJ.\n\n3) HAJJ-E-QIRAAN\nSingle Ihraam is worn with the Niyyat (intention) of performing both Hajj and Umrah.\n\nPilgrims of India, Pakistan and Bangladesh generally perform Hajj-e-Tamattu i.e. first Ihraam is worn with the Niyyat (intention) of performing Umrah and is taken off after completing Umrah."
  },
  {
    id: 5,
    title: "Days of Hajj & Preparation",
    content: "These are Five days of HAJJ starting from 8th of Dhul Hijja to 12th of Dhul Hijja.\n\nPreparation of Hajj starts from 7th of Dhul Hijja itself. For these five days (of Hajj) necessary items like Haseer, Bedsheet, Plastic Rug, One pair of clothes (preferably new), plates, spoons, towel, tooth powder / paste, Miswak, Soap and some cash (Riyals) may be put together in one luggage. To facilitate Pilgrims, animals are being purchased by Alrajhi Bank for sacrificing.\n\nWhen pilgrims land at Jeddah/Madina, Muallims will give wrist band for identification purpose. This wrist band is to be worn permanently till the time pilgrim is proceeding back to home country."
  },
  {
    id: 6,
    title: "First Day of Hajj - Yaumul Tarviyyah (8th Dhul Hijja)",
    content: "Our beloved Prophet Muhammad ﷺ during the course of Hajjatul Vida on 8th Dhul Hijja performed Namaz-e-Fajr in Makkah Mukkaramah in congregation. After Fajr prayers Prophet Muhammad ﷺ proceeded to Mina which is approximately 4 miles away from Makkah.\n\nPilgrims who have done the Umrah of Hajj-e-Tamattu are to wear Ihraam after taking bath with the Niyyat (intention) of Hajj. With the upper cloth of Ihraam cover the head and offer 2 Rakat Nafil Namaz.\n\nImmediately after the completion of Namaz remove the Ihraam cloth from the head and say loudly intention of Hajj.",
    arabic: "اللّهُمَّ إِنِّي أُرِيدُ الْحَجَّ فَيَسِّرْهُ لِي وَتَقَبَّلْهُ مِنِّي",
    translation: "\"O Allah! I intent to perform Hajj, make it easy for me and accept it from me\".\n\nAfter this recite loudly three times Talbiyah by male pilgrims. Female pilgrims should recite in low voice."
  },
  {
    id: 7,
    title: "Words of Talbiyah",
    arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
    translation: "\"Here I am, O Allah! Here I am! Here I am, there is no one who is Your partner, Here I am! Surely, all praise and blessings are Yours and Dominion. You are without companion\".",
    content: "Talbiyah should be recited frequently during the journey."
  },
  {
    id: 8,
    title: "Journey from Makkah to Mina & Stay in Mina",
    content: "Proceed to Maktab of Muallim or his designated place to ride in cars / vans or buses to perform journey to Mina. Before starting to Mina please carry the Muallim name card and tent card number. While in journey rigorously recite Talbiyah. It is Sunnat to reach Mina and offer Dhuhr prayers there.\n\nImmediately after reaching Mina proceed to designated tent. Here the pilgrim will be staying night and day of 8th Dhul Hijja and night of 9th Dhul Hijja. If all these six prayers are offered by Jamaat (in congregation) Pilgrim will get benefited by 27 times of the Salat. Thus Pilgrim will have offered a total of 5 obligatory prayers at Mina before departing for Arafat, after sunrise on the morning of the 9th of Dhul Hijja."
  },
  {
    id: 9,
    title: "Actions of the Day of Arafa - 9th Dhul Hijja",
    content: "After Fajr prayers, Pilgrims will have break fast and get ready to proceed to Arafat. From the tent, Pilgrim will carry most necessary items from his luggage and remaining articles will be left in the desginated tent. Pilgrims will ride the vehicles and Insha Allah reach Arafat before Dhuhr prayers.\n\nIn the course of Journey Pilgrims will frequently recite Talbiyah, Durood-e-Shareef and Fourth Kalima:",
    arabic: "لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    translation: "\"There is no God besides Allah. He is One. He has no partner. His is the Kingdom and for Him is all Praise. He gives Life and causes death. In His hand is all good. And He has power over everything\".\n\nHere also the stay of pilgrims will be in tents. Here only two prayers, Dhuhr and Asr will be offered in the Qasr Mode."
  },
  {
    id: 10,
    title: "Orders of Wuquf-e-Arafat",
    content: "Wuquf-e-Arafat is an important Rukn, that is Farz of Hajj. If for any reason it is missed then Hajj is not completed. It cannot be compensated by any Fidya etc. The interval of the Wuquf in Arafat begins after the Zawaal of the sun (in the afternoon) and ends on the morning of the 10th of Dhul Hijja (Eid day). It is Masnun to do till after the sunset.\n\nPilgrims will stand facing himself at Qibla and will be in Wuquf till Maghrib. If Pilgrim cannot stand for long time then as much as possible he should stand and do supplications. It is also permissible to sit or lie down during the Wuquf.\n\nDuring Wuquf, Pilgrim is in HIS presence, so entreat HIM, plead, beg and pray for the welfare of All Muslims. Ask for His Forgiveness and Mercy."
  },
  {
    id: 11,
    title: "Proceeding from Arafat to Muzdalifa",
    content: "When Sunset is over proceed to Muzdalifa from Arafat. During journey to Muzdalifa engage yourself in extensive recitation of Talbiyah, Zikr, Durood. After reaching Muzdalifa, offer Maghrib and Isha Farz prayers jointly at the time of Isha.\n\nThe Farz prayers of Isha should be offered immediately after the Farz prayers of Maghrib. Sunna prayers of Maghrib, as well as Sunna and Witr of Isha should be offered afterwards. The night spent in Muzdalifa is Most excellent. Spend the night awake in Prayers, Zikr, Istaghfar.\n\nIt is suggested that pilgrims collect very small pebbles from Muzdalifa for throwing at Shaitan or Rami at Jamrat. Collect more than 49 pebbles."
  },
  {
    id: 12,
    title: "Proceeding from Muzdalifa to Mina & Actions of Yawmun Nahr (10th Dhul Hijja)",
    content: "After Fajr prayers, journey from Muzdalifa is undertaken a short while before the sunrise to Mina. Delaying the departure after sunrise is contrary to sunna.\n\nActivities for 10th Dhul-Hijja:\n\na) Wuquf-e-Muzdalifa (First Wajib)\nIn Muzdalifa after Fajr prayers for some minutes is the Wuquf. Plead for Istaghfar and ask for forgiveness for our misdeeds.\n\nb) Rami of Jamrat ul Aqaba (Bigger Shaitan) (Second Wajib)\nDeparting from Muzdalifa to proceed to Mina, before casting pebbles at Shaitan, Talbiyah has to be stopped. Pilgrim will perform Rami of Jamrat-ul-Aqaba only, by casting 7 pebbles a short while before the sunrise."
  },
  {
    id: 13,
    title: "Sacrifice (Qurbani), Halaq and Tawaf-e-Ziyarath",
    content: "c) Sacrifice (Qurbani) - (Third Wajib)\nFirst priority for the pilgrim is to go to slaughter house in Mina and do the Sacrifice (Qurbani). Only after getting confirmation of sacrifice, the pilgrim can get the head shaved.\n\nd) Halaq (Shaving of Head) - (Fourth Wajib)\nAfter sacrifice, it is time for getting the Head Shaved and taking off the Ihraam. After taking out Ihraam it is advisable for having bath and then wear the normal everyday clothes.\n\ne) Tawaf-e-Ziyarath\nTawaf-e-Ziyarath is the second Fundamental Rukn of Hajj. It will be done in everyday clothes. The time is from 10th of Dhul Hijja to before sunset of 12th of Dhul Hijja. After Tawaf-e-Ziyarath it is Wajib to do Saiee between Safa and Marwah if it is not done at the time of Tawaf-e-Qudoom."
  },
  {
    id: 14,
    title: "Days of Rami - 11th of Dhul Hijja (Fourth Day of Hajj)",
    content: "The 11th, 12th, and 13th day of the month of Dhul Hijja is called Ayyam-e-Rami (Days of Rami). Night stay should be at Mina only.\n\nOn 11th of Dhul Hijja after Dhuhr prayers it is required to do Rami for all the three Jamrat. Time starts from afternoon and lasts till sunset.\n\n1. First Rami of Jamrat-ul-Ula. Throw 7 pebbles.\n2. Proceed to Jamrat Ul Wusta. Throw 7 pebbles.\n3. Proceed to Jamrat Ul Aqaba and cast 7 pebbles.\nHere Pilgrim will not stay after doing Rami but will proceed straight to the Tent."
  },
  {
    id: 15,
    title: "12th of Dhul Hijja (Fifth Day of Hajj) & 13th of Dhul Hijja",
    content: "If Tawaf-e-Ziyarat is not completed, it is better to do today before Dhuhr prayers.\n\nThe main job of today is to perform Rami of all the three Jamrat after midday i.e. after Dhuhr Prayers. It will follow the same order as done on 11th of Dhul Hijja.\n\nReturn from Mina to Makkah (13th of Dhul Hijja):\nAfter Completing the Rami on 12th of Dhul Hijja, Pilgrim may leave Mina before sunset for Makkah. If anyone is not able to leave Mina before sunset of 12th of Dhul Hijja then he has to spend the night in Mina. Before midday of 13th of Dhul Hijja Rami has to be completed and then proceed to Makkah."
  },
  {
    id: 16,
    title: "Tawaf-e-Wida",
    content: "For those living outside the boundaries of Meeqat, it is Wajib to perform Tawaf-e-Wida. This is the last Wajib of Hajj. Ramal will not be done by the male Pilgrim during Tawaf-e-Wida.\n\nAfter Tawaf the Pilgrims will proceed to Maqam-e-Ibraheem and offer 2 Rakat prayers, then go to the area in Mataf where Zam Zam is available. Drink Zam Zam to the full comfort.\n\nIf possible Pilgrim can go to the door of Holy Kaaba and kiss it. Now the pilgrim should move to Hajre Aswad and kiss it if possible and say Allahu Akbar and leave Holy Kaaba. Pray to Almighty Allah to accept Hajj."
  },
  {
    id: 17,
    title: "Farz, Wajibat and Sunan of Hajj",
    content: "THREE FARZ IN HAJJ:\n1) Adopting (Wearing) Sacred garment i.e. Ihraam\n2) Wuquf-e-Arafath\n3) Tawaf-e-Ziyarath\n\nTEN WAJIBAT OF HAJJ:\n1) Adopting Ihraam from Meeqat\n2) Doing Saiee in between Safa and Marwah\n3) Wuquf-e-Arafath from Noon to Sunset\n4) Wuquf-e-Muzdalifah\n5) Rami Jamrat\n6) Shaving of Head (Halaq)\n7) Tawaf-e-Ziyarat (during days of Nahr)\n8) Tawaf-e-Wida\n9) Sequence of ceremonies (Rami, Qurbani, Halaq)\n10) Sacrifice of Animal"
  },
  {
    id: 18,
    title: "Journey for Ziyarat of Masjid-e-Nabavi",
    content: "Doing Ziarat of Masjid-e-Nabavi before HAJJ or after HAJJ is Masnoon. Prophet Muhammad ﷺ told that \"In my Mosque one time prayer is 1000 times better than prayer in any other Mosque except Masjid-e-Haraam\".\n\nThose pilgrims who have come to Holy Makkah before Hajj will be taken to Madinat-ul-Munawwara. After a stay of 8 days or 40 Namaz, Pilgrims will be brought back to Holy Makkah. While returning, Busses will stop at Masjid-e-Zul Halifa (Masjid Beer Ali) for the pilgrims to wear Ihraam for performing Umrah.\n\nFor those Pilgrims who proceed to Masjid-e-Nabavi after Hajj will stay for 8 days or 40 Namaz and then proceed straight to Jeddah for return journey to Home country."
  },
  {
    id: 19,
    title: "Ziyarat and its Manners",
    content: "When Pilgrim enters the limits of Masjid-e-Nabavi, enter through one of the doors with supplication.",
    arabic: "بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    translation: "\"In the name of Allah, blessings and salutation be on the messenger of Allah. O Allah open the doors of your mercy on me.\"\n\nOffer two Rakat tahiyatul Masjid in Riyazul Jannah. Go near Mawajeh Shareef (place where you stand face to face with Holy Prophet) and recite Durood and Salaam directly. Then slightly move towards right to offer Salam to Hazrath Abu Bakr Siddique. Then slightly move towards right to offer Salam to Hazrath Umar. Also visit Jannatul Baqi, Masjid-e-Quba and mount of UHUD."
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

const Hajj = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [translatedContent, setTranslatedContent] = useState<{ [key: string]: { [key: number]: any } }>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const currentSection = hajjGuide[currentPage];
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === hajjGuide.length - 1;

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
              HAJJ
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-10">
              A Complete Guide to Performing the Sacred Pilgrimage
            </p>

            {/* Stats Badge */}
            <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-8 py-4 shadow-lg">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-lg font-medium text-foreground">{hajjGuide.length} Detailed Sections</span>
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
                Section {currentPage + 1} of {hajjGuide.length}
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
                            data-language={`${lang.name} ${lang.native} `}
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
                    animate={{ width: `${((currentPage + 1) / hajjGuide.length) * 100}% ` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <div className="text-sm font-medium text-foreground">
                {Math.round(((currentPage + 1) / hajjGuide.length) * 100)}%
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
              {hajjGuide.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    index === currentPage
                      ? "bg-primary w-8"
                      : "bg-secondary hover:bg-primary/50"
                  )}
                  aria-label={`Go to section ${index + 1} `}
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

export default Hajj;
