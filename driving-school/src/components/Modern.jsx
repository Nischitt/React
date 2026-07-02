import React, { useState, useEffect } from "react";
import { API_URL } from '../config';

export default function HomeContent() {
  // State buckets for database records
  const [packages, setPackages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- CMS BOOKING POPUP STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Tracks chosen package or course
  
  // UX Optimization: Auto-populate email if user is already logged in
  const [formData, setFormData] = useState({ 
    name: "", 
    email: localStorage.getItem("studentEmail") || "", 
    phone: "" 
  });
  const [submitStatus, setSubmitStatus] = useState("");

  // Pull data from your Node API server on load
  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/packages`).then((res) => res.json()),
      fetch(`${API_URL}/api/courses`).then((res) => res.json())
    ])
      .then(([packagesData, coursesData]) => {
        setPackages(packagesData || []);
        setCourses(coursesData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error communicating with backend API:", err);
        setLoading(false);
      });
  }, []);

  // Opens the popup modal form with custom item tracking data
  const handleOpenBooking = (item, type) => {
    const token = localStorage.getItem("studentToken");
    
    if (!token) {
      alert("Authentication Required! Please login or sign up to book this layout plan.");
      window.location.href = "/modern"; // Redirect to login page
      return; 
    }

    setSelectedItem({
      name: item.name || item.title,
      price: item.price || item.startingPrice,
      type: type
    });
    setIsModalOpen(true);
    setSubmitStatus("");
  };

  // Sends the form inputs down to your Express backend
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Processing...");

    const payload = {
      studentName: formData.name,
      studentEmail: formData.email,
      studentPhone: formData.phone,
      itemType: selectedItem.type,
      itemName: selectedItem.name,
      itemPrice: selectedItem.price
    };

    try {
      const token = localStorage.getItem("studentToken");
      const response = await fetch(`${API_URL}/api/bookings`, {

        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setSubmitStatus("Success! Our instructor team will call you shortly.");
        setFormData({ name: "", email: localStorage.getItem("studentEmail") || "", phone: "" });
        setTimeout(() => setIsModalOpen(false), 2500); 
      } else {
        setSubmitStatus("Submission failed. Please try again.");
      }
    } catch (err) {
      setSubmitStatus("Server error connecting to database.");
    }
  };

  return (

    

    <div className="w-full bg-white font-sans text-gray-700 antialiased overflow-x-hidden relative">

      {/* =========================================================================
          SECTION 2: HERE TO HELP YOU BECOME A GREAT DRIVER (STATIC FEATURES)
          ========================================================================= */}
      <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute top-12 left-8 flex gap-1.5 select-none opacity-60">
          <span className="text-amber-500 font-black tracking-tighter text-sm animate-pulse">////</span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-xl mx-auto">
            <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white mt-4 leading-tight">
              Here to help you become <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                a great driver
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "01", title: "Trained Instructors", desc: "Denounce with righteous indignation & men who are so beguiled." },
              { id: "02", title: "Fair Pricing Plans", desc: "In a free hour when our power of choice when nothing prevents." },
              { id: "03", title: "Well Maintained Vehicles", desc: "The duties of duty or the obligations business frequently occur that pleasure." },
              { id: "04", title: "Best Safety Measures", desc: "Blame cases states the obligation business frequently occur that pleasure." },
              { id: "05", title: "Pick Up & Drop Off On Time", desc: "Denounce with righteous indignation & men who are so beguiled." },
              { id: "06", title: "Flexible Course Completion", desc: "Nails free hour when our power of choice when nothing well prevents." }
            ].map((item, index) => (
              <div 
                key={index} 
                className="group relative bg-zinc-900/40 backdrop-blur-sm p-8 border border-zinc-800/80 rounded-2xl transition-all duration-300 hover:border-amber-500/40 hover:bg-zinc-900/80 flex flex-col justify-between min-h-[180px] hover:-translate-y-1 shadow-lg hover:shadow-amber-500/5"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold text-zinc-100 tracking-wide group-hover:text-amber-400 transition-colors duration-200">
                      {item.title}
                    </h4>
                    <span className="text-xs font-black text-zinc-700 group-hover:text-amber-500/40 transition-colors duration-200 font-mono">
                      {item.id}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal group-hover:text-zinc-300 transition-colors duration-200">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: VALUABLE PACKAGES & OFFERS (DYNAMIC MONGO DATA)
          ========================================================================= */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100/80">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header Section */}
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 px-3 py-1.5 rounded-full">
              Pricing Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 pt-2">
              Valuable Packages & Offers
            </h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Choose the perfect driving course tailored to your schedule, budget, and experience level.
            </p>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch min-h-[400px]">
            {loading ? (
              /* Skeleton Loader to reserve visual space and prevent flash disappearance */
              [1, 2, 3].map((n) => (
                <div key={n} className="bg-slate-100/60 animate-pulse rounded-2xl h-[450px] w-full border border-slate-200/40" />
              ))
            ) : (
              packages?.map((pkg) => {
                const priceString = (pkg.price || 0).toFixed(2);
                const [dollars, cents] = priceString.split(".");

                return (
                  <div
                    key={pkg.id || pkg._id}
                    className={`relative flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 h-full group ${
                      pkg.isPopular
                        ? "bg-slate-950 text-white shadow-xl shadow-slate-950/20 border-2 border-amber-500 scale-105 md:-translate-y-2 z-10"
                        : "bg-white text-slate-900 border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1"
                    }`}
                  >
                    {/* Popular Badge */}
                    {pkg.isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-[10px] font-black tracking-wider uppercase py-1 px-4 rounded-full shadow-sm">
                        Most Popular
                      </div>
                    )}

                    <div>
                      {/* Header Info */}
                      <div className="text-center mb-6">
                        <h3 className={`text-base font-bold uppercase tracking-wider mb-2 ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>
                          {pkg.name}
                        </h3>
                        <p className={`text-xs italic min-h-[32px] ${pkg.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Pricing Display */}
                      <div className={`text-center py-5 rounded-xl mb-6 ${pkg.isPopular ? 'bg-slate-900/60' : 'bg-slate-50'}`}>
                        <div className={pkg.isPopular ? 'text-amber-400' : 'text-slate-900'}>
                          <span className="text-sm font-bold align-top">Rs </span>
                          <span className="text-5xl font-black tracking-tight">{dollars}</span>
                          <span className="text-sm font-bold">.{cents}</span>
                        </div>
                        <p className={`text-[9px] uppercase tracking-widest font-bold mt-2 ${pkg.isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                          PER COURSE
                        </p>
                      </div>

                      {/* Features List */}
                      <ul className="space-y-4 text-xs font-medium px-2">
                        <li className="flex justify-between items-center border-b pb-2.5 border-dashed border-slate-200/20">
                          <span className={pkg.isPopular ? 'text-slate-400' : 'text-slate-500'}>Theory Lessons</span>
                          <span className={`font-bold ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>{pkg.theoryLessons} Lessons</span>
                        </li>
                        <li className="flex justify-between items-center border-b pb-2.5 border-dashed border-slate-200/20">
                          <span className={pkg.isPopular ? 'text-slate-400' : 'text-slate-500'}>Practical Lessons</span>
                          <span className={`font-bold ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>{pkg.practicalLessons} Lessons</span>
                        </li>
                        <li className="flex justify-between items-center border-b pb-2.5 border-dashed border-slate-200/20">
                          <span className={pkg.isPopular ? 'text-slate-400' : 'text-slate-500'}>Duration</span>
                          <span className={`font-bold ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>{pkg.durationDays || 30} Days</span>
                        </li>
                        <li className="flex justify-between items-center border-b pb-2.5 border-dashed border-slate-200/20">
                          <span className={pkg.isPopular ? 'text-slate-400' : 'text-slate-500'}>Car Type</span>
                          <span className={`font-bold ${pkg.isPopular ? 'text-white' : 'text-slate-900'}`}>{pkg.carType || 'Basic Model'}</span>
                        </li>
                        <li className="flex justify-between items-center pt-1">
                          <span className={pkg.isPopular ? 'text-slate-400' : 'text-slate-500'}>Free Pickup</span>
                          <span className={`font-bold ${pkg.isPopular ? 'text-amber-400' : 'text-emerald-600'}`}>
                            {pkg.freePickup ? 'Included' : 'Not Available'}
                          </span>
                        </li>
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={() => handleOpenBooking(pkg, "package")}
                      className={`mt-8 w-full rounded-xl text-[11px] font-bold uppercase tracking-widest py-4 transition-all duration-200 cursor-pointer ${
                        pkg.isPopular
                          ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10 group-hover:scale-[1.02]"
                          : "bg-slate-900 hover:bg-slate-800 text-white shadow-sm group-hover:scale-[1.02]"
                      }`}
                    >
                      BOOK NOW
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      

      {/* =========================================================================
          SECTION 3: COURSE TO DRIVE WITH CONFIDENCE (DYNAMIC MONGO DATA)
          ========================================================================= */}
     <section className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
  
  {/* Background Effects */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">

    {/* Header */}
    <div className="text-center mb-20">
      <span className="inline-block px-5 py-2 bg-yellow-100 text-yellow-700 text-xs font-bold tracking-[0.2em] uppercase rounded-full">
        Professional Driving Courses
      </span>

      <h2 className="mt-6 text-4xl md:text-5xl font-black text-slate-950">
        Learn To Drive With Confidence
      </h2>

      <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
        Professional driving lessons designed to build confidence, safety,
        and real-world driving skills.
      </p>
    </div>

    {/* Course Grid */}
    <div className="grid md:grid-cols-2 gap-10">

      {loading
        ? [1, 2].map((n) => (
            <div
              key={n}
              className="h-[600px] bg-slate-100 animate-pulse rounded-3xl"
            />
          ))
        : courses?.map((course, index) => (
            <div
              key={course.id || course._id}
              className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={course.image || "/images/6.jpg"}
                  alt={course.title}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                {/* Course Number */}
                <div className="absolute top-5 left-5">
                  <span className="text-3xl font-black text-white/80">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-xl">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                    Starting From
                  </p>
                  <p className="text-3xl font-black text-slate-950">
                    Rs{course.startingPrice}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">
                  Driving Course
                </span>

                <h3 className="text-2xl font-black text-slate-950 mt-3 mb-4">
                  {course.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {course.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="text-2xl mb-2">📚</div>
                    <p className="text-xs font-bold uppercase text-slate-500">
                      Theory
                    </p>
                    <p className="font-black text-slate-950 text-lg mt-1">
                      {course.theoryHours || 4} hrs
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="text-2xl mb-2">🚗</div>
                    <p className="text-xs font-bold uppercase text-slate-500">
                      Practical
                    </p>
                    <p className="font-black text-slate-950 text-lg mt-1">
                      {course.practicalHours || 18} hrs
                    </p>
                  </div>

                </div>

                {/* Note */}
                {course.note && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-600 font-bold">★</span>
                      <p className="text-sm text-yellow-800">
                        {course.note}
                      </p>
                    </div>
                  </div>
                )}

                {/* Button */}
                <button
                  onClick={() => handleOpenBooking(course, "course")}
                  className="w-full bg-slate-950 hover:bg-yellow-500 text-white hover:text-slate-950 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all duration-300"
                >
                  BOOK NOW →
                </button>

              </div>
            </div>
          ))}
    </div>
  </div>
</section>
      {/* =========================================================================
          INTERACTIVE REGISTRATION MODAL FORM POPUP OVERLAY
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[99999] p-4">
          <div className="bg-white p-8 rounded-sm w-full max-w-md relative shadow-2xl border border-gray-100 text-left font-sans">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-slate-950 text-lg transition font-mono border-none bg-transparent cursor-pointer"
            >
              ✕
            </button>
            
            <span className="text-[9px] font-bold uppercase tracking-widest text-yellow-600 block mb-1">Enlistment Desk</span>
            <h3 className="text-lg font-black text-slate-950 mb-1">Registration Form</h3>
            <p className="text-xs text-gray-400 leading-normal">
              You are applying for enrollment in: <strong className="text-slate-900 font-bold">{selectedItem?.name}</strong> (${selectedItem?.price})
            </p>
            
            <form onSubmit={handleFormSubmit} className="mt-6 flex flex-col gap-4">
              <div>
                <label className="text-[9px] font-bold uppercase text-slate-950 tracking-wider block mb-1.5">Your Full Name</label>
                <input 
                  type="text" placeholder="John Doe" required 
                  className="w-full text-xs p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-yellow-500 bg-slate-50 font-medium"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[9px] font-bold uppercase text-slate-950 tracking-wider block mb-1.5">Email Address</label>
                <input 
                  type="email" placeholder="johndoe@example.com" required 
                  className="w-full text-xs p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-yellow-500 bg-slate-50 font-medium"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[9px] font-bold uppercase text-slate-950 tracking-wider block mb-1.5">Phone Number</label>
                <input 
                  type="tel" placeholder="+1 (555) 000-0000" required 
                  className="w-full text-xs p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-yellow-500 bg-slate-50 font-medium"
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-[10px] font-bold uppercase tracking-widest py-3.5 rounded-sm transition mt-2 shadow-md cursor-pointer"
              >
                Confirm Admission Enrollment
              </button>
              
              {submitStatus && (
                <p className={`text-center font-bold text-xs mt-2 ${submitStatus.includes('Success') ? 'text-green-600' : 'text-slate-950'}`}>
                  {submitStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}