import { QuranReader } from "@/components/features/QuranReader";
import Navbar from "@/components/layout/Navbar";

export default function QuranPage() {
    return (
        <>
            <Navbar />
            <div className="pt-16">
                <QuranReader />
            </div>
        </>
    );
}
