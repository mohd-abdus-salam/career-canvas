interface ReadingContentProps {
  title: string;
  arabicTitle?: string;
  content: string;
}

const ReadingContent = ({ title, arabicTitle, content }: ReadingContentProps) => {
  return (
    <div className="reading-panel">
      <div className="mb-6 pb-4 border-b border-border">
        <h2 className="text-2xl font-display font-bold text-foreground">
          {title}
        </h2>
        {arabicTitle && (
          <p className="text-xl text-primary font-display mt-1 arabic-text">
            {arabicTitle}
          </p>
        )}
      </div>

      <div 
        className="prose prose-lg max-w-none
          prose-headings:font-display prose-headings:text-foreground
          prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
          prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
          prose-ul:text-muted-foreground prose-ul:my-3
          prose-ol:text-muted-foreground prose-ol:my-3
          prose-li:my-1
          prose-strong:text-foreground
          prose-blockquote:border-l-primary prose-blockquote:bg-accent/30 
          prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-4
          prose-blockquote:text-foreground prose-blockquote:font-display prose-blockquote:not-italic
        "
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ReadingContent;
