import React from "react";

export default function Mission() {
  return (
    <div className="w-full bg-slate-50 font-sans text-slate-600 antialiased overflow-x-hidden selection:bg-amber-400 selection:text-slate-900">
      
      {/* =========================================================================
          HERO BANNER HEADER
          ========================================================================= */}
      <section className="relative h-[280px] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950 z-10" />
        <img 
          src="/images/contact-banner.jpg" 
          alt="Mission vision background" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 scale-105"
        />
        
        {/* Fine architectural backdrop mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] z-10" />

        <div className="relative z-20 text-center px-6">
          <span className="text-[10px] font-black tracking-[0.25em] text-amber-400 uppercase bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full">
            Corporate Blueprint
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mt-3 mb-3">
            Mission & Vision
          </h1>
          <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            <span className="hover:text-amber-400 cursor-pointer transition duration-200">Home</span>
            <span className="text-slate-600 select-none">/</span>
            <span className="text-slate-100">Our Framework</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          STRATEGIC CORE VALUES SEGMENTS
          ========================================================================= */}
      <section className="py-24 relative overflow-hidden">
        {/* Fluid structural backdrop blur nodes */}
        <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 space-y-32 relative z-10">
          
          {/* Row 1: The Core Mission Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 text-left space-y-5">
              <div className="inline-flex items-center gap-2.5 bg-amber-50 border border-amber-200/40 px-3 py-1 rounded-md">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Our Strategic Intent</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                To cultivate safe, responsible, and defensive drivers for a lifetime journey.
              </h2>
              
              <div className="h-[2px] w-12 bg-amber-400 rounded" />
              
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-normal">
                We bridge the gap between technical mechanical controls and protective road awareness. Our structural teaching protocols ensure that every driver handles challenging routes with tactical focus, sharp reflexes, and situational clarity.
              </p>
              
              {/* Micro Core Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border border-slate-200/60 bg-white/50 backdrop-blur-xs p-3.5 rounded-xl">
                  <span className="text-lg block mb-1">🛡️</span>
                  <p className="text-xs font-black text-slate-900">Defensive Tactics</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Anticipate hazards accurately.</p>
                </div>
                <div className="border border-slate-200/60 bg-white/50 backdrop-blur-xs p-3.5 rounded-xl">
                  <span className="text-lg block mb-1">🧠</span>
                  <p className="text-xs font-black text-slate-900">Cognitive Focus</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Stress-free high-traffic logic.</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 group">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200/40 bg-slate-100">
                <img 
                  src="/images/19.jpg" 
                  alt="Our Mission graphic" 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-slate-950/5 group-hover:opacity-0 transition-opacity duration-300" />
                <span className="absolute bottom-4 right-4 backdrop-blur-md bg-white/80 text-slate-900 font-bold text-[10px] px-3 py-1 rounded-lg border border-white/40 tracking-wide shadow-sm">
                  Est. Standards
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: The Core Vision Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-last lg:order-first group">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200/40 bg-slate-100">
                <img 
                  src="/images/1.jpg" 
                  alt="Our Vision graphic" 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-slate-950/5 group-hover:opacity-0 transition-opacity duration-300" />
                <span className="absolute top-4 left-4 backdrop-blur-md bg-slate-950/80 text-amber-400 font-bold text-[10px] px-3 py-1 rounded-lg border border-slate-800 tracking-wide shadow-sm">
                  Future Horizon
                </span>
              </div>
            </div>
            
            <div className="lg:col-span-6 text-left space-y-5">
              <div className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200/40 px-3 py-1 rounded-md">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-blue-800 uppercase tracking-widest">Future Outlook</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Setting global benchmarks for modern defensive automotive safety instruction.
              </h2>
              
              <div className="h-[2px] w-12 bg-blue-500 rounded" />
              
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-normal">
                Our horizon focuses on introducing simulation testing frameworks, adaptive biometric feedback analysis, and eco-friendly fleet systems to maintain an industry-leading standard for driver training ecosystems.
              </p>
              
              {/* Polished Glassmorphic Commit Box */}
              <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl flex items-center gap-3.5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-xl" />
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black shrink-0 shadow-md">
                  ✓
                </span>
                <div>
                  <p className="text-xs font-black text-white tracking-wide">Target Zero Incidents</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Committed to absolute safety and protective highway navigation paths.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}