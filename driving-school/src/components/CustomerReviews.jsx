import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    rating: 5,
    comment: ''
  });
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const fetchPublicReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/api/public/reviews`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setReviews(data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchPublicReviews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage({ type: 'success', text: 'Thank you! Your review has been submitted successfully.' });
        setFormData({ customerName: '', rating: 5, comment: '' });
        fetchPublicReviews();
      } else {
        setStatusMessage({ type: 'error', text: `Failed: ${result.error || 'Something went wrong.'}` });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'Could not connect to the server.' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 font-sans text-slate-100 antialiased">
      
      {/* --- HEADER --- */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          What Our Students Say
        </h2>
        <p className="text-slate-400 mt-2 text-sm md:text-base">Real experiences from our global community.</p>
      </div>
      
      {/* --- RENDER REVIEWS --- */}
      <div className="grid gap-6 md:grid-cols-2 mb-16">
        {reviews.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
            <p className="text-slate-400 italic">No approved reviews to display yet. Be the first!</p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div 
              key={rev.id || rev._id} 
              className="group flex flex-col justify-between bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 shadow-xl hover:border-amber-500/30 hover:shadow-amber-500/5 transition-all duration-300 backdrop-blur-sm"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-3">
                  <strong className="text-lg font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">
                    {rev.customerName}
                  </strong>
                  <span className="text-amber-400 tracking-wider text-lg select-none shrink-0">
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </span>
                </div>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                  "{rev.comment}"
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-800/60 pt-3 mt-auto">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Verified Student</span>
                <small className="text-xs text-slate-500">
                  {new Date(rev.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </small>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- REVIEW SUBMISSION FORM --- */}
      <div className="max-w-2xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Aesthetic background glow accent */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <h3 className="text-2xl font-bold text-slate-100 mb-2">Leave Us Your Feedback</h3>
        <p className="text-slate-400 text-sm mb-6">Your insights help us craft a better learning journey.</p>
        
        {statusMessage.text && (
          <div className={`p-4 rounded-xl mb-6 text-sm font-medium border ${
            statusMessage.type === 'error' 
              ? 'bg-red-500/10 border-red-500/20 text-red-400' 
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Your Name</label>
            <input 
              type="text" 
              name="customerName" 
              value={formData.customerName} 
              onChange={handleChange} 
              required 
              placeholder="Alex Johnson"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Rating</label>
            <div className="relative">
              <select 
                name="rating" 
                value={formData.rating} 
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-white appearance-none focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 cursor-pointer"
              >
                <option value="5">⭐⭐⭐⭐⭐ 5 — Excellent</option>
                <option value="4">⭐⭐⭐⭐ 4 — Very Good</option>
                <option value="3">⭐⭐⭐ 3 — Good</option>
                <option value="2">⭐⭐ 2 — Fair</option>
                <option value="1">⭐ 1 — Poor</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Review Comment</label>
            <textarea 
              name="comment" 
              rows="4" 
              value={formData.comment} 
              onChange={handleChange} 
              required 
              placeholder="What did you love? How can we improve?"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all duration-200 active:scale-[0.99]"
          >
            Submit Feedback
          </button>
        </form>
      </div>

    </div>
  );
}