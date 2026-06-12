import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  const galleryImages = [
    "src/images/g1.jpg", "src/images/g2.jpg", "src/images/g3.jpg",
    "src/images/g4.jpg", "src/images/g5.jpg", "src/images/g6.jpg",
    "src/images/g7.jpg", "src/images/g8.jpg", "src/images/g9.jpg"
  ];

  return (
    <div className="w-full min-h-screen font-sans bg-white text-slate-700 antialiased overflow-x-hidden selection:bg-yellow-500 selection:text-black">
      
      {/* 1. HERO BANNER SECTION */}
      <section id="home" className="h-screen relative flex items-center justify-start overflow-hidden">
        <img
          src="src/images/18.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          alt="uDrive Hero Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white w-full">
          <span className="text-yellow-500 font-bold uppercase tracking-widest text-xs bg-yellow-500/10 px-3 py-1.5 border border-yellow-500/20 rounded-full inline-block mb-4">
            Welcome to uDrive School
          </span>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-3xl tracking-tight leading-none"
          >
            Learn Driving With <span className="text-yellow-500">Confidence</span>
          </motion.h1>

          <p className="mt-6 text-lg md:text-xl max-w-xl text-neutral-300 font-light leading-relaxed">
            Professional certified instructors and modern dual-controlled training vehicles tailored for your safety.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/Contact"><button className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-8 py-4 font-bold tracking-wide uppercase text-xs transition duration-300 shadow-lg shadow-yellow-500/20">
              Get Started Now
            </button></a>
            <a href="/Modern"><button className="border-2 border-white hover:bg-white hover:text-slate-950 text-white px-8 py-4 font-bold tracking-wide uppercase text-xs transition duration-300">
              Our Courses
            </button></a>
          </div>
        </div>
      </section>

      {/* 2. DUAL IMAGE PIONEER SECTION */}
      <section className="py-24 bg-white text-slate-900 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Split overlapping images layout */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative">
            <div className="col-span-7 h-[380px] overflow-hidden rounded-sm shadow-md">
              <img src="src/images/21.jpg" className="w-full h-full object-cover" alt="Latest Fleet Vehicle" />
            </div>
            <div className="col-span-5 h-[280px] self-end overflow-hidden rounded-sm shadow-lg border-4 border-white transform translate-y-8 -translate-x-4">
              <img src="src/images/Driving.jpg" className="w-full h-full object-cover" alt="Instructor Profile" />
            </div>
            
            {/* Experience Year badge box counter */}
            <div className="absolute -bottom-6 left-6 bg-slate-950 text-white px-6 py-5 shadow-xl flex items-center gap-4 border-l-4 border-yellow-500">
              <span className="text-4xl font-black text-yellow-500 tracking-tight">15+</span>
              <div className="text-xs font-bold uppercase tracking-wider leading-tight text-neutral-300">
                Years of <br /> Excellence
              </div>
            </div>
          </div>

          {/* Right Block: Content Details */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-yellow-600 font-bold uppercase tracking-wider text-xs mb-2 block">About Our Academy</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
              A perfect driving school with latest training vehicles
            </h2>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              We provide comprehensive training environments with adaptive courses designed to build long-term confidence on all types of road routes. Our systems conform completely to current standard highway safe-practices.
            </p>

            {/* Checkpoint items list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {["Certified Professional Instructors", "Dual-Controlled Modern Fleet", "Flexible Scheduling Controls", "Video Assessment Analysis"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                  <span className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
              <div>
                <p className="text-sm font-extrabold text-slate-950">Isaac Herman</p>
                <p className="text-xs text-slate-400 font-medium">Academy Founder & Director</p>
              </div>
              <div className="ml-auto flex gap-2">
                {['Facebook', 'Twitter', 'LinkedIn'].map((social, idx) => (
                  <span key={idx} className="text-xs font-bold text-slate-400 hover:text-yellow-600 cursor-pointer transition">
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE STATISTICS ROW SECTION */}
      <section className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "4000+", label: "Qualified Drivers" },
              { value: "25+", label: "Professional Instructors" },
              { value: "98%", label: "First Time Pass Rate" },
              { value: "50+", label: "Modern Training Cars" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center p-4 border-r last:border-0 border-slate-200/60">
                <span className="text-3xl md:text-4xl font-black text-slate-950 mb-1">{stat.value}</span>
                <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

   <section className="py-28 bg-slate-950 text-white relative overflow-hidden">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>
    <div className="absolute bottom-20 right-20 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>
  </div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    <div className="text-center mb-20">
      <span className="text-yellow-500 uppercase tracking-widest text-sm font-bold">
        Why Choose Us
      </span>
      <h2 className="text-5xl font-extrabold mt-4">
        Driving Excellence Since Day One
      </h2>
    </div>

    <div className="grid md:grid-cols-4 gap-8">
      {[
        "Certified Instructors",
        "Modern Vehicles",
        "Flexible Schedule",
        "98% Pass Rate",
      ].map((item, i) => (
        <div
          key={i}
          className="backdrop-blur-lg bg-white/5 border border-white/10 p-8 rounded-2xl hover:-translate-y-2 transition duration-300"
        >
          <div className="text-yellow-500 text-5xl mb-4">★</div>
          <h3 className="font-bold text-xl">{item}</h3>
        </div>
      ))}
    </div>
  </div>
</section>
<section className="py-28 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-20">
      <h2 className="text-5xl font-extrabold">
        Your Driving Journey
      </h2>
    </div>

    <div className="grid md:grid-cols-4 gap-8">
      {[
        "Register",
        "Theory Training",
        "Road Practice",
        "Get Licensed",
      ].map((step, index) => (
        <div key={index} className="relative text-center">
          <div className="w-24 h-24 bg-yellow-500 rounded-full mx-auto flex items-center justify-center text-3xl font-black text-black shadow-lg">
            {index + 1}
          </div>

          <h3 className="mt-6 text-xl font-bold">
            {step}
          </h3>
        </div>
      ))}
    </div>
  </div>
</section>
<section className="py-28 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-20">
      <h2 className="text-5xl font-extrabold">
        Student Success Stories
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      {[
        "Passed on first attempt",
        "Excellent instructors",
        "Highly recommended"
      ].map((text,index)=>(
        <div
          key={index}
          className="p-8 rounded-3xl shadow-xl bg-gradient-to-br from-yellow-50 to-white border"
        >
          <div className="text-yellow-500 text-4xl mb-4">
            ★★★★★
          </div>

          <p className="text-slate-600">
            {text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
<section className="py-32 bg-yellow-500 relative overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full"></div>
    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/20 rounded-full"></div>
  </div>

  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-6xl font-black text-black mb-6">
      Ready To Get Behind The Wheel?
    </h2>

    <p className="text-xl text-black/70 mb-10">
      Join thousands of successful drivers trained by uDrive.
    </p>

    <a href="/contact">
      <button className="bg-black text-white px-10 py-5 rounded-full text-lg font-bold hover:scale-105 transition">
        Book Your First Lesson
      </button>
    </a>
  </div>
</section>
    </div>

    
  );
}