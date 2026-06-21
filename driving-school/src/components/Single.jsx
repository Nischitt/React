import React, { useState, useEffect } from "react";
import { API_URL } from '../config';
export default function Single() {
  const [coursePrice, setCoursePrice] = useState(5000); // Default placeholder price
  const [enrollStatus, setEnrollStatus] = useState("");

  // 1. Fetch the price set by the admin panel from localStorage
// Replace your existing useEffect with this
useEffect(() => {
  const fetchPrice = async () => {
  try {
    const response = await fetch(`${API_URL}/api/page-settings/standard-course/YOUR_ID_HERE`);

    const data = await response.json();
    
    // Check your MongoDB document: is it 'tuitionCost' or 'price'?
    // Use the exact field name found in your database
    if (data.tuitionCost) { 
      setCoursePrice(Number(data.tuitionCost));
    }
    } catch (error) {
      console.error("Failed to fetch price from server:", error);
    }
  };

  fetchPrice();
}, []);

  // 2. The core Enrollment click handler
  const handleEnrollNow = async () => {
    setEnrollStatus("Processing...");

    const token = localStorage.getItem("studentToken");
    const studentEmail = localStorage.getItem("studentEmail");
    const studentName = studentEmail ? studentEmail.split('@')[0] : "Student"; 

    if (!token) {
      alert("Authentication Required! Please login or sign up to enroll.");
      window.location.href = "/login";
      return;
    }

    const bookingPayload = {
      studentName: studentName,
      studentEmail: studentEmail,
      studentPhone: "98XXXXXXXX", 
      itemType: "course",         
      itemName: "Premium Driving Course",
      itemPrice: Number(coursePrice), 
      status: "Pending",
      paymentStatus: "Unpaid"
    };

    try {
      console.log("Sending enrollment payload:", bookingPayload);

     const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(bookingPayload)
      });

      const responseData = await response.json();

      if (response.ok) {
        setEnrollStatus("Success!");
        alert(`Successfully Enrolled for ${bookingPayload.itemName}! Check your user profile.`);
        window.location.href = "/userprofile"; 
      } else {
        console.error("Server Validation Failure Log:", responseData);
        setEnrollStatus("Failed");
        alert(`Server Error: ${responseData.message || "The server rejected this request configuration."}`);
      }
    } catch (err) {
      console.error("Network Fetch Exception:", err);
      setEnrollStatus("Error");
      alert("Network Error: Could not reach the backend server. Make sure your server port 5000 is running!");
    }
  };

  return (
    <div className="w-full bg-[#070b19] min-h-screen text-slate-100 antialiased font-sans pt-28 pb-20 relative overflow-hidden">
      {/* Decorative Background Light Flares */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Breadcrumb Navigation Hook */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
          <span className="hover:text-amber-400 transition-colors cursor-pointer">Courses</span>
          <span>/</span>
          <span className="text-slate-300">Premium Overview</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side Content Layout Area (8/12 Columns) */}
          <div className="lg:col-span-8 space-y-8 text-left">
            
            {/* Image Hero Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800/80 group bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-transparent to-transparent z-10 opacity-60" />
              <img 
                src="src/images/10.jpg" 
                alt="Driving Lesson" 
                className="w-full object-cover aspect-video transform scale-100 group-hover:scale-[1.02] transition-transform duration-700" 
              />
              <span className="absolute top-4 left-4 z-20 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[10px] px-4 py-1.5 rounded-md uppercase tracking-wider shadow-lg">
                Standard Driving Course 
              </span>
            </div>

            {/* Course Title & Summary Description */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                Master the Road: Learn Driving with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                  Absolute Confidence & Safety
                </span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-3xl font-normal">
                Our comprehensive curriculum is structurally built to transform complete beginners into strategic, responsible, and defensive drivers. Through personalized 1-on-1 driving instruction, practical heavy-traffic navigation road training, and modern interactive modules, you will comfortably master manual or automatic vehicle systems.
              </p>
            </div>

            {/* Micro Metrics Highlights Block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                { label: "Theory Sessions", val: "5 Hours", icon: "⏱" },
                { label: "Road Practice", val: "18 Hours", icon: "🛣" },
                { label: "Total Duration", val: "10 Days", icon: "🗓" },
                { label: "Certification", val: "Included", icon: "🎓" }
              ].map((metric, i) => (
                <div key={i} className="bg-slate-900/40 border border-slate-800/60 p-4 rounded-xl flex items-center gap-3">
                  <span className="text-xl bg-slate-800/60 w-9 h-9 rounded-lg flex items-center justify-center text-amber-400 shrink-0">{metric.icon}</span>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">{metric.label}</p>
                    <p className="text-xs font-black text-slate-200 mt-1">{metric.val}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Side Sticky Pricing Box (4/12 Columns) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-[#0c1226]/90 backdrop-blur-md border border-slate-800/90 p-8 rounded-2xl shadow-2xl text-left relative overflow-hidden group">
              
              {/* Subtle top light ornament inside the layout card */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

              <span className="text-slate-500 text-[10px] uppercase tracking-widest font-black block mb-2">
                Investment Plan
              </span>
              
              <div className="text-amber-400 font-black text-4xl tracking-tight mb-6 flex items-baseline gap-1">
                <span className="text-lg font-bold text-slate-400">Rs.</span>
                <span>{coursePrice.toLocaleString()}</span>
                <span className="text-xs font-medium text-slate-500 tracking-normal ml-1">/ All Incl.</span>
              </div>

              {/* Parametric Data Rows with Better Typography */}
              <div className="space-y-4 border-t border-b border-slate-800/80 py-5 my-5 text-xs font-medium text-slate-400">
                <div className="flex justify-between items-center">
                  <span>Theory Component</span>
                  <span className="text-slate-200 font-bold bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">5 Hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Practical Training</span>
                  <span className="text-slate-200 font-bold bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">18 Hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Course Timeline</span>
                  <span className="text-slate-200 font-bold bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">10 Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Assigned Instructor</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1.5 bg-amber-500/5 px-2.5 py-1 rounded-md border border-amber-500/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Ram
                  </span>
                </div>
              </div>

              {/* Core Interactive Action Button */}
              <button 
                onClick={handleEnrollNow}
                disabled={enrollStatus === "Processing..."}
                className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:from-slate-800 disabled:to-slate-800 text-slate-950 text-xs font-black uppercase tracking-widest py-4 rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/5 hover:shadow-amber-500/10 disabled:shadow-none active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {enrollStatus === "Processing..." ? "Securing Slot..." : enrollStatus || "Instant Enrollment"}
                </span>
                <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              </button>

              {/* Small Confidence Seal Text */}
              <p className="text-center text-[10px] text-slate-500 font-medium mt-4 tracking-wide">
                🔒 Safe Payment Processing Framework via Dashboard
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}