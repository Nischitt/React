import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if a student or client session is active on layout mount
  useEffect(() => {
    const token = localStorage.getItem('studentToken') || localStorage.getItem('clientToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('clientToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    window.location.href = '/hero';
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 z-[9999] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Identity Typography */}
          <a href="/hero" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-amber-500/20 transform group-hover:rotate-6 transition-transform">
              u
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              drive<span className="text-amber-500 font-serif">.</span>
            </h1>
          </a>

          {/* Desktop Navigation Link Nodes */}
          <div className="hidden lg:flex items-center gap-3 font-semibold text-[15px] tracking-wide text-slate-700">
            
            {/* HOME DROPDOWN */}
            <div className="relative group px-4 py-3">
              <a href="/hero"><button className="flex items-center gap-2 py-2 cursor-pointer transition-all duration-300 hover:text-amber-500 hover:scale-105">
                Home 
              </button></a>
              
            </div>

            {/* ABOUT DROPDOWN */}
            <div className="relative group px-3 py-2">
              <button className="flex items-center gap-2 py-2 cursor-pointer transition-all duration-300 hover:text-amber-500 hover:scale-105">
                About 
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-white border border-slate-200/60 shadow-xl rounded-xl p-2 w-52 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <a href="/about" className="block px-4 py-2.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-slate-50 transition font-medium normal-case tracking-normal text-xs">
                  About Our Academy
                </a>
                <a href="/team" className="block px-4 py-2.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-slate-50 transition font-medium normal-case tracking-normal text-xs">
                  Certified Instructors
                </a>
                <a href="/mission" className="block px-4 py-2.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-slate-50 transition font-medium normal-case tracking-normal text-xs">
                  Mission & Vision
                </a>
              </div>
            </div>

            {/* COURSES DROPDOWN */}
            <div className="relative group px-3 py-2">
              <button className="flex items-center gap-2 py-2 cursor-pointer transition-all duration-300 hover:text-amber-500 hover:scale-105">
                Courses 
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-white border border-slate-200/60 shadow-xl rounded-xl p-2 w-52 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
<a href="/modern" className="block px-4 py-2.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-slate-50 transition font-medium normal-case tracking-normal text-xs">
                  Modern Matrix Course
                </a>
              {/* Add this inside your BLOG DROPDOWN or as a new link */}


               {/* <a href="/single" className="block px-4 py-2.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-slate-50 transition font-medium normal-case tracking-normal text-xs">
                  Single Session Module
                </a> */}
              </div>
            </div>

            {/* BLOG DROPDOWN */}
            <div className="relative group px-3 py-2">
              <button className="flex items-center gap-2 py-2 cursor-pointer transition-all duration-300 hover:text-amber-500 hover:scale-105">
                Blog 
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-white border border-slate-200/60 shadow-xl rounded-xl p-2 w-52 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
<a href="/blog" className="block px-4 py-2.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-slate-50 transition font-medium normal-case tracking-normal text-xs">
                  View Shared Posts
                </a>
<a href="/tips" className="block px-4 py-2.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-slate-50 transition font-medium normal-case tracking-normal text-xs">
                  Defensive Driving Tips
                </a>
              </div>
            </div>

            {/* CONTACT NODE */}
            <a href="/contact" className="hidden lg:flex items-center gap-3 font-semibold text-[15px] tracking-wide text-slate-700">
              Contact
            </a>
            <a href="/CustomerReviews" className="hidden lg:flex items-center gap-3 font-semibold text-[15px] tracking-wide text-slate-700">
              Reviews
            </a>

          </div>

          {/* User Account Controls Context Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2.5">
                <button 
onClick={() => (window.location.href = '/userprofile')}
                  className="bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-200 font-bold text-[10px] tracking-wider uppercase transition active:scale-95 cursor-pointer"
                >
                  Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="bg-rose-500 text-white px-4 py-2.5 rounded-xl hover:bg-rose-600 font-bold text-[10px] tracking-wider uppercase transition shadow-md shadow-rose-500/10 active:scale-95 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => window.location.href = '/loginsignup'}
                className="bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl hover:bg-amber-300 font-black text-[10px] tracking-widest uppercase shadow-md shadow-amber-400/10 transition active:scale-95 cursor-pointer"
              >
                Access Account
              </button>
            )}
          </div>

          {/* Native Mobile Menu Trigger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </nav>

      {/* =========================================================================
          MOBILE OVERLAY DRAWER PANEL
          ========================================================================= */}
      <div className={`fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-[9998] lg:hidden transition-opacity duration-300 ${
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`} onClick={() => setMobileMenuOpen(false)}>
        <div 
          className={`absolute top-0 right-0 w-72 h-full bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-6 pt-16">
            <div className="flex flex-col gap-4 font-bold text-xs tracking-wider text-slate-400 uppercase">
              <span className="text-slate-900 block border-b border-slate-100 pb-1">Navigation</span>
              <a href="/hero" className="text-slate-600 hover:text-amber-500 transition py-1">Home Base</a>
              <a href="/about" className="text-slate-600 hover:text-amber-500 transition py-1">About Profile</a>
              <a href="/modern" className="text-slate-600 hover:text-amber-500 transition py-1">Our Courses</a>
              <a href="/tips" className="text-slate-600 hover:text-amber-500 transition py-1">Driving Tips</a>

              <a href="/contact" className="text-slate-600 hover:text-amber-500 transition py-1">Contact Gateway</a>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            {isLoggedIn ? (
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => window.location.href = '/userprofile'}
                  className="bg-slate-100 text-slate-700 p-3 rounded-xl font-bold text-[10px] tracking-wider uppercase text-center"
                >
                  Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="bg-rose-500 text-white p-3 rounded-xl font-bold text-[10px] tracking-wider uppercase text-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => window.location.href = '/loginsignup'}
                className="w-full bg-amber-400 text-slate-950 p-3.5 rounded-xl font-black text-[10px] tracking-widest uppercase text-center shadow-md shadow-amber-400/10"
              >
                Access Account
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Structural layout buffer offset spacer */}
      <div className="h-20 w-full" />
    </>
  );
}