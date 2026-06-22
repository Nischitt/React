import React from "react";

export default function About() {
  return (
    
    <div className="w-full bg-white font-sans antialiased text-gray-700">
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
  <img
    src="/images/Hero.jpg"
    alt="About Banner"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 text-center text-white">
    <h1 className="text-5xl md:text-7xl font-black mb-4">
      About uDrive
    </h1>

    <p className="max-w-2xl mx-auto text-lg text-gray-200">
      Empowering safe and confident drivers since 20+ years of Experience with professional
      instructors, modern vehicles, and proven training methods.
    </p>
  </div>
</section>
       
      

      
      {/* --- SECTION 1: Pioneer Info Grid --- */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image with overlay text box */}
          <div className="lg:col-span-6 relative">
            <div className="w-full h-[750px] sm:aspect-square max-w-lg mx-auto overflow-hidden rounded-sm bg-gray-100 shadow-sm">
              <img 
                src="/images/2.jpg" 
                alt="Driving training session" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* 12.6K Stats Overlay Badge */}
            <div className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-2xl px-6 py-5">
  <h3 className="text-3xl font-black text-yellow-500">
    12.6K+
  </h3>
  <p className="text-sm text-gray-500">
    Training Hours Completed
  </p>
</div>
          </div>

          {/* Right Column: Copy & Badges */}
         {/* Right Column */}
<div className="lg:col-span-6 flex flex-col justify-center">

  <span className="text-yellow-500 font-bold uppercase tracking-widest text-sm mb-3">
    About uDrive
  </span>

  <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
    Driving Success Since
    <span className="text-yellow-500"> 2006</span>
  </h2>

  <p className="text-gray-600 leading-relaxed text-base mb-6">
    At uDrive Driving School, we are committed to helping learners become
    confident, responsible, and skilled drivers. Our certified instructors
    combine classroom learning with practical road experience to ensure
    every student develops safe driving habits for life.
  </p>

  <p className="text-gray-600 leading-relaxed text-base mb-8">
    With more than 20 years of excellence, we have trained thousands of
    successful drivers and maintained one of the highest first-time pass
    rates in the region.
  </p>

  {/* Feature Cards */}
  <div className="grid grid-cols-2 gap-4 mb-8">

    <div className="bg-slate-50 p-4 rounded-xl border">
      <h4 className="font-bold text-slate-900">
        8000+
      </h4>
      <p className="text-sm text-gray-500">
        Successful Students
      </p>
    </div>

    <div className="bg-slate-50 p-4 rounded-xl border">
      <h4 className="font-bold text-slate-900">
        98%
      </h4>
      <p className="text-sm text-gray-500">
        First-Time Pass Rate
      </p>
    </div>

    <div className="bg-slate-50 p-4 rounded-xl border">
      <h4 className="font-bold text-slate-900">
        20+
      </h4>
      <p className="text-sm text-gray-500">
        Years Experience
      </p>
    </div>

    <div className="bg-slate-50 p-4 rounded-xl border">
      <h4 className="font-bold text-slate-900">
        25+
      </h4>
      <p className="text-sm text-gray-500">
        Professional Instructors
      </p>
    </div>

  </div>

  {/* Check List */}
  <div className="space-y-3 mb-8">

    <div className="flex items-center gap-3">
      <span className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-black text-sm font-bold">
        ✓
      </span>
      <span className="font-medium text-slate-700">
        Certified Driving Instructors
      </span>
    </div>

    <div className="flex items-center gap-3">
      <span className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-black text-sm font-bold">
        ✓
      </span>
      <span className="font-medium text-slate-700">
        Modern Dual-Control Vehicles
      </span>
    </div>

    <div className="flex items-center gap-3">
      <span className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-black text-sm font-bold">
        ✓
      </span>
      <span className="font-medium text-slate-700">
        Flexible Lesson Scheduling
      </span>
    </div>

    <div className="flex items-center gap-3">
      <span className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-black text-sm font-bold">
        ✓
      </span>
      <span className="font-medium text-slate-700">
        Highway & Test Route Training
      </span>
    </div>

  </div>

  

</div>
        </div>
      </section>

      <section className="py-20 bg-slate-950 text-white">
  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-4xl font-black">
        Our Mission & Vision
      </h2>
    </div>

    <div className="grid md:grid-cols-2 gap-10">

      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
        <h3 className="text-2xl font-bold text-yellow-500 mb-4">
          Our Mission
        </h3>

        <p className="text-gray-300">
          To provide safe, affordable, and professional driving education
          that prepares students for real-world driving situations.
        </p>
      </div>

      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
        <h3 className="text-2xl font-bold text-yellow-500 mb-4">
          Our Vision
        </h3>

        <p className="text-gray-300">
          To be the most trusted driving school known for producing
          confident and responsible drivers.
        </p>
      </div>

    </div>
  </div>
</section>

     <section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-4xl font-black">
        Why Students Choose uDrive
      </h2>
    </div>

    <div className="grid md:grid-cols-4 gap-8">

      {[
        "Certified Instructors",
        "Modern Training Cars",
        "Flexible Scheduling",
        "98% Pass Rate",
      ].map((item, index) => (
        <div
          key={index}
          className="p-8 bg-slate-50 rounded-2xl text-center shadow hover:shadow-xl transition"
        >
          <div className="text-yellow-500 text-5xl mb-4">
            ★
          </div>

          <h3 className="font-bold text-lg">
            {item}
          </h3>
        </div>
      ))}
    </div>

  </div>
</section>

<section className="py-24 bg-yellow-500">
  <div className="max-w-4xl mx-auto text-center px-6">

    <h2 className="text-5xl font-black text-black mb-6">
      Ready To Start Your Driving Journey?
    </h2>

    <p className="text-black/70 text-lg mb-8">
      Join thousands of successful drivers trained by uDrive.
    </p>

    <button className="bg-black text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition">
      Enroll Now
    </button>

  </div>
</section>

    </div>
  );
}