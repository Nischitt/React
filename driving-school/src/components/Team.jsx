import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📡 Fetch live backend team data on component mount
  useEffect(() => {
fetch(`${API_URL}/api/team`)      .then((res) => res.json())
      .then((data) => {
        const formattedMembers = data.map((member) => {
          const socialsArray = [];
          if (member.fbUrl) socialsArray.push({ type: 'facebook', url: member.fbUrl });
          if (member.twUrl) socialsArray.push({ type: 'twitter', url: member.twUrl });
          if (member.lnUrl) socialsArray.push({ type: 'linkedin', url: member.lnUrl });
          
          return {
            id: member._id || member.id,
            name: member.name,
            role: member.title || "Driving Instructor", 
            image: member.image,
            bio: member.bio || "Professional driving tutor dedicated to safety and confidence on the road.",
            socials: socialsArray,
          };
        });

        setTeamMembers(formattedMembers);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Roster fetch error:', err);
        setLoading(false);
      });
  }, []);

  // Structural SVG icon dictionary mapping type to layout graphic
  const getSocialIcon = (type) => {
    switch (type) {
      case 'facebook':
        return <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>;
      case 'twitter':
        return <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>;
      case 'linkedin':
        return <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-slate-50 font-sans text-slate-600 antialiased overflow-x-hidden selection:bg-amber-400 selection:text-slate-900">
      
      {/* =========================================================================
          HERO BANNER HEADER
          ========================================================================= */}
      <section className="relative h-[280px] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950 z-10" />
        <img 
          src="/images/contact-banner.jpg" 
          alt="Team background" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 scale-105"
        />
        
        {/* Subtle geometric overlay lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] z-10" />

        <div className="relative z-20 text-center px-6">
          <span className="text-[10px] font-black tracking-[0.25em] text-amber-400 uppercase bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
            Expert Roster
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mt-3 mb-3">
            Professionals Behind the Wheel
          </h1>
          
          <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            <span className="hover:text-amber-400 cursor-pointer transition duration-200">Home</span>
            <span className="text-amber-500 font-light select-none">/</span>
            <span className="text-slate-100">Our Team</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TEAM GRID SECTION
          ========================================================================= */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Main Content Section Title Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200/60 gap-4">
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                Meet Our Certified Instructors
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mt-1">
                Licensed professionals dedicated to adaptive safety education and defensive driving mastery.
              </p>
            </div>
            <div className="text-amber-500 font-mono tracking-tighter text-sm font-black select-none opacity-40 hidden md:block">
              //// ROSTER
            </div>
          </div>

          {/* ⏳ Skeleton Loading State Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white border border-slate-200/50 rounded-2xl p-5 space-y-4 shadow-sm animate-pulse">
                  <div className="w-full aspect-[4/5] bg-slate-100 rounded-xl rounded-bl-[48px]" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                  <div className="h-5 bg-slate-100 rounded w-2/3" />
                  <div className="space-y-2 pt-2">
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {teamMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="group bg-white border border-slate-200/60 hover:border-slate-300/80 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Fine linear decorative card crown accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="text-left">
                    {/* Architectural asymmetric crop photo frame with zoom tracking effect */}
                    <div className="relative w-full aspect-[4/5] bg-slate-50 rounded-xl rounded-bl-[48px] overflow-hidden border border-slate-100 shadow-inner mb-5">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-500"
                        onError={(e) => { e.target.src = '/images/default-avatar.jpg'; }} 
                      />
                      <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200/30 px-2.5 py-1 rounded-md inline-block mb-2">
                      {member.role}
                    </span>
                    
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors duration-200 mb-2">
                      {member.name}
                    </h3>
                    
                    <p className="text-xs text-slate-400 leading-relaxed font-normal mb-6 min-h-[48px]">
                      {member.bio}
                    </p>
                  </div>

                  {/* Social media connections row bar */}
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                      Connect
                    </span>
                    
                    <div className="flex gap-2">
                      {member.socials.length > 0 ? (
                        member.socials.map((social, i) => (
                          <a 
                            key={i}
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-900 border border-slate-200/60 flex items-center justify-center text-slate-400 hover:text-amber-400 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                            title={`Visit ${member.name}'s ${social.type}`}
                          >
                            {getSocialIcon(social.type)}
                          </a>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-300 italic font-medium">Internal Profile Only</span>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}