import React from "react";

export default function Modrn() {
  return (
    <div className="w-full bg-white font-sans text-gray-700 antialiased overflow-x-hidden">

      {/* =========================================================================
          SECTION 1: A PERFECT DRIVING SCHOOL WITH LATEST VEHICLES
          ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Driving Car Image */}
          <div className="lg:col-span-5">
            <div className="w-full aspect-[4/5] rounded-sm overflow-hidden shadow-lg">
              <img 
                src="/images/23.jpg" 
                alt="A perfect driving school with latest vehicles" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center: Main Content Block */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
              A perfect driving school with latest vehicles
            </h2>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">SINCE</span>
              <span className="text-3xl font-black text-slate-900">2026</span>
              <span className="text-yellow-500 font-bold text-xl ml-1 tracking-tighter">»»»»»</span>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed mb-4">
              Explain to you how all this mistaken denouncing pleasure and praising pain was born and we will give you a complete account of the system, and expound the actual teachings.
            </p>
            <p className="text-gray-400 text-[11px] leading-relaxed mb-6">
              Mistaken denouncing pleasure and praising pain was born and we will give you complete account of the system expound.
            </p>

            {/* Signature & Founder Block */}
            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
              <div className="w-24 opacity-80">
                <img src="/images/17.jpg" alt="Signature" className="w-full object-contain" />
              </div>
              <div className="h-8 w-[1px] bg-gray-200" />
              <div>
                <p className="text-xs font-bold text-slate-900">Isaac Herman</p>
                <p className="text-[10px] text-gray-400 font-medium">Founder</p>
              </div>
            </div>

            <button className="mt-6 self-start bg-slate-950 text-white text-[9px] uppercase tracking-widest font-bold px-6 py-3 hover:bg-slate-900 transition">
              READ MORE
            </button>
          </div>

          {/* Right: Founder Profile & Social Media Links */}
          <div className="lg:col-span-3 flex flex-col items-start pl-4">
            <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-bl-[80px] overflow-hidden border border-gray-100 shadow-sm">
              <img 
                src="/images/17.jpg" 
                alt="Isaac Herman Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 w-full">
              <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-2">FOLLOW ME ON</p>
              <div className="flex gap-2">
                {["f", "t", "in", "i"].map((social, i) => (
                  <span 
                    key={i} 
                    className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-xs text-slate-400 font-medium hover:bg-yellow-500 hover:text-slate-950 cursor-pointer transition"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SERVICES CUSTOMIZED FOR YOU (Dark Block)
          ========================================================================= */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-14">
            <h2 className="text-2xl font-bold tracking-tight text-white">Services customized for you</h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Student Course", desc: "Aenean at facilisis mauris. Praesent eget est vel mauris convallis porttitor.", img: "/images/14.jpg", icon: "🚗" },
              { title: "Student License", desc: "Duis fringilla nunc velit, scelerisque libero iaculis. Ut pulvinar pretium justo.", img: "/images/15.jpg", icon: "🛡️" },
              { title: "Road Safety Guide", desc: "Mauris vitae quam vitae neque come ravida. Vivamus libero tellus vitae.", img: "/images/16.jpg", icon: "🏆" }
            ].map((service, index) => (
              <div key={index} className="bg-neutral-800 rounded-xs overflow-hidden border border-neutral-700/30 flex flex-col justify-between">
                <div className="relative h-48 bg-neutral-700">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                  {/* Decorative Yellow Icon Badge Top Left */}
                  <div className="absolute top-0 left-0 bg-yellow-500 w-10 h-10 flex items-center justify-center text-lg text-slate-950">
                    {service.icon}
                  </div>
                  <div className="absolute top-0 left-11 w-2 h-2 bg-yellow-500/80 m-0.5" />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="mb-6">
                    <h3 className="text-sm font-bold mb-2 text-neutral-100">{service.title}</h3>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">{service.desc}</p>
                  </div>
                  
                  {/* Read More Simulated Arrow Button Strip */}
                  <div className="border-t border-neutral-700/60 pt-3 flex items-center justify-between cursor-pointer group">
                    <span className="text-[9px] font-bold text-neutral-400 tracking-widest uppercase group-hover:text-yellow-500 transition">
                      »»»»» READ MORE
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10 text-[10px] text-neutral-500">
            <span className="cursor-pointer font-bold">‹</span>
            <span className="cursor-pointer">01</span>
            <span className="cursor-pointer text-yellow-500 font-bold">. 02 .</span>
            <span className="cursor-pointer">03</span>
            <span className="cursor-pointer font-bold">›</span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION: HERE TO HELP YOU BECOME A GREAT DRIVER
          ========================================================================= */}
      <section className="py-20 bg-[#white] text-white relative">
        {/* Top-left yellow accent stripes */}
        <div className="absolute top-10 left-6 flex gap-1 select-none">
          <span className="text-yellow-500 font-bold tracking-tighter text-sm">////</span>
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold tracking-tight text-black">
              Here to help you become<br />a great driver
            </h2>
          </div>

          {/* 6-Grid Feature Cards Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: "01", title: "Trained Instructors", desc: "Denounce with righteous indignation & men who are so beguiled." },
              { id: "02", title: "Fair Pricing Plans", desc: "In a free hour when our power of choice when nothing prevents." },
              { id: "03", title: "Well Maintained Vehicles", desc: "The duties of duty or the obligations business frequently occur that pleasure." },
              { id: "04", title: "Best Safety Measures", desc: "Blame cases states the obligation business frequently occur that pleasure." },
              { id: "05", title: "Pick Up & Drop Off On Time", desc: "Denounce with righteous indignation & men who are so beguiled." },
              { id: "06", title: "Flexible Course Completion", desc: "Nails free hour when our power of choice when nothing well prevents." }
            ].map((item, index) => (
              <div key={index} className="bg-white text-slate-900 p-6 border border-gray-100 rounded-sm relative shadow-sm flex flex-col justify-between min-h-[160px]">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xs font-black text-slate-950 tracking-wide uppercase">{item.title}</h4>
                    <span className="text-[10px] font-bold text-gray-300 border-b border-gray-100 pb-0.5">{item.id}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}