const Quote = () => {
  return (
    <section className="section-padding bg-card islamic-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-1 bg-primary mx-auto mb-8 rounded-full" />
          
          <blockquote className="font-display text-2xl md:text-3xl text-foreground leading-relaxed mb-6">
            "Indeed, Allah is with those who are patient."
          </blockquote>
          
          <p className="text-primary font-display text-lg">
            — Surah Al-Baqarah, 2:153
          </p>
          
          <div className="w-16 h-1 bg-primary mx-auto mt-8 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Quote;
