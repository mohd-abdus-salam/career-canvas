const stats = [
  { value: "50K+", label: "Resumes Generated" },
  { value: "89%", label: "Interview Rate" },
  { value: "30s", label: "Average Generation Time" },
  { value: "100%", label: "ATS Pass Rate" },
];

const Stats = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
