import React, { useState, useEffect } from "react";
import { API_URL } from '../config'; 

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State Triggers
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 2; // Sets how many articles show up before cutting off to next page

  useEffect(() => {
    setLoading(true);
    
    // Fetching data from your paginated API endpoint
    fetch(`${API_URL}/api/blogs?page=${currentPage}&limit=${postsPerPage}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        // Safe check: handles if data is wrapped in an object or sent directly as an array
        if (data && data.blogs) {
          setBlogPosts(data.blogs);
          setTotalPages(data.totalPages || 1);
        } else if (Array.isArray(data)) {
          setBlogPosts(data);
          setTotalPages(1);
        } else if (data && data.data) {
          setBlogPosts(data.data);
          setTotalPages(data.totalPages || 1);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error synchronization timeline pagination:", err);
        setLoading(false);
      });
  }, [currentPage]); // Re-runs API query anytime the user changes page index numbers

  const categories = [
    { name: "Driving Course", count: 8 },
    { name: "Driving License", count: 5 },
    { name: "Road Safety Guide", count: 12 },
    { name: "Instructor Training", count: 3 },
    { name: "Vehicle Maintenance", count: 4 },
  ];

  const recentPosts = [
    { title: "Standard Driving Course Essentials", date: "12 June 2026", img: "/images/6.jpg" },
    { title: "Extended Course Route Guidelines", date: "08 June 2026", img: "/images/7.jpg" },
    { title: "Tips for Passing on First Attempt", date: "01 June 2026", img: "/images/15.jpg" }
  ];

  return (
    <div className="w-full bg-white font-sans text-gray-700 antialiased overflow-x-hidden selection:bg-yellow-500 selection:text-slate-950">
      
      {/* 1. HERO BANNER HEADER */}
      <section className="relative h-[240px] bg-neutral-900 flex flex-col items-center justify-center overflow-hidden">
        <img 
          src="/images/contact-banner.jpg" 
          alt="Blog banner background" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Our Blog & News</h1>
          <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-wider text-neutral-400 uppercase">
            <a href="/hero"><span className="hover:text-yellow-500 cursor-pointer transition">Home</span></a>
            <span className="text-yellow-500 font-normal">»</span>
            <span className="text-white">Blog</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN BLOG CONTENT MATRIX */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Blog Feed List Column */}
          <div className="lg:col-span-8 space-y-16">
            
            {loading ? (
              <div className="text-center py-12 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-xs text-gray-400 tracking-wider uppercase font-bold">Shuffling Pages...</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-12 border border-dashed rounded p-8">
                <p className="text-sm text-gray-400 font-medium">No blog posts found on this page.</p>
              </div>
            ) : (
              blogPosts.map((post) => (
                /* ⚙️ FIX 1: Map key checks for database _id or fallback id */
                <article key={post._id || post.id} className="group border-b border-gray-100 pb-12 last:border-0 last:pb-0">
                  <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-xs overflow-hidden mb-6 border border-gray-100">
                    <img 
                      src={post.image || "/images/5.jpg"} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                    />
                    <div className="absolute top-0 left-0 bg-yellow-500 text-slate-950 px-4 py-2 text-center font-bold text-xs uppercase tracking-tight">
                      {/* ⚙️ FIX 2: Swapped post.date out for post.publishedDate to align keys */}
                      {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : "Recent"}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1">👤 By {post.author || "Isaac Herman"}</span>
                    <span className="text-gray-200">•</span>
                    <span className="flex items-center gap-1">📁 {post.category || "Driving Course"}</span>
                    <span className="text-gray-200">•</span>
                    <span className="flex items-center gap-1">💬 {post.commentsCount ?? 0} Comments</span>
                  </div>

                  <h2 className="text-xl font-black text-slate-950 tracking-tight leading-snug mb-3 group-hover:text-yellow-600 transition duration-300">
                    {post.title}
                  </h2>

                  <p className="text-xs text-gray-400 leading-relaxed mb-5 whitespace-pre-line">
                    {post.content}
                  </p>

                  <div className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-950 tracking-widest uppercase cursor-pointer hover:text-yellow-600 transition">
                    »»»»» READ MORE
                  </div>
                </article>
              ))
            )}

            {/* DYNAMIC PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex items-center justify-start gap-2 pt-6 text-[10px] text-neutral-500 border-t border-gray-100">
                {/* Previous Arrow Button */}
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold transition ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-950 hover:text-white'}`}
                >
                  ‹
                </button>

                {/* Generate dynamic numbering layout */}
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  const isActive = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-full font-bold transition flex items-center justify-center ${
                        isActive 
                          ? "bg-yellow-500 text-slate-950 shadow-xs" 
                          : "border border-gray-200 text-neutral-500 hover:bg-slate-950 hover:text-white"
                      }`}
                    >
                      {pageNum < 10 ? `0${pageNum}` : pageNum}
                    </button>
                  );
                })}

                {/* Next Arrow Button */}
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center font-bold transition ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-950 hover:text-white'}`}
                >
                  ›
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar Column */}
          <aside className="lg:col-span-4 space-y-10 lg:pl-4">
            <div className="bg-slate-50 border border-gray-100 p-6 rounded-xs">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">»</span> Search
              </h3>
              <div className="relative flex">
                <input type="text" placeholder="Type keywords..." className="w-full bg-white border border-gray-200 text-xs px-4 py-3 outline-none focus:border-yellow-500 transition" />
                <button className="bg-slate-950 text-white px-4 text-xs font-bold uppercase hover:bg-slate-900 transition">Go</button>
              </div>
            </div>

            <div className="bg-slate-50 border border-gray-100 p-6 rounded-xs">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">»</span> Categories
              </h3>
              <ul className="space-y-2 text-xs font-medium text-gray-500">
                {categories.map((cat, i) => (
                  <li key={i} className="flex justify-between items-center py-1.5 border-b border-gray-200/50 last:border-0 hover:text-slate-950 cursor-pointer transition">
                    <span>{cat.name}</span>
                    <span className="bg-white border border-gray-200 text-[10px] text-gray-400 px-2 py-0.5 rounded-full font-bold">{cat.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-gray-100 p-6 rounded-xs">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">»</span> Recent Posts
              </h3>
              <div className="space-y-4">
                {recentPosts.map((post, i) => (
                  <div key={i} className="flex gap-3 items-start cursor-pointer group">
                    <div className="w-14 h-14 bg-gray-200 shrink-0 overflow-hidden rounded-xs border border-gray-200">
                      <img src={post.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-950 leading-tight mb-1 group-hover:text-yellow-600 transition">{post.title}</h4>
                      <p className="text-[10px] text-gray-400 font-medium">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-gray-100 p-6 rounded-xs">
              <h3 className="text-xs font-black text-slate-950 uppercase tracking-widest border-b border-gray-200 pb-2 mb-4 flex items-center gap-2">
                <span className="text-yellow-500">»</span> Popular Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {["License", "Safety", "Tips", "Standard Course", "Manual", "Automatic", "Driving Test"].map((tag, i) => (
                  <span key={i} className="bg-white border border-gray-200 hover:border-yellow-500 hover:bg-yellow-500 hover:text-slate-950 transition text-[10px] font-bold text-gray-400 px-2.5 py-1.5 rounded-xs cursor-pointer">{tag}</span>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </section>

    </div>
  );
}