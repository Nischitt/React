export default function Stats() {
  const stats = [
    ["5000+", "Students"],
    ["98%", "Pass Rate"],
    ["15+", "Years"],
    ["25+", "Instructors"]
  ];

  return (
    <section className="bg-yellow-500 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center text-white">
        {stats.map(([num, label]) => (
          <div key={label}>
            <h3 className="text-5xl font-bold">
              {num}
            </h3>

            <p>{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}