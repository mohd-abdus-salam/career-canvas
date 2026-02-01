import { Loader2 } from "lucide-react";
import { getLanguageName } from "@/data/languages";

interface TranslatedContentProps {
  title: string;
  arabicTitle?: string;
  originalContent: string;
  translatedContent: string;
  selectedLanguage: string;
  isTranslating: boolean;
}

const TranslatedContent = ({
  title,
  arabicTitle,
  originalContent,
  translatedContent,
  selectedLanguage,
  isTranslating,
}: TranslatedContentProps) => {
  const isOriginal = selectedLanguage === "en";
  const displayContent = isOriginal ? originalContent : translatedContent;

  return (
    <div className="reading-panel">
      <div className="mb-8 pb-6 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground">
            {title}
          </h2>
          {!isOriginal && (
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {getLanguageName(selectedLanguage)}
            </span>
          )}
        </div>
        {arabicTitle && (
          <p className="text-xl md:text-2xl lg:text-3xl text-primary font-display mt-2 arabic-text">
            {arabicTitle}
          </p>
        )}
      </div>

      {isTranslating ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="w-12 h-12 animate-spin mb-4 text-primary" />
          <p className="text-lg font-medium">Translating to {getLanguageName(selectedLanguage)}...</p>
          <p className="text-sm mt-2">This may take a moment</p>
        </div>
      ) : isOriginal ? (
        <div
          className="prose prose-xl max-w-none
            prose-headings:font-display prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-5 prose-p:text-lg prose-p:md:text-xl
            prose-ul:text-muted-foreground prose-ul:my-4 prose-ul:text-lg prose-ul:md:text-xl
            prose-ol:text-muted-foreground prose-ol:my-4 prose-ol:text-lg prose-ol:md:text-xl
            prose-li:my-2
            prose-strong:text-foreground
            prose-blockquote:border-l-primary prose-blockquote:bg-accent/30 
            prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:px-6
            prose-blockquote:text-foreground prose-blockquote:font-display prose-blockquote:not-italic
            prose-blockquote:text-xl prose-blockquote:md:text-2xl
          "
          dangerouslySetInnerHTML={{ __html: originalContent }}
        />
      ) : translatedContent ? (
        <div className="prose prose-xl max-w-none">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg md:text-xl">
            {translatedContent}
          </p>
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">Select a language to see the translation</p>
        </div>
      )}
    </div>
  );
};

export default TranslatedContent;
