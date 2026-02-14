const BASE_URL = "https://api.quran.com/api/v4";

// --- Types ---

export type Chapter = {
    id: number;
    revelation_place: string;
    revelation_order: number;
    bismillah_pre: boolean;
    name_simple: string;
    name_complex: string;
    name_arabic: string;
    verses_count: number;
    pages: number[];
    translated_name: {
        language_name: string;
        name: string;
    };
};

export type Word = {
    id: number;
    position: number;
    audio_url: string | null;
    char_type_name: string;
    text_uthmani: string;
    text_indopak: string;
    translation: { text: string };
    transliteration: { text: string };
};

export type Verse = {
    id: number;
    verse_key: string;
    text_uthmani: string;
    words: Word[];
    translations: Array<{
        id: number;
        resource_id: number;
        text: string;
    }>;
};

export type AudioFile = {
    url: string;
    duration: number;
    segments: [number, number, number][]; // [start, end, word_position]
    format: string;
};

export type TafsirResponse = {
    text: string;
    text_urdu: string;
    resource_name: string;
};

// --- API Functions ---

export async function getChapters(): Promise<Chapter[]> {
    const res = await fetch(`${BASE_URL}/chapters?language=en`);
    const data = await res.json();
    return data.chapters;
}

export async function getChapterVerses(id: number): Promise<Verse[]> {
    // Fetch verses with Sayyid Abul Ala Maududi translation (resource_id 163 or similar, or 131 Saheeh)
    // 131 = Saheeh International
    // per_page=286 covers Al-Baqarah (max verses). API allows high limit.
    const res = await fetch(
        `${BASE_URL}/verses/by_chapter/${id}?language=en&words=true&word_fields=text_uthmani&translations=131&per_page=300&fields=text_uthmani,chapter_id`
    );
    if (!res.ok) throw new Error("Failed to fetch verses");
    const data = await res.json();
    return data.verses;
}

export async function getChapterAudio(chapterId: number, recitationId = 7): Promise<AudioFile[]> {
    // 7 = Mishari Rashid Alafasy
    const res = await fetch(`${BASE_URL}/recitations/${recitationId}/by_chapter/${chapterId}`);
    if (!res.ok) throw new Error("Failed to fetch audio");
    const data = await res.json();
    return data.audio_files.map((file: any) => ({
        ...file,
        url: `https://verses.quran.com/${file.url}`
    }));
}

export async function getAyahTafsir(verseKey: string): Promise<TafsirResponse> {
    // 817 = English (Tazkirul Quran)
    // 818 = Urdu (Tazkirul Quran)

    // Fetch both in parallel
    const [resEn, resUr] = await Promise.all([
        fetch(`${BASE_URL}/tafsirs/817/by_ayah/${verseKey}`),
        fetch(`${BASE_URL}/tafsirs/818/by_ayah/${verseKey}`)
    ]);

    const dataEn = resEn.ok ? await resEn.json() : null;
    const dataUr = resUr.ok ? await resUr.json() : null;

    return {
        text: dataEn?.tafsir?.text || "English Tafsir not available.",
        text_urdu: dataUr?.tafsir?.text || "Urdu Tafsir not available.",
        resource_name: "Tafsir (Tazkirul Quran)"
    };
}
