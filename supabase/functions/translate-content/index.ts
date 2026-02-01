import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, targetLanguage } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Map language codes to full names for better translation
    const languageNames: Record<string, string> = {
      ar: "Arabic", ur: "Urdu", hi: "Hindi", bn: "Bengali", id: "Indonesian",
      ms: "Malay", tr: "Turkish", fa: "Persian", ps: "Pashto", fr: "French",
      es: "Spanish", pt: "Portuguese", de: "German", it: "Italian", nl: "Dutch",
      ru: "Russian", uk: "Ukrainian", pl: "Polish", cs: "Czech", sk: "Slovak",
      hu: "Hungarian", ro: "Romanian", bg: "Bulgarian", sr: "Serbian", hr: "Croatian",
      sl: "Slovenian", bs: "Bosnian", mk: "Macedonian", sq: "Albanian", el: "Greek",
      he: "Hebrew", yi: "Yiddish", zh: "Chinese Simplified", "zh-TW": "Chinese Traditional",
      ja: "Japanese", ko: "Korean", vi: "Vietnamese", th: "Thai", lo: "Lao",
      km: "Khmer", my: "Burmese", tl: "Filipino", ta: "Tamil", te: "Telugu",
      kn: "Kannada", ml: "Malayalam", mr: "Marathi", gu: "Gujarati", pa: "Punjabi",
      or: "Odia", as: "Assamese", ne: "Nepali", si: "Sinhala", dv: "Dhivehi",
      sw: "Swahili", am: "Amharic", ti: "Tigrinya", om: "Oromo", so: "Somali",
      ha: "Hausa", yo: "Yoruba", ig: "Igbo", zu: "Zulu", xh: "Xhosa",
      af: "Afrikaans", st: "Sesotho", sn: "Shona", ny: "Chichewa", rw: "Kinyarwanda",
      lg: "Luganda", mg: "Malagasy", sv: "Swedish", no: "Norwegian", da: "Danish",
      fi: "Finnish", is: "Icelandic", et: "Estonian", lv: "Latvian", lt: "Lithuanian",
      be: "Belarusian", ka: "Georgian", hy: "Armenian", az: "Azerbaijani", kk: "Kazakh",
      uz: "Uzbek", tg: "Tajik", ky: "Kyrgyz", tk: "Turkmen", mn: "Mongolian",
      tt: "Tatar", ba: "Bashkir", cv: "Chuvash", ce: "Chechen", av: "Avar",
      os: "Ossetian", ku: "Kurdish", ckb: "Central Kurdish", sd: "Sindhi",
      bal: "Balochi", ks: "Kashmiri", doi: "Dogri", mni: "Manipuri", sat: "Santali",
      bh: "Bhojpuri", mai: "Maithili", raj: "Rajasthani", mag: "Magahi", awa: "Awadhi",
      hne: "Chhattisgarhi", gom: "Konkani", brx: "Bodo", mwr: "Marwari", tcy: "Tulu",
      new: "Newari", bo: "Tibetan", dz: "Dzongkha", ug: "Uyghur", jv: "Javanese",
      su: "Sundanese", ace: "Acehnese", min: "Minangkabau", bjn: "Banjar", bug: "Buginese",
      mad: "Madurese", ban: "Balinese", sas: "Sasak", tet: "Tetum", ceb: "Cebuano",
      ilo: "Ilocano", hil: "Hiligaynon", war: "Waray", pam: "Kapampangan", bcl: "Bikol",
      pag: "Pangasinan", mi: "Maori", haw: "Hawaiian", sm: "Samoan", to: "Tongan",
      fj: "Fijian", ty: "Tahitian", mh: "Marshallese", ch: "Chamorro", ca: "Catalan",
      gl: "Galician", eu: "Basque", ast: "Asturian", an: "Aragonese", oc: "Occitan",
      co: "Corsican", sc: "Sardinian", fur: "Friulian", lad: "Ladino", rm: "Romansh",
      lb: "Luxembourgish", fy: "Frisian", li: "Limburgish", wa: "Walloon", br: "Breton",
      cy: "Welsh", gd: "Scottish Gaelic", ga: "Irish", gv: "Manx", kw: "Cornish",
      mt: "Maltese", eo: "Esperanto", ia: "Interlingua", vo: "Volapük", la: "Latin",
      sa: "Sanskrit", pi: "Pali", prs: "Dari", haz: "Hazaragi", zza: "Zazaki",
      arz: "Egyptian Arabic", apc: "Levantine Arabic", acm: "Iraqi Arabic",
      ary: "Moroccan Arabic", aeb: "Tunisian Arabic", arq: "Algerian Arabic",
      acq: "Yemeni Arabic", apd: "Sudanese Arabic", ff: "Fulani", wo: "Wolof",
      rn: "Kirundi", ln: "Lingala", kg: "Kongo", lu: "Luba-Katanga", tw: "Twi",
      ak: "Akan", ee: "Ewe", bm: "Bambara", mos: "Mossi", dyu: "Dyula",
      sg: "Sango", kr: "Kanuri", ts: "Tsonga", tn: "Tswana", ss: "Swati",
      ve: "Venda", nr: "South Ndebele", nso: "Northern Sotho", bem: "Bemba",
      tum: "Tumbuka", loz: "Lozi", luo: "Luo", luy: "Luhya", kam: "Kamba",
      mer: "Meru", kik: "Kikuyu", guz: "Gusii", mas: "Maasai", kal: "Kalenjin",
      nyn: "Nyankole", cgg: "Chiga", teo: "Teso", ach: "Acholi", lgg: "Lugbara",
      mfe: "Mauritian Creole", ht: "Haitian Creole", pap: "Papiamento",
      srn: "Sranan Tongo", jam: "Jamaican Patois", gcr: "French Guianese Creole",
      cbk: "Chavacano", tpi: "Tok Pisin", bi: "Bislama", ho: "Hiri Motu",
      crs: "Seychellois Creole", rcf: "Réunion Creole", kea: "Cape Verdean Creole",
      qu: "Quechua", ay: "Aymara", gn: "Guarani", nah: "Nahuatl", yua: "Yucatec Maya",
      mam: "Mam", kek: "Kekchí", quc: "K'iche'", cak: "Kaqchikel", tzj: "Tz'utujil",
      nv: "Navajo", chr: "Cherokee", cr: "Cree", oj: "Ojibwe", iu: "Inuktitut",
      ik: "Inupiaq", kl: "Kalaallisut",
    };

    const targetLangName = languageNames[targetLanguage] || targetLanguage;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional translator specializing in Islamic religious texts. Translate the following text to ${targetLangName}. 
            
Important guidelines:
- Maintain the reverent and respectful tone appropriate for religious content
- Keep Arabic terms like "Tawaf", "Ihram", "Hajj", "Umrah", "Kaaba", "Saiee" as they are (transliterated) with their translations in parentheses if needed
- Preserve the meaning and spiritual significance of the content
- Keep any Quranic verses or Hadith quotes accurate
- Only return the translation, no explanations or notes`,
          },
          {
            role: "user",
            content: content,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const translatedContent = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ translatedContent }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Translation failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
