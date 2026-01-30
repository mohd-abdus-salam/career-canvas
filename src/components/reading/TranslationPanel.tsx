import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Languages, Loader2 } from "lucide-react";

interface TranslationPanelProps {
  content: string;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  isLoading: boolean;
}

const languages = [
  { code: "en", name: "English (Original)" },
  { code: "ur", name: "اردو (Urdu)" },
  { code: "ar", name: "العربية (Arabic)" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "id", name: "Indonesia" },
  { code: "tr", name: "Türkçe (Turkish)" },
  { code: "ms", name: "Bahasa Melayu" },
];

const TranslationPanel = ({
  content,
  selectedLanguage,
  onLanguageChange,
  isLoading,
}: TranslationPanelProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 h-fit lg:sticky lg:top-24">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Languages className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">Translation</h3>
          <p className="text-xs text-muted-foreground">Select your language</p>
        </div>
      </div>

      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-full mb-4">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ScrollArea className="h-[400px] lg:h-[500px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-sm">Translating...</p>
          </div>
        ) : content ? (
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-sm text-muted-foreground">
              {selectedLanguage === "en"
                ? "Original content is displayed on the right. Select a language to see the translation here."
                : "Select a different language to see the translation."}
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default TranslationPanel;
