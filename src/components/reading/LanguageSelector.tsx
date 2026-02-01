import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Search, Languages, Check, Star } from "lucide-react";
import { languages, popularLanguages } from "@/data/languages";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector = ({
  selectedLanguage,
  onLanguageChange,
}: LanguageSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return languages;
    const query = searchQuery.toLowerCase();
    return languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(query) ||
        lang.nativeName.toLowerCase().includes(query) ||
        lang.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const popularLangs = useMemo(() => {
    return languages.filter((l) => popularLanguages.includes(l.code));
  }, []);

  return (
    <div className="bg-card rounded-xl border border-border p-4 h-fit lg:sticky lg:top-24">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Languages className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground text-lg">Select Language</h3>
          <p className="text-sm text-muted-foreground">240+ languages available</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search languages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 text-base"
        />
      </div>

      {/* Quick Links - Popular Languages */}
      {!searchQuery && (
        <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Popular</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularLangs.slice(0, 10).map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => onLanguageChange(lang.code)}
                className="text-sm h-8"
              >
                {lang.nativeName}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Language List */}
      <ScrollArea className="h-[350px]">
        <div className="space-y-1 pr-4">
          {/* English (Original) always first */}
          <button
            onClick={() => onLanguageChange("en")}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-left",
              selectedLanguage === "en"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            )}
          >
            <div>
              <span className="font-medium text-base">English</span>
              <span className="text-sm ml-2 opacity-70">(Original)</span>
            </div>
            {selectedLanguage === "en" && <Check className="w-4 h-4" />}
          </button>

          {filteredLanguages
            .filter((l) => l.code !== "en")
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => onLanguageChange(lang.code)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-left",
                  selectedLanguage === lang.code
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                )}
              >
                <div>
                  <span className="font-medium text-base">{lang.nativeName}</span>
                  <span className="text-sm ml-2 opacity-70">({lang.name})</span>
                </div>
                {selectedLanguage === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}

          {filteredLanguages.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No languages found for "{searchQuery}"
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Translation powered by AI
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
