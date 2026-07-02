import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Courses from "./components/Courses";
import Footer from "./components/Footer";
import About from "./components/About";
import Modern from "./components/Modern";
import Contact from "./components/Contact";
import Modrn from "./components/Modrn"; 
import Blog from "./components/Blog";
import Tips from "./components/Tips";
import Team from "./components/Team";
import Mission from "./components/Mission";
import Single from "./components/Single";
import LoginSignup from "./components/LoginSignup";
import UserProfile from "./components/UserProfile";
import CustomerReviews from "./components/CustomerReviews";
import StudentPortal from "./components/StudentPortal";

function App() {

  
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route path="/" element={<Hero />} />
        
        {/* Inner Pages */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/modern" element={<Modern />} />
        <Route path="/modrn" element={<Modrn />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/tips" element={<Tips />} />
        <Route path="/team" element={<Team />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/single" element={<Single />} />
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/customerreviews" element={<CustomerReviews />} />
        <Route path="/student-portal" element={<StudentPortal />} />
        


        {/* Fallback route: Redirects broken URLs back to the homepage */}
        <Route path="*" element={<Hero />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;