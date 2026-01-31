interface ReadingContentProps {
  title: string;
  arabicTitle?: string;
  content: string;
}

const ReadingContent = ({ title, arabicTitle, content }: ReadingContentProps) => {
  return (
    <div className="reading-panel">
      <div className="mb-8 pb-6 border-b border-border">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          {title}
        </h2>
        {arabicTitle && (
          <p className="text-xl md:text-2xl text-primary font-display mt-2 arabic-text">
            {arabicTitle}
          </p>
        )}
      </div>

      <div 
        className="prose prose-xl max-w-none
          prose-headings:font-display prose-headings:text-foreground
          prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-5 prose-p:text-base prose-p:md:text-lg
          prose-ul:text-muted-foreground prose-ul:my-4 prose-ul:text-base prose-ul:md:text-lg
          prose-ol:text-muted-foreground prose-ol:my-4 prose-ol:text-base prose-ol:md:text-lg
          prose-li:my-2
          prose-strong:text-foreground
          prose-blockquote:border-l-primary prose-blockquote:bg-accent/30 
          prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:px-6
          prose-blockquote:text-foreground prose-blockquote:font-display prose-blockquote:not-italic
          prose-blockquote:text-lg prose-blockquote:md:text-xl
        "
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ReadingContent;
