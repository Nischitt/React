import React, { useState } from "react";
import { API_URL } from '../config';

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const route = isSignup ? "/api/signup" : "/api/login";

    try {
      const response = await fetch(`${API_URL}${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

     if (isSignup) {
    setMessage('Registered successfully! Please sign in now.');
    setIsSignup(false);
} else {
    // SAVE THESE THREE ITEMS:
    localStorage.setItem('studentToken', data.token);
    localStorage.setItem('studentEmail', data.user.email); // <-- Added
    localStorage.setItem('studentId', data.user.id);       // <-- Added
    setMessage(`Logged in as: ${data.user.email}`);
    window.location.href = '/profile'; // Redirect straight to profile page
}
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden px-6">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/20 blur-[150px]" />

      <div className="max-w-6xl w-full grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl relative z-10">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-yellow-500 to-yellow-400 p-12">
          <span className="uppercase tracking-widest font-bold text-black/70">
            uDrive Driving School
          </span>

          <h1 className="text-5xl font-black text-black mt-4 leading-tight">
            Learn Driving
            <br />
            With Confidence
          </h1>

          <p className="mt-6 text-black/70 text-lg">
            Join hundreds of successful students and become a confident driver
            with our certified instructors and modern training vehicles.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <p>Certified Driving Instructors</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <p>Flexible Lesson Scheduling</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <p>98% Student Pass Rate</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-10 md:p-14">

          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-slate-900">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>

            <p className="text-slate-500 mt-2">
              {isSignup
                ? "Register to start your driving journey"
                : "Sign in to access your student dashboard"}
            </p>
          </div>

          {message && (
            <div className="mb-6 p-4 rounded-xl bg-yellow-50 border border-yellow-300 text-yellow-700 text-center font-medium">
              {message}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-5">

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-yellow-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-bold text-lg transition duration-300 shadow-lg hover:shadow-yellow-500/40"
            >
              {isSignup ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-yellow-600 font-semibold hover:text-yellow-500 transition"
            >
              {isSignup
                ? "Already have an account? Login"
                : "New student? Create an account"}
            </button>
          </div>

          <div className="mt-10 flex justify-center gap-8 text-sm text-slate-400">
            <span>Secure Login</span>
            <span>•</span>
            <span>Fast Registration</span>
            <span>•</span>
            <span>Student Portal</span>
          </div>
        </div>
      </div>
    </section>
  );
}