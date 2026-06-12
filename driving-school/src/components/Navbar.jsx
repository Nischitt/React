import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if a student is logged in when the navbar loads
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
    window.location.href = '/hero'; // Redirect to homepage after logout
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-[9999]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/hero">
          <h1 className="text-3xl font-bold text-yellow-500">udrive</h1>
        </a>

        {/* Menu */}
        <div className="flex gap-8 font-medium">

          {/* HOME */}
          <div className="relative group">
            <button className="py-2">HOME</button>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md w-48 z-[9999]">
              <a href="/hero" className="block px-4 py-3 hover:bg-gray-100">
                Home Page
              </a>
            </div>
          </div>

          {/* ABOUT */}
          <div className="relative group">
            <button className="py-2">ABOUT</button>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md w-56 z-[9999]">
              <a href="/about" className="block px-4 py-3 hover:bg-gray-100">
                About Us
              </a>
              <a href="/team" className="block px-4 py-3 hover:bg-gray-100">
                Our Team
              </a>
              <a href="/mission" className="block px-4 py-3 hover:bg-gray-100">
                Mission & Vision
              </a>
            </div>
          </div>

          {/* COURSES */}
          <div className="relative group">
            <button className="py-2">COURSES</button>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md w-56 z-[9999]">
              <a href="/Modern" className="block px-4 py-3 hover:bg-gray-100">
                Modern Course
              </a>
              <a href="/single" className="block px-4 py-3 hover:bg-gray-100">
                Single Course
              </a>
            </div>
          </div>

          {/* BLOG */}
          <div className="relative group">
            <button className="py-2">BLOG</button>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md w-56 z-[9999]">
              <a href="/Blog" className="block px-4 py-3 hover:bg-gray-100">
                View Blog
              </a>
              <a href="/Tips" className="block px-4 py-3 hover:bg-gray-100">
                Driving Tips
              </a>
              <a href="/news" className="block px-4 py-3 hover:bg-gray-100">
                News & Updates
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <a href="/contact" className="py-2">
            CONTACT
          </a>

        </div>

        {/* Inside Navbar.jsx - Update the dynamic button rendering section at the bottom */}
{isLoggedIn ? (
  <div className="flex gap-3">
    <button 
      onClick={() => window.location.href = '/userprofile'}
      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium text-sm"
    >
      My Profile
    </button>
    <button 
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium text-sm transition-colors"
    >
      LOGOUT
    </button>
  </div>
) : (
  <button className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 font-medium transition-colors">
    <a href="/loginsignup">LOGIN / SIGNUP</a>
  </button>
)}

      </div>
    </nav>
  );
}