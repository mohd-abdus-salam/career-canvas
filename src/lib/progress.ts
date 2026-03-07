import { auth, db } from "@/integrations/firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

interface SaveProgressParams {
    contentType: "quran" | "umrah" | "hajj";
    sectionId: string;
    sectionTitle?: string;
    position?: string;
}

export const saveReadingProgress = async ({
    contentType,
    sectionId,
    sectionTitle,
    position
}: SaveProgressParams) => {
    const user = auth.currentUser;

    if (!user) return; // Only save progress if user is logged in

    const userId = user.uid;

    try {
        // 1. Update Reading Progress (Overwrites existing progress for this content type)
        const progressId = `${userId}_${contentType}`;
        const progressRef = doc(db, "reading_progress", progressId);

        const progressData = {
            id: progressId,
            user_id: userId,
            content_type: contentType,
            section_id: sectionId,
            position: position || null,
            last_read_at: new Date().toISOString()
        };

        await setDoc(progressRef, progressData, { merge: true });

        // 2. Add to Reading History (Appends a new record)
        const historyId = crypto.randomUUID(); // Generate unique ID for history entry
        const historyRef = doc(db, "reading_history", historyId);

        const historyData = {
            user_id: userId,
            content_type: contentType,
            section_id: sectionId,
            section_title: sectionTitle || null,
            visited_at: new Date().toISOString()
        };

        await setDoc(historyRef, historyData);

    } catch (error) {
        console.error("Failed to save reading progress:", error);
    }
};
