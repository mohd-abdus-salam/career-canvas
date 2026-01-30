import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Chapter {
  id: string;
  title: string;
  arabicTitle?: string;
  content?: string;
}

interface ChapterListProps {
  chapters: Chapter[];
  selectedId: string;
  onSelect: (chapter: Chapter) => void;
}

const ChapterList = ({ chapters, selectedId, onSelect }: ChapterListProps) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => onSelect(chapter)}
            className={`chapter-item flex-shrink-0 ${
              selectedId === chapter.id ? "active" : ""
            }`}
          >
            <span className="font-medium">{chapter.title}</span>
            {chapter.arabicTitle && (
              <span className="block text-xs opacity-75 font-display">
                {chapter.arabicTitle}
              </span>
            )}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ChapterList;
