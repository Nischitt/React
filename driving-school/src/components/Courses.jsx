import React from "react";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Standard Driving Course",
      price: "64",
      image: "/images/6.jpg",
      theory: "04 Hours",
      practical: "18 Hours",
      desc: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil pain can procure him some great pleasure."
    },
    {
      id: 2,
      title: "Extended Driving Course",
      price: "84",
      image: "/images/7.jpg",
      theory: "06 Hours",
      practical: "26 Hours",
      desc: "Explain to you how all this mistaken denouncing pleasure and praising pain was born and we will give you a complete account of the system, and expound the actual teachings of the explorer."
    },
    {
      id: 3,
      title: "Commercial Truck License",
      price: "199",
      image: "/images/25.jpg",
      theory: "12 Hours",
      practical: "40 Hours",
      desc: "Duis fringilla nunc velit, scelerisque libero iaculis. Ut pulvinar pretium justo, sit amet egestas. Praesent eget est vel mauris convallis porttitor at safety rules parameters."
    },
    {
      id: 4,
      title: "Defensive Road Safety Guide",
      price: "45",
      image: "/images/24.jpg",
      theory: "08 Hours",
      practical: "02 Hours",
      desc: "Mauris vitae quam vitae neque come ravida. Vivamus libero tellus vitae. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain."
    }
  ];

  return (
    <div className="w-full bg-white font-sans text-gray-700 antialiased overflow-x-hidden selection:bg-yellow-500 selection:text-slate-950">
      
      {/* =========================================================================
          HERO BANNER HEADER
          ========================================================================= */}
      <section className="relative h-[240px] bg-neutral-900 flex flex-col items-center justify-center overflow-hidden">
        <img 
          src="/images/contact-banner.jpg" 
          alt="Courses banner background" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Our Classic Courses</h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-wider text-neutral-400 uppercase">
           <a href="/hero"><span className="hover:text-yellow-500 cursor-pointer transition">Home</span></a>
            <span className="text-yellow-500 font-normal">»</span>
            <span className="text-white">Courses</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COURSES LISTING GRID
          ========================================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Pick a Course to Match Your Skill</h2>
            <p className="text-xs text-gray-400 mt-1">All packages include certified vehicle maintenance support frameworks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
            {courses.map((course) => (
              <div key={course.id} className="flex flex-col justify-between border border-gray-100 bg-white p-5 shadow-xs rounded-xs">
                <div className="relative mb-6">
                  <img src={course.image} alt={course.title} className="w-full aspect-[4/3] object-cover rounded-xs" />
                  
                  {/* Price Tag Overlay */}
                  <div className="absolute top-0 right-4 bg-yellow-500 text-slate-950 px-3 py-2 text-center shadow-md">
                    <p className="text-[7px] uppercase tracking-tighter font-bold opacity-75">FROM</p>
                    <p className="text-lg font-black leading-none">${course.price}</p>
                    <p className="text-[7px] font-medium mt-0.5 whitespace-nowrap">Per Person</p>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-1">DRIVING ACADEMY</span>
                  <h3 className="text-lg font-extrabold text-slate-950 mb-2">{course.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{course.desc}</p>

                  {/* Metrics Session Grid */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b py-3 my-4 border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-yellow-500">⏱</span>
                      <div>
                        <p className="text-[8px] uppercase font-bold text-slate-950 tracking-wide">THEORY TRAINING</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{course.theory}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-yellow-500">📍</span>
                      <div>
                        <p className="text-[8px] uppercase font-bold text-slate-950 tracking-wide">PRACTICAL TRACK</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{course.practical}</p>
                      </div>
                    </div>
                  </div>

                  {/* Warning strip note */}
                  <div className="bg-slate-950 text-neutral-300 text-[9px] font-medium p-2.5 rounded-xs flex items-center gap-1.5 mb-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-yellow-500 text-slate-950 flex items-center justify-center text-[9px] font-bold font-mono">!</span>
                    Excluding dynamic highway assessment tool registrations.
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