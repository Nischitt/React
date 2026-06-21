import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API_URL } from '../config';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // 1. Fetch Dynamic Reviews from Backend API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/public/reviews`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setReviews(data);
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
        // Fallback mock data if server isn't running yet
        setReviews([
          { id: 1, customerName: "Sarah M.", rating: 5, comment: "Passed my test on the first try! The dual-control cars made me feel completely safe.", createdAt: new Date() },
          { id: 2, customerName: "David K.", rating: 5, comment: "Amazing instructors. Very patient and clear with their parking instructions.", createdAt: new Date() },
          { id: 3, customerName: "James L.", rating: 4, comment: "Flexible schedules helped me fit driving lessons around my college classes easily.", createdAt: new Date() }
        ]);
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, []);

  // 2. Auto-play Carousel Loop Timer for Student Testimonials
  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // Transitions to next slide every 6 seconds
    return () => clearInterval(interval);
  }, [reviews]);

  // Framer Motion Animation Presets for Clean Layout Reveals
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="w-full min-h-screen font-sans bg-white text-slate-700 antialiased overflow-x-hidden selection:bg-yellow-500 selection:text-black">
      
      {/* 1. HERO BANNER SECTION */}
      <section id="home" className="h-screen relative flex items-center justify-start overflow-hidden">
        <motion.img
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src="src/images/18.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center"
          alt="uDrive Hero Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white w-full">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-yellow-500 font-bold uppercase tracking-widest text-xs bg-yellow-500/10 px-3 py-1.5 border border-yellow-500/20 rounded-full inline-block mb-4"
          >
            Welcome to uDrive School
          </motion.span>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold max-w-3xl tracking-tight leading-none"
          >
            Learn Driving With <span className="text-yellow-500">Confidence</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-lg md:text-xl max-w-xl text-neutral-300 font-light leading-relaxed"
          >
            Professional certified instructors and modern dual-controlled training vehicles tailored for your safety.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="/Contact">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-8 py-4 font-bold tracking-wide uppercase text-xs transition duration-300 shadow-lg shadow-yellow-500/20 active:scale-95">
                Get Started Now
              </button>
            </a>
            <a href="/Modern">
              <button className="border-2 border-white hover:bg-white hover:text-slate-950 text-white px-8 py-4 font-bold tracking-wide uppercase text-xs transition duration-300 active:scale-95">
                Our Courses
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. DUAL IMAGE PIONEER SECTION */}
      <section className="py-24 bg-white text-slate-900 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Block: Overlapping images with subtle entrance transition */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:col-span-6 grid grid-cols-12 gap-4 relative"
          >
            <div className="col-span-7 h-[380px] overflow-hidden rounded-sm shadow-md">
              <img src="src/images/21.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-500" alt="Latest Fleet Vehicle" />
            </div>
            <div className="col-span-5 h-[280px] self-end overflow-hidden rounded-sm shadow-lg border-4 border-white transform translate-y-8 -translate-x-4">
              <img src="src/images/Driving.jpg" className="w-full h-full object-cover hover:scale-105 transition duration-500" alt="Instructor Profile" />
            </div>
            
            <div className="absolute -bottom-6 left-6 bg-slate-950 text-white px-6 py-5 shadow-xl flex items-center gap-4 border-l-4 border-yellow-500">
              <span className="text-4xl font-black text-yellow-500 tracking-tight">15+</span>
              <div className="text-xs font-bold uppercase tracking-wider leading-tight text-neutral-300">
                Years of <br /> Excellence
              </div>
            </div>
          </motion.div>

          {/* Right Block: Content Details */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="lg:col-span-6 flex flex-col justify-center"
          >
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
          </motion.div>

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

      {/* 4. WHY CHOOSE US SECTION */}
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
            <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
              Driving Excellence Since Day One
            </h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              "Certified Instructors",
              "Modern Vehicles",
              "Flexible Schedule",
              "98% Pass Rate",
            ].map((item, i) => (
              <motion.div
                variants={fadeInUp}
                key={i}
                className="backdrop-blur-lg bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-yellow-500/30 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-yellow-500 text-5xl mb-4 select-none">★</div>
                <h3 className="font-bold text-xl">{item}</h3>
                <p className="text-sm text-neutral-400 mt-2 font-light">Top tier safety and operational systems standard.</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. ROADMAP DRIVING JOURNEY STEPS */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950">
              Your Driving Journey
            </h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              "Register Online",
              "Theory Training",
              "Road Practice",
              "Get Licensed",
            ].map((step, index) => (
              <motion.div variants={fadeInUp} key={index} className="relative text-center group">
                <div className="w-24 h-24 bg-yellow-500 rounded-full mx-auto flex items-center justify-center text-3xl font-black text-black shadow-lg shadow-yellow-500/10 group-hover:scale-110 transition duration-300">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-950">
                  {step}
                </h3>
                <p className="text-xs text-slate-400 mt-2 max-w-[200px] mx-auto">Streamlined pathways managed by our direct agents.</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. DYNAMIC STUDENT SUCCESS STORIES CAROUSEL */}
      <section className="py-24 bg-slate-50 border-t border-b border-slate-100 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-yellow-600 uppercase tracking-widest text-xs font-bold block mb-2">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-12">Dynamic Student Success Stories</h2>
          
          <div className="min-h-[220px] flex items-center justify-center relative">
            {loadingReviews ? (
              <div className="text-slate-400 animate-pulse">Loading feedback updates...</div>
            ) : reviews.length === 0 ? (
              <p className="text-slate-400 italic">No approved student stories available yet.</p>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReviewIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-xl max-w-2xl mx-auto relative"
                >
                  <div className="text-yellow-500 text-2xl mb-4 select-none">
                    {'★'.repeat(reviews[currentReviewIndex].rating)}{'☆'.repeat(5 - reviews[currentReviewIndex].rating)}
                  </div>
                  <p className="text-slate-700 italic text-lg leading-relaxed mb-6">
                    "{reviews[currentReviewIndex].comment}"
                  </p>
                  <h4 className="font-bold text-slate-900 text-base">{reviews[currentReviewIndex].customerName}</h4>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Verified Graduate</span>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Interactive Pagination Dot Controls */}
          {reviews.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentReviewIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentReviewIndex ? 'w-8 bg-yellow-500' : 'w-2.5 bg-slate-300'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. CALL TO ACTION SECTION */}
      <section className="py-32 bg-yellow-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/20 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-black tracking-tight mb-6">
            Ready To Get Behind The Wheel?
          </h2>

          <p className="text-lg md:text-xl text-black/70 mb-10 max-w-xl mx-auto font-medium">
            Join thousands of successful drivers trained by uDrive.
          </p>

          <a href="/contact">
            <button className="bg-black text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:bg-neutral-900 transition transform hover:scale-105 active:scale-95">
              Book Your First Lesson
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}