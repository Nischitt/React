import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function UserProfile() {
  // Read session storage values safely
  const token = localStorage.getItem('studentToken');
  const studentEmail = localStorage.getItem('studentEmail') || "student@udrive.com";
  
  // State management for database records
  const [myBookings, setMyBookings] = useState([]);
  const [availablePackages, setAvailablePackages] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Fetch data from backend on page load
  useEffect(() => {
    if (token === undefined) return; 

    if (!token) {
      console.log("No authorization token found. Redirecting to login...");
      window.location.href = '/login'; 
      return;
    }

    setLoading(true);

    const fetchOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    Promise.all([
      fetch(`${API_URL}/api/bookings`, fetchOptions).then(res => {
        if (!res.ok) throw new Error(`Bookings failed: ${res.status}`);
        return res.json();
      }),
      fetch(`${API_URL}/api/packages`, fetchOptions).then(res => {
        if (!res.ok) throw new Error(`Packages failed: ${res.status}`);
        return res.json();
      }),
      fetch(`${API_URL}/api/courses`, fetchOptions).then(res => {
        if (!res.ok) throw new Error(`Courses failed: ${res.status}`);
        return res.json();
      })
    ])
    .then(([bookingsData, packagesData, coursesData]) => {
      const userBookings = Array.isArray(bookingsData) && studentEmail
        ? bookingsData.filter(b => b.studentEmail?.toLowerCase() === studentEmail.toLowerCase())
        : [];
          
      setMyBookings(userBookings);
      setAvailablePackages(packagesData);
      setAvailableCourses(coursesData);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching profile details:", err);
      setLoading(false);
    });
  }, [token, studentEmail]);

  // Handle interactive instant booking form submissions
  const handleInstantBook = async (item, type) => {
    const confirmBooking = window.confirm(`Would you like to register an application for: ${item.name || item.title}?`);
    if (!confirmBooking) return;

    const bookingPayload = {
      studentName: studentEmail.split('@')[0], 
      studentEmail: studentEmail,
      studentPhone: "98XXXXXXXX", 
      itemType: type,
      itemName: item.name || item.title,
      itemPrice: item.price || item.startingPrice || 0,
      status: 'Pending',
      paymentStatus: 'Unpaid'
    };

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });

      if (response.ok) {
        const newBooking = await response.json();
        setMyBookings([...myBookings, { _id: newBooking._id || Date.now().toString(), ...bookingPayload }]);
        setMessage({ text: `Successfully applied for ${item.name || item.title}! Check your application table.`, type: 'success' });
      } else {
        throw new Error('Booking transaction rejected.');
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    }
  };
  
  // Handle simulated payment interface pipeline
  const handleWalletPayment = async (bookingId, itemName, amount) => {
    const useEsewa = window.confirm(
      `--- uDrive Digital Checkout Gateway ---\n\n` +
      `Item: ${itemName}\n` +
      `Total Amount: Rs. ${amount}\n\n` +
      `Click [OK] to pay via eSewa\n` +
      `Click [Cancel] to pay via Khalti`
    );

    const chosenGateway = useEsewa ? "eSewa" : "Khalti";
    
    const walletId = window.prompt(`Enter your 10-digit ${chosenGateway} ID/Mobile Number:`);
    if (!walletId) return; 
    
    const walletPin = window.prompt(`Enter your 4-digit ${chosenGateway} M-PIN:`);
    if (!walletPin) return;

    setLoading(true);
    setMessage({ text: `Connecting to secure ${chosenGateway} nodes... Please do not close this window.`, type: 'success' });

    setTimeout(async () => {
      const fakeTxnId = "TXN-" + Math.floor(Math.random() * 10000000).toString();

      try {
       const response = await fetch(`${API_URL}/api/bookings/${bookingId}/pay`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transactionId: fakeTxnId,
            paymentMethod: chosenGateway
          })
        });

        if (response.ok) {
          setMyBookings(prev => prev.map(b => 
            (b._id === bookingId || b.id === bookingId)
              ? { ...b, paymentStatus: 'Paid', paymentMethod: chosenGateway, transactionId: fakeTxnId, status: 'Approved' }
              : b
          ));
          setMessage({ text: `Payment Successful via ${chosenGateway}! Reference: ${fakeTxnId}`, type: 'success' });
        } else {
          throw new Error("Payment node verification failed.");
        }
      } catch (error) {
        setMessage({ text: error.message, type: 'error' });
      } finally {
        setLoading(false);
      }
    }, 2000); 
  };

  /* 👇 NEW: STREAMING REDIRECT TRIGGER FOR CERTIFICATE DOWNLOAD */
  const handleDownloadCertificate = (bookingId) => {
    if (!bookingId) return;
    // Hits the programmatic node stream directly triggering attachment layout download
    window.location.href = `${API_URL}/api/bookings/${bookingId}/certificate`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Syncing account records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-20 px-4 md:px-8 font-sans antialiased text-slate-600">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-xl shadow-md">
              {studentEmail.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black tracking-wider text-amber-700 bg-amber-400/10 px-2.5 py-0.5 rounded-full uppercase">
                  Student Member
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1 tracking-tight">{studentEmail}</h2>
              <p className="text-slate-400 text-xs mt-0.5">Manage enrollment status metrics, curriculum items, and session schedules.</p>
            </div>
          </div>

          <button 
            onClick={() => { localStorage.clear(); window.location.href = '/hero'; }}
            className="w-full md:w-auto bg-slate-100 text-slate-700 px-5 py-3 rounded-xl text-xs font-bold hover:bg-slate-200/80 active:scale-95 transition cursor-pointer"
          >
            Terminate Session
          </button>
        </div>

        {/* Banners */}
        {message.text && (
          <div className={`p-4 rounded-xl font-semibold text-xs border transition-all duration-300 flex items-center gap-2.5 ${
            message.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' 
              : 'bg-rose-500/10 text-rose-700 border-rose-500/20'
          }`}>
            <span className="font-mono text-base">›</span> {message.text}
          </div>
        )}

        {/* Ledger Table */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">Registered Training Modules</h3>
              <p className="text-xs text-slate-400 mt-0.5">Your personalized real-time track log for current applications.</p>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 px-2.5 py-1 rounded-md font-bold text-slate-500">
              Total Records: {myBookings.length}
            </span>
          </div>

          {myBookings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-slate-300 text-3xl mb-2">🚗</div>
              <p className="text-slate-400 text-xs italic">No driving modules or license courses registered on this identity profile.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-100">
                    <th className="p-4 pl-6">Curriculum Track</th>
                    <th className="p-4">Classification</th>
                    <th className="p-4">Tuition Value</th>
                    <th className="p-4">Timestamp Log</th>
                    <th className="p-4 text-center">Verification Status</th>
                    <th className="p-4 text-right pr-6">Accounting/Gateway Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-slate-100 text-slate-600 font-medium">
                  {myBookings.map((booking) => (
                    <tr key={booking._id || booking.id} className="hover:bg-slate-50/40 transition">
                      <td className="p-4 pl-6 font-bold text-slate-900">
                        {booking.itemName || booking.courseName}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[9px] uppercase tracking-wide ${
                          (booking.itemType?.toLowerCase() === 'course' || booking.category?.toLowerCase() === 'course')
                            ? 'bg-blue-500/10 text-blue-600'
                            : 'bg-indigo-500/10 text-indigo-600'
                        }`}>
                          {booking.itemType || booking.category || 'Package'}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-slate-900">
                        {typeof booking.itemPrice === 'string' || typeof booking.price === 'string'
                          ? (booking.itemPrice || booking.price)
                          : `Rs. ${booking.itemPrice || booking.price || 0}`}
                      </td>
                      <td className="p-4 text-slate-400">
                        {new Date(booking.bookingDate || booking.applicationDate || Date.now()).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          (booking.status === 'Approved' || booking.status === 'Success!') 
                            ? 'bg-emerald-500/10 text-emerald-700' 
                            : 'bg-amber-500/10 text-amber-700'
                        }`}>
                          ● {booking.status || 'Pending Verification'}
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6">
                        {(booking.paymentStatus === 'Paid' || booking.payment === 'Paid via Wallet') ? (
                          <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2">
                            {/* Status Info badges */}
                            <div className="inline-flex flex-col items-end">
                              <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                                Released via {booking.paymentMethod || 'Wallet'}
                              </span>
                              {booking.transactionId && (
                                <span className="text-[9px] text-slate-400 font-mono mt-1 tracking-tight">{booking.transactionId}</span>
                              )}
                            </div>
                            
                            {/* 👇 CERTIFICATE INLINE ACTION BUTTON */}
                            {(booking.status === 'Approved' || booking.status === 'Success!') && (
                              <button
                                onClick={() => handleDownloadCertificate(booking._id || booking.id)}
                                className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm border border-amber-300 transition active:scale-95 cursor-pointer ml-2"
                              >
                                🎓 Certificate
                              </button>
                            )}
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleWalletPayment(booking._id || booking.id, booking.itemName || booking.courseName, booking.itemPrice || booking.price)}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl transition shadow-sm cursor-pointer"
                          >
                            Execute Settlement
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Catalogs */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Available Curriculums & Tracks</h3>
            <p className="text-xs text-slate-400 mt-0.5">Instantly acquire additional instructional hours or defensive certification components.</p>
          </div>

          {/* Sub-Catalog A */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-px bg-slate-200 flex-1" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Practical Field Packages</h4>
              <span className="h-px bg-slate-200 flex-1" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availablePackages.map((pkg) => (
                <div key={pkg.id || pkg._id} className="bg-white rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between hover:shadow-md transition relative overflow-hidden group">
                  {pkg.isPopular && (
                    <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 text-[8px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                      Popular Track
                    </span>
                  )}
                  <div>
                    <h5 className="font-black text-slate-900 text-base tracking-tight">{pkg.name}</h5>
                    <p className="text-slate-400 text-[11px] italic mt-0.5">{pkg.tagline || 'Defensive roadmap training module'}</p>
                    
                    <div className="mt-4 flex items-baseline gap-1 text-slate-900">
                      <span className="text-xl font-black tracking-tight">Rs. {pkg.price}</span>
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">/ Slot</span>
                    </div>

                    <div className="mt-5 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4 font-medium">
                      <div className="flex justify-between"><span className="text-slate-400">Fleet Class:</span> <span className="font-bold text-slate-800">{pkg.carType || 'Standard Transmission'}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Duration:</span> <span className="font-bold text-slate-800">{pkg.durationDays || 30} Days ({pkg.hoursPerDay || 1} Hr/Day)</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Splits:</span> <span className="font-bold text-slate-800">{pkg.theoryLessons || 0} Theory | {pkg.practicalLessons || 0} Road</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Logistics:</span> <span className="font-bold text-slate-800 text-[11px]">{pkg.freePickup ? '✓ Complimentary Pickup' : 'Station Intake'}</span></div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleInstantBook(pkg, 'package')}
                    className="w-full mt-6 bg-slate-900 text-white font-black text-[10px] uppercase tracking-wider py-3.5 rounded-xl hover:bg-slate-800 active:scale-[0.99] transition cursor-pointer"
                  >
                    Instantly Request Package
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Catalog B */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="h-px bg-slate-200 flex-1" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Licensing Core</h4>
              <span className="h-px bg-slate-200 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableCourses.map((course) => (
                <div key={course.id || course._id} className="bg-white rounded-2xl border border-slate-200/60 p-5 flex flex-col sm:flex-row gap-5 hover:shadow-md transition">
                  <div className="w-full sm:w-32 h-28 bg-slate-950 rounded-xl overflow-hidden flex-shrink-0 border border-slate-800 relative">
                    <img 
                      src={`${API_URL}/${course.image || '/images/6.jpg'}`}
                      alt={course.title}
                      onError={(e) => { e.target.src = 'https://placehold.co/150x100?text=Udrive+Academy'; }}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-40" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h5 className="font-black text-slate-900 text-base tracking-tight truncate">{course.title}</h5>
                      <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">{course.description}</p>
                      
                      <div className="mt-3 flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">📘 Theory: {course.theoryHours || 0} Hrs</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">🚘 Road: {course.practicalHours || 0} Hrs</span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-3.5">
                      <div>
                        <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider">Tuition Base</span>
                        <span className="font-black text-slate-900 text-base tracking-tight">Rs. {course.startingPrice}</span>
                      </div>
                      <button 
                        onClick={() => handleInstantBook(course, 'course')}
                        className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-[10px] uppercase tracking-wider transition active:scale-95 cursor-pointer"
                      >
                        Enroll Track
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}