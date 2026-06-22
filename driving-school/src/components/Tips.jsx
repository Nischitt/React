import React, { useState } from "react";

export default function Tips() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Guidelines" },
    { id: "beginner", label: "Beginner Essentials" },
    { id: "defensive", label: "Defensive Driving" },
    { id: "test-prep", label: "Test Preparation" }
  ];

  const tips = [
    {
      id: 1,
      category: "beginner",
      title: "Perfecting Your Seating Position & Mirror Setup",
      difficulty: "Beginner",
      timeToRead: "3 min read",
      icon: "💺",
      summary: "Before turning the key, ensure your posture allows full pedal control and your blind spots are minimized.",
      steps: [
        "Adjust seat height so your hips are at least as high as your knees.",
        "Ensure your wrists can rest comfortably on top of the steering wheel with your back flat against the backrest.",
        "Set side mirrors wide enough so you barely see the trailing edge of your own vehicle frame."
      ]
    },
    {
      id: 2,
      category: "defensive",
      title: "The 3-Second Following Distance Rule",
      difficulty: "Essential",
      timeToRead: "4 min read",
      icon: "⏱️",
      summary: "Maintaining adequate space cushions gives you precious reaction time if the leading vehicle suddenly brakes.",
      steps: [
        "Pick a fixed object ahead like a signpost, tree, or overhead bridge.",
        "When the car in front passes it, count: One-one-thousand, two-one-thousand, three-one-thousand.",
        "If you pass the same object before finishing your count, back off to increase the gap."
      ]
    },
    {
      id: 3,
      category: "test-prep",
      title: "Mastering the Over-the-Shoulder Blind Spot Check",
      difficulty: "Critical",
      timeToRead: "2 min read",
      icon: "👁️",
      summary: "Mirrors show a lot, but they don't show everything. Examiners strictly look for distinct head movements.",
      steps: [
        "Check your interior rearview mirror, then activate your directional signal indicator.",
        "Perform a quick 90-degree chin-to-shoulder glance toward the lane direction you intend to merge into.",
        "Verify clear path clearance before executing any lateral steering displacement."
      ]
    },
    {
      id: 4,
      category: "defensive",
      title: "Managing Adverse Weather & Hydroplaning Risks",
      difficulty: "Advanced",
      timeToRead: "5 min read",
      icon: "🌧️",
      summary: "Wet roads dramatically decrease friction coefficients. Learn how to maintain traction during sudden heavy downpours.",
      steps: [
        "Reduce travel speeds by at least 5-10 mph below limits when driving on rain-slicked asphalt surface layers.",
        "If the vehicle begins to slide, take your foot off the accelerator pedal immediately—do not stomp the brakes.",
        "Steer smoothly into the direction of the skid to regain mechanical directional alignment control."
      ]
    }
  ];

  const filteredTips = activeCategory === "all" 
    ? tips 
    : tips.filter(tip => tip.category === activeCategory);

  return (
    <div className="w-full bg-slate-50 font-sans text-slate-600 antialiased overflow-x-hidden selection:bg-amber-400 selection:text-slate-900">
      
      {/* =========================================================================
          1. HERO BANNER HEADER
          ========================================================================= */}
      <section className="relative h-[280px] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950 z-10" />
        <img 
          src="/images/contact-banner.jpg" 
          alt="Driving tips background" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 scale-105"
        />
        
        {/* Fine background grid line pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] z-10" />

        <div className="relative z-20 text-center px-6">
          <span className="text-[10px] font-black tracking-[0.25em] text-amber-400 uppercase bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full">
            Knowledge Base
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mt-3 mb-3">
            Pro Driving Tips
          </h1>
          <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            <a href="/Hero" className="hover:text-amber-400 transition duration-200">Home</a>
            <span className="text-slate-600 select-none">/</span>
            <span className="text-slate-100">Tips & Guides</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MAIN GUIDELINES & INTERACTIVE FILTER INTERFACE
          ========================================================================= */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-left mb-12 border-b border-slate-200/60 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Essential Skills for the Modern Roadway
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Curated training briefs directly from our certified expert structural instruction staff members.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-600 tracking-wider hidden md:inline">
              // {filteredTips.length} GUIDES FOUND
            </span>
          </div>

          {/* Filter Toggles Row */}
          <div className="flex flex-wrap items-center gap-2 mb-12 bg-slate-200/40 p-1.5 rounded-2xl w-fit mx-auto md:mx-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-[11px] uppercase tracking-wider font-extrabold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-white text-slate-900 shadow-md shadow-slate-900/5"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tips Render Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredTips.map((tip) => (
              <div 
                key={tip.id} 
                className="group bg-white border border-slate-200/60 hover:border-slate-300/80 rounded-2xl p-6 lg:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Thin top hover layout accent strip */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="text-left">
                  {/* Badge Row Header */}
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-black text-slate-400 mb-5">
                    <span className="bg-slate-950 text-amber-400 px-2.5 py-1 rounded-md tracking-widest font-mono">
                      {tip.difficulty}
                    </span>
                    <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md font-bold">
                      ⏱️ {tip.timeToRead}
                    </span>
                  </div>

                  {/* Guide Heading title */}
                  <div className="flex gap-3 items-start mb-4">
                    <span className="text-2xl bg-amber-50 border border-amber-200/30 p-2 rounded-xl shrink-0">
                      {tip.icon}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors duration-200 tracking-tight leading-snug self-center">
                      {tip.title}
                    </h3>
                  </div>

                  {/* Summary Block Quote */}
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed bg-slate-50 border-l-3 border-amber-400 p-4 mb-6 rounded-r-xl font-normal">
                    {tip.summary}
                  </p>

                  {/* Ordered Step List */}
                  <ol className="space-y-3.5 mb-2">
                    {tip.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-3.5 text-xs text-slate-600 leading-relaxed items-start">
                        <span className="w-5 h-5 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center font-mono font-black text-[10px] shrink-0 shadow-sm">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5 font-medium">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Simulated Chevron Action strip indicator link */}
                <div className="border-t border-slate-100 pt-5 mt-8 flex justify-between items-center cursor-pointer">
                  <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase group-hover:text-amber-600 transition duration-200 flex items-center gap-1">
                    Explore Deep Breakdown <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}