import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    getChapters,
    getChapterVerses,
    getChapterAudio,
    getAyahTafsir,
    Chapter,
    Verse,
    AudioFile
} from "@/lib/quran-api";
import { cn } from "@/lib/utils";
import { FaPlay, FaPause, FaSpinner, FaBookOpen, FaTimes } from "react-icons/fa";

export function QuranReader() {
    // Data State
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [activeChapterId, setActiveChapterId] = useState(1);
    const [verses, setVerses] = useState<Verse[]>([]);
    const [audioData, setAudioData] = useState<AudioFile[]>([]);

    // UI State
    const [loadingChapters, setLoadingChapters] = useState(true);
    const [loadingContent, setLoadingContent] = useState(false);
    const [activeTafsir, setActiveTafsir] = useState<{ key: string; text: string; textUrdu: string; name: string } | null>(null);
    const [loadingTafsir, setLoadingTafsir] = useState(false);

    // Audio State
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
    const [activeVerseKey, setActiveVerseKey] = useState<string | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const verseRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    // Fetch Chapters on Mount
    useEffect(() => {
        async function loadChapters() {
            try {
                const data = await getChapters();
                setChapters(data);
            } catch (error) {
                console.error("Failed to fetch chapters", error);
            } finally {
                setLoadingChapters(false);
            }
        }
        loadChapters();
    }, []);

    // Fetch Content (Verses + Audio) when Chapter Changes
    useEffect(() => {
        async function loadContent() {
            setLoadingContent(true);
            setIsPlaying(false);
            setCurrentVerseIndex(0);
            setActiveTafsir(null);
            setActiveVerseKey(null);

            try {
                const [versesData, audioData] = await Promise.all([
                    getChapterVerses(activeChapterId),
                    getChapterAudio(activeChapterId)
                ]);
                setVerses(versesData);
                setAudioData(audioData);
            } catch (error) {
                console.error("Failed to fetch chapter content", error);
            } finally {
                setLoadingContent(false);
            }
        }
        loadContent();
    }, [activeChapterId]);

    // Sync Active Verse Key with Index & Scroll
    useEffect(() => {
        if (verses.length > 0 && verses[currentVerseIndex]) {
            const key = verses[currentVerseIndex].verse_key;
            setActiveVerseKey(key);
            scrollToVerse(key);
        }
    }, [currentVerseIndex, verses]);

    const scrollToVerse = (key: string) => {
        const el = verseRefs.current.get(key);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handleAudioEnded = () => {
        if (currentVerseIndex < verses.length - 1) {
            setCurrentVerseIndex(prev => prev + 1);
        } else {
            setIsPlaying(false);
            setCurrentVerseIndex(0);
        }
    };

    // Auto-play next track when source changes
    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.warn("Autoplay prevented", e));
        }
    }, [currentVerseIndex, isPlaying]);

    // Handle Time Update (Not strictly needed heavily now, but good for progress if we added a bar)
    const handleTimeUpdate = () => {
        // Placeholder
    };

    const handleTafsir = async (verseKey: string) => {
        if (activeTafsir?.key === verseKey) {
            setActiveTafsir(null); // Close
            return;
        }

        setLoadingTafsir(true);
        try {
            const data = await getAyahTafsir(verseKey);
            setActiveTafsir({
                key: verseKey,
                text: data.text,
                textUrdu: data.text_urdu,
                name: data.resource_name
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingTafsir(false);
        }
    };

    const activeChapterData = chapters.find(c => c.id === activeChapterId);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-background">
            {/* Audio Element */}
            {audioData.length > 0 && (
                <audio
                    ref={audioRef}
                    src={audioData[currentVerseIndex]?.url}
                    onEnded={handleAudioEnded}
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                />
            )}

            {/* Sidebar */}
            <div className="md:w-80 bg-background border-r border-secondary h-[40vh] md:h-screen md:sticky md:top-20 overflow-y-auto pt-4 md:pt-8 scrollbar-thin scrollbar-thumb-primary/20">
                <h2 className="px-6 text-xl font-serif font-bold text-foreground mb-6">Surahs</h2>
                {loadingChapters ? (
                    <div className="flex justify-center p-8"><FaSpinner className="animate-spin text-primary" /></div>
                ) : (
                    <div className="space-y-1 px-2 pb-20">
                        {chapters.map((chapter) => (
                            <button
                                key={chapter.id}
                                onClick={() => setActiveChapterId(chapter.id)}
                                className={cn(
                                    "w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-all duration-200 group",
                                    activeChapterId === chapter.id
                                        ? "bg-primary/10 text-primary shadow-sm border-l-4 border-l-primary"
                                        : "hover:bg-secondary/50 text-foreground/80 border-l-4 border-l-transparent"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors",
                                        activeChapterId === chapter.id ? "bg-primary text-white border-primary" : "bg-secondary/30 border-secondary group-hover:border-primary/50"
                                    )}>
                                        {chapter.id}
                                    </span>
                                    <div>
                                        <p className="font-semibold text-sm">{chapter.name_simple}</p>
                                        <p className="text-xs opacity-70">{chapter.translated_name.name}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-12 relative min-h-screen">
                <div className="max-w-4xl mx-auto pb-40">
                    {loadingContent || !activeChapterData ? (
                        <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                            <FaSpinner className="animate-spin text-primary text-4xl" />
                            <p className="text-foreground/50 animate-pulse">Loading Surah...</p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                                    {activeChapterData.name_arabic}
                                </h1>
                                <p className="text-xl text-foreground/80 font-medium mb-1">{activeChapterData.name_simple}</p>
                                <p className="text-foreground/60">{activeChapterData.translated_name.name}</p>

                                <div className="mt-8 flex justify-center">
                                    <button
                                        onClick={() => {
                                            if (audioRef.current) {
                                                if (isPlaying) {
                                                    audioRef.current.pause();
                                                    setIsPlaying(false);
                                                } else {
                                                    audioRef.current.play();
                                                    setIsPlaying(true);
                                                }
                                            }
                                        }}
                                        className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white hover:bg-[#0EA5E9] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                                    >
                                        {isPlaying ? <FaPause /> : <FaPlay />}
                                        <span className="font-medium">{isPlaying ? "Pause Recitation" : "Play Surah"}</span>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Bismillah */}
                            {activeChapterId !== 1 && activeChapterId !== 9 && (
                                <div className="text-center mb-16 opacity-80">
                                    <p className="font-arabic text-3xl md:text-4xl text-foreground leading-relaxed">
                                        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                                    </p>
                                </div>
                            )}

                            {/* Verses */}
                            <div className="space-y-4">
                                {verses.map((verse, index) => (
                                    <div
                                        key={verse.verse_key}
                                        ref={(el) => { if (el) verseRefs.current.set(verse.verse_key, el); }}
                                        onClick={() => {
                                            setCurrentVerseIndex(index);
                                            setIsPlaying(true);
                                        }}
                                        className={cn(
                                            "group p-6 md:p-8 rounded-2xl transition-all duration-500 border border-transparent scroll-mt-32 cursor-pointer",
                                            activeVerseKey === verse.verse_key
                                                ? "bg-primary/10 border-primary/20 shadow-sm"
                                                : "hover:bg-secondary/30"
                                        )}
                                    >
                                        <div className="flex flex-col gap-6">
                                            {/* Arabic */}
                                            <div className="flex flex-wrap gap-x-1 gap-y-4 items-center justify-start text-right pr-2" dir="rtl">
                                                {verse.words.map((word) => (
                                                    <span
                                                        key={word.id}
                                                        className={cn(
                                                            "font-arabic text-2xl md:text-4xl leading-[3.5rem] select-text transition-colors duration-200",
                                                            // Highlight logic could go here if we had precise word timestamps mapping
                                                            // For now, highlighting the whole verse text via parent active state
                                                            activeVerseKey === verse.verse_key ? "text-primary" : "text-foreground/60"
                                                        )}
                                                        title={word.translation.text}
                                                    >
                                                        {word.text_uthmani}
                                                    </span>
                                                ))}
                                                <span className="inline-flex items-center justify-center w-10 h-10 border border-current rounded-full text-lg font-sans opacity-40 mr-2">
                                                    {verse.verse_key.split(':')[1]}
                                                </span>
                                            </div>

                                            {/* Translation */}
                                            <div className="text-left">
                                                <p className="text-lg text-foreground/80 font-sans leading-relaxed">
                                                    {verse.translations?.[0]?.text.replace(/<sup.*?sup>/g, "")}
                                                </p>

                                                {/* Actions */}
                                                <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTafsir(verse.verse_key);
                                                        }}
                                                        className="flex items-center gap-2 text-primary hover:underline text-sm font-medium"
                                                    >
                                                        <FaBookOpen />
                                                        {activeTafsir?.key === verse.verse_key ? "Hide Tafsir" : "Read Tafsir"}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Tafsir Panel */}
                                            <AnimatePresence>
                                                {activeTafsir?.key === verse.verse_key && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="mt-4 bg-secondary/30 p-6 rounded-xl border border-secondary text-sm leading-relaxed text-foreground/90">
                                                            <div className="flex justify-between items-center mb-4 border-b border-foreground/10 pb-2">
                                                                <span className="font-bold text-primary">{activeTafsir.name}</span>
                                                                <button onClick={() => setActiveTafsir(null)}><FaTimes /></button>
                                                            </div>
                                                            {loadingTafsir ? (
                                                                <FaSpinner className="animate-spin" />
                                                            ) : (
                                                                <div className="flex flex-col gap-6">
                                                                    {/* English Tafsir */}
                                                                    <div>
                                                                        <h4 className="font-bold text-xs uppercase text-foreground/50 mb-2">English</h4>
                                                                        <div dangerouslySetInnerHTML={{ __html: activeTafsir.text }} />
                                                                    </div>

                                                                    {/* Divider */}
                                                                    <div className="h-px bg-foreground/10" />

                                                                    {/* Urdu Tafsir */}
                                                                    <div dir="rtl" className="text-right font-serif text-base">
                                                                        <h4 className="font-bold text-xs uppercase text-foreground/50 mb-2 text-left">Urdu</h4>
                                                                        <div dangerouslySetInnerHTML={{ __html: activeTafsir.textUrdu }} />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
