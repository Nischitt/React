import React, { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    setIsSubmitting(true);

    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      category: e.target.category.value,
      instructor: e.target.instructor.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Success! Your message has been transmitted.");
        e.target.reset(); 
      } else {
        setStatus("Transmission failure. Please review your entries.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("Network error: Unable to securely connect to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 font-sans text-slate-600 antialiased overflow-x-hidden selection:bg-amber-400 selection:text-slate-900">
      
      {/* =========================================================================
          1. HERO BANNER
          ========================================================================= */}
      <section className="relative h-[280px] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950 z-10" />
        <img 
          src="/images/contact-banner.jpg" 
          alt="Banner background mesh" 
          className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105" 
        />
        
        {/* Subtle geometric structural network overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] z-10" />

        <div className="relative z-20 text-center px-6">
          <span className="text-[10px] font-black tracking-[0.25em] text-amber-400 uppercase bg-amber-400/10 border border-amber-400/20 px-3.5 py-1 rounded-full">
            Connect With Us
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mt-3 mb-3">
            Get In Touch
          </h1>
          <div className="flex items-center justify-center gap-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            <a href="/Hero" className="hover:text-amber-400 transition duration-200">Home</a>
            <span className="text-slate-600 select-none">/</span>
            <span className="text-slate-100">Contact Gateway</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ENQUIRY FORM & CORPORATE METADATA SECTION
          ========================================================================= */}
      <section className="py-24 relative">
        {/* Blur layout accents to frame the interface card */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-slate-900 shadow-2xl rounded-2xl overflow-hidden border border-slate-800">
            
            {/* Left Column: Corporate Information Details */}
            <div className="lg:col-span-5 bg-slate-950 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-400/5 rounded-full blur-xl pointer-events-none" />
              
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 tracking-wider block mb-1">// HUB LOCATION</span>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">HQ Operations</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">PO Box 16122, Collins Street West,<br />Melbourne, VIC 8007</p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-amber-400 tracking-wider block mb-1">// COMMUNICATIONS</span>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Direct Channels</h4>
                  <p className="text-xs text-slate-400 mt-1">Support: +61 3 9555 0192</p>
                  <p className="text-xs text-slate-400">Intake: desk@schoolaxis.edu</p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-amber-400 tracking-wider block mb-1">// AVAILABILITY</span>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Session Hours</h4>
                  <p className="text-xs text-slate-400 mt-1">Mon – Fri: 07:00 – 21:00</p>
                  <p className="text-xs text-slate-400">Sat – Sun: 08:00 – 16:00</p>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-900 mt-8 lg:mt-0">
                <p className="text-[10px] text-slate-500 leading-normal font-medium tracking-wide">
                  All training operations are monitored through global instructional baseline criteria logs for defensive security parameters.
                </p>
              </div>
            </div>

            {/* Right Column: High-End Interactive Form Fields */}
            <div className="lg:col-span-7 bg-slate-900/40 p-8 md:p-10 backdrop-blur-md">
              <div className="mb-8">
                <h3 className="text-xl font-black text-white tracking-tight">Send Your Enquiry</h3>
                <p className="text-xs text-slate-400 mt-1">We typically dispatch response parameters within 2 business hours.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <input 
                      name="name" 
                      type="text" 
                      placeholder="Your Name" 
                      required 
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-amber-400/80 p-3.5 rounded-xl text-xs text-white outline-none placeholder-slate-600 transition duration-200 focus:shadow-[0_0_12px_rgba(245,158,11,0.05)]" 
                    />
                  </div>
                  <div className="space-y-1">
                    <input 
                      name="phone" 
                      type="text" 
                      placeholder="Phone Number" 
                      required 
                      className="w-full bg-slate-950 border border-slate-800/80 focus:border-amber-400/80 p-3.5 rounded-xl text-xs text-white outline-none placeholder-slate-600 transition duration-200 focus:shadow-[0_0_12px_rgba(245,158,11,0.05)]" 
                    />
                  </div>
                </div>

                <input 
                  name="email" 
                  type="email" 
                  placeholder="Email Address" 
                  required 
                  className="w-full bg-slate-950 border border-slate-800/80 focus:border-amber-400/80 p-3.5 rounded-xl text-xs text-white outline-none placeholder-slate-600 transition duration-200 focus:shadow-[0_0_12px_rgba(245,158,11,0.05)]" 
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select 
                    name="category" 
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-amber-400/80 p-3.5 rounded-xl text-xs text-slate-400 outline-none cursor-pointer transition duration-200"
                  >
                    <option value="student">Beginner Driver Course</option>
                    <option value="license">Advanced Driving Skills Program</option>
                    <option value="course">Complete Driving Mastery Package</option>
                  </select>
                  
                  <select 
                    name="instructor" 
                    className="w-full bg-slate-950 border border-slate-800/80 focus:border-amber-400/80 p-3.5 rounded-xl text-xs text-slate-400 outline-none cursor-pointer transition duration-200"
                  >
                    <option value="isaac">Marcus Vance</option>
                    <option value="isaac">Elena Rostova</option>
                    <option value="isaac">David Chen</option>
                    <option value="isaac">Sarah Jenkins</option>
                  </select>
                </div>

                <textarea 
                  name="message" 
                  rows="4" 
                  placeholder="Provide brief details regarding your schedule parameters..." 
                  className="w-full bg-slate-950 border border-slate-800/80 focus:border-amber-400/80 p-3.5 rounded-xl text-xs text-white outline-none placeholder-slate-600 transition duration-200 resize-none" 
                  required
                />

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-amber-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-600 font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-amber-300 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-amber-400/10 cursor-pointer"
                >
                  {isSubmitting ? "Transmitting..." : "Submit Enquiry"}
                </button>
              </form>

              {/* Dynamic Status Log Overlay Panel */}
              {status && (
                <div className={`mt-5 p-3.5 rounded-xl text-xs font-medium border transition-all duration-300 ${
                  status.includes("Success") 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                    : status.includes("Sending") || status.includes("Transmitting")
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse"
                    : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                }`}>
                  <span className="font-mono font-bold mr-1.5">›</span> {status}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}