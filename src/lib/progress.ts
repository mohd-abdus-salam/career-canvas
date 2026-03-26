import { auth, db } from "@/integrations/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

interface SaveProgressParams {
    contentType: "quran" | "umrah" | "hajj";
    sectionId: string;
    sectionTitle?: string;
    position?: string;
}

const waitForAuthUser = (timeoutMs = 5000): Promise<User | null> => {
    return new Promise((resolve) => {
        const current = auth.currentUser;
        if (current) {
            resolve(current);
            return;
        }

        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const cleanup = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            unsubscribe();
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                cleanup();
                resolve(user);
            }
        });

        timeoutId = setTimeout(() => {
            cleanup();
            resolve(null);
        }, timeoutMs);
    });
};

export const saveReadingProgress = async ({
    contentType,
    sectionId,
    sectionTitle,
    position
}: SaveProgressParams) => {
    // Ensure we have an authenticated user before writing progress.
    // Some components may trigger progress saves before auth state is fully initialized.
    const user = await waitForAuthUser();
    if (!user) {
        // The user is not signed in or auth state could not be resolved in time.
        return;
    }

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
