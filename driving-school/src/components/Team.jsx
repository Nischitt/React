import React, { useState, useEffect } from 'react';

export default function Team() {
  const teamMembers = [
    {
      name: "Isaac Herman",
      role: "Founder & Head Instructor",
      image: "src/images/17.jpg",
      bio: "Over 20 years of professional driving instruction experience. Dedicated to teaching defensive driving tactics.",
      socials: ["f", "t", "in", "i"]
    },
    {
      name: "Marcus Vance",
      role: "Senior Safety Instructor",
      image: "src/images/19.jpg",
      bio: "Specializes in first-time driver anxiety management and advanced hazard perception training tests.",
      socials: ["f", "t", "in"]
    },
    {
      name: "Elena Rostova",
      role: "Practical Course Trainer",
      image: "src/images/20.jpg",
      bio: "Expert in manual and automatic powertrain control systems, parking maneuvers, and alignment precision.",
      socials: ["f", "in", "i"]
    }
  ];

  return (
    <div className="w-full bg-white font-sans text-gray-700 antialiased overflow-x-hidden selection:bg-yellow-500 selection:text-slate-950">
      
      {/* =========================================================================
          HERO BANNER HEADER
          ========================================================================= */}
      <section className="relative h-[240px] bg-neutral-900 flex flex-col items-center justify-center overflow-hidden">
        <img 
          src="src/images/contact-banner.jpg" 
          alt="Team page banner background" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Meet Our Team</h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-wider text-neutral-400 uppercase">
            <span className="hover:text-yellow-500 cursor-pointer transition">Home</span>
            <span className="text-yellow-500 font-normal">»</span>
            <span className="text-white">Our Team</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TEAM GRID SECTION
          ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center mb-16 relative">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Professionals Behind the Wheel</h2>
            <div className="absolute right-0 top-0 text-yellow-500 tracking-tighter text-sm font-bold select-none opacity-50 pointer-events-none">»»»»»</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="border border-gray-100 bg-white p-5 shadow-xs rounded-xs flex flex-col justify-between">
                <div>
                  {/* Photo frame container with architectural asymmetric crop */}
                  <div className="relative w-full aspect-[4/5] bg-gray-50 rounded-bl-[40px] overflow-hidden border border-gray-100 shadow-sm mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className="text-[9px] font-bold uppercase tracking-widest text-yellow-600 block mb-1">
                    {member.role}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-950 mb-2">{member.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                {/* Social media connections row bar */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-[8px] uppercase tracking-wider text-gray-400 font-bold mb-2">FOLLOW</p>
                  <div className="flex gap-1.5">
                    {member.socials.map((social, i) => (
                      <span 
                        key={i} 
                        className="w-6 h-6 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] text-slate-400 font-medium hover:bg-yellow-500 hover:text-slate-950 cursor-pointer transition"
                      >
                        {social}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}