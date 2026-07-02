import React from "react";

export default function Footer() {
  // Mock array for gallery images (replace src values with your actual assets)
  const galleryImages = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/10.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpg",
    "/images/8.jpg",
    "/images/9.jpg",
  ];

  return (
    <footer className="bg-[#121212] text-neutral-400 font-sans pt-20">
      {/* Top Footer Container */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Column 1: Brand & Identity */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-black text-xl">
                <span className="scale-125">⊙</span>
              </div>
              <span className="text-3xl font-bold text-white tracking-tight">
                u<span className="font-extrabold">drive</span>
              </span>
            </div>

            {/* Slogan */}
            <h3 className="text-white text-xl font-bold leading-snug max-w-xs mb-8">
              Teach driving with proper rules & regulations.
            </h3>

            {/* Interactive Link Blocks */}
            
          </div>

          {/* Inline Copyright */}
          <p className="text-xs text-neutral-500 mt-12 lg:mt-0">
            Copyrights <span className="text-yellow-500 font-medium">© 2022 udrive.</span> All Rights Reserved.
          </p>
        </div>

        {/* Column 2: Our Company Links */}
        <div className="lg:col-span-2 lg:pl-4">
          <h4 className="text-white font-bold text-base mb-2 tracking-wide">Our Company</h4>
          <div className="w-8 h-[2px] bg-yellow-500 mb-6" />
          
          <ul className="space-y-3 text-sm">
            {[
              "About Us",
              "Instructors",
              "Modern",
              "Classic",
              "Classic Course",
              "Modern Course",
              "Contact",
            ].map((link, idx) => (
              <li key={idx} className="flex items-start gap-2 hover:text-white cursor-pointer transition">
                <span className="text-neutral-600 text-[10px] mt-[4px]">■</span>
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Essential Links */}
        <div className="lg:col-span-3 lg:pl-4">
          <h4 className="text-white font-bold text-base mb-2 tracking-wide">Essential Links</h4>
          <div className="w-8 h-[2px] bg-yellow-500 mb-6" />
          
          <ul className="space-y-3 text-sm">
            {[
              "Driving Course",
              "Driving License",
              "Insurance",
              "Motorcycle Training",
              "Road Safety Guide",
              "Instructor Training",
              "Classic Course",
            ].map((link, idx) => (
              <li key={idx} className="flex items-start gap-2 hover:text-white cursor-pointer transition">
                <span className="text-neutral-600 text-[10px] mt-[4px]">■</span>
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Gallery Images Grid */}
        <div className="lg:col-span-3">
          <h4 className="text-white font-bold text-base mb-2 tracking-wide">Gallery Images</h4>
          <div className="w-8 h-[2px] bg-yellow-500 mb-6" />
          
          {/* 3x3 Grid Layout */}
          <div className="grid grid-cols-3 gap-2 max-w-[240px]">
            {galleryImages.map((src, idx) => (
              <div 
                key={idx} 
                className="aspect-square bg-neutral-800 border border-neutral-700/30 overflow-hidden cursor-pointer hover:opacity-80 transition"
              >
                <img 
                  src={src} 
                  alt={`Gallery item ${idx + 1}`} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="border-t border-neutral-800/60 bg-[#0d0d0d] py-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <span className="hover:text-neutral-300 cursor-pointer transition">Privacy Policy</span>
          <span className="hover:text-neutral-300 cursor-pointer transition">Terms & Conditions</span>
          <span className="hover:text-neutral-300 cursor-pointer transition">Cancellation Policy</span>
          <span className="hover:text-neutral-300 cursor-pointer transition">Site Map</span>
        </div>
      </div>
    </footer>
  );
}