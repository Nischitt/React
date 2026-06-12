import React, { useState, useEffect } from 'react';

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
        // Core Security Guard: If no token exists, bounce to login
        if (!token) {
            console.log("No authorization token found. Redirecting...");
            window.location.href = '/login'; 
            return;
        }

        Promise.all([
            fetch('http://localhost:5000/api/bookings').then(res => res.json()),
            fetch('http://localhost:5000/api/packages').then(res => res.json()),
            fetch('http://localhost:5000/api/courses').then(res => res.json())
        ])
        .then(([bookingsData, packagesData, coursesData]) => {
            // Filter bookings so the student only sees their own entries
            const userBookings = Array.isArray(bookingsData) 
                ? bookingsData.filter(b => b.studentEmail === studentEmail)
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
            studentName: studentEmail.split('@')[0], // Fallback nickname from email address
            studentEmail: studentEmail,
            studentPhone: "98XXXXXXXX", // Placeholder to satisfy backend schema rules
            itemType: type,
            itemName: item.name || item.title,
            itemPrice: item.price || item.startingPrice || 0,
            status: 'Pending'
        };

        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload)
            });

            if (response.ok) {
                const newBooking = await response.json();
                setMyBookings([...myBookings, { id: newBooking._id || Date.now().toString(), ...bookingPayload }]);
                setMessage({ text: `Successfully applied for ${item.name || item.title}! Check your application table.`, type: 'success' });
            } else {
                throw new Error('Booking transaction rejected.');
            }
        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
        }
    };

    if (loading) {
        return <div className="text-center mt-40 font-medium text-lg">Syncing profile record sheets...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 md:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* Profile Header Widget */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Student Dashboard</span>
                        <h2 className="text-2xl font-bold text-gray-800 mt-2">{studentEmail}</h2>
                        <p className="text-gray-500 text-sm mt-1">Manage enrollment slots, driving packages, and active course registration metrics.</p>
                    </div>
                    <button 
                        onClick={() => { localStorage.clear(); window.location.href = '/hero'; }}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Sign Out Account
                    </button>
                </div>

                {/* Toast System Notification Banner */}
                {message.text && (
                    <div className={`p-4 rounded-lg mb-6 font-medium text-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                {/* SECTION 1: Active Enrolments Ledger */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-3">My Enrolled Packages & Courses</h3>
                    {myBookings.length === 0 ? (
                        <p className="text-gray-400 text-sm py-4 italic">You haven't applied for any driving lessons or training packages yet.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold tracking-wider">
                                        <th className="p-3">Course / Package Name</th>
                                        <th className="p-3">Category</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Application Date</th>
                                        <th className="p-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-100">
                                    {myBookings.map((booking) => (
                                        <tr key={booking.id || booking._id} className="hover:bg-gray-50/50">
                                            <td className="p-3 font-semibold text-gray-700">{booking.itemName}</td>
                                            <td className="p-3 text-gray-500 capitalize">{booking.itemType}</td>
                                            <td className="p-3 font-medium text-gray-900">Rs. {booking.itemPrice}</td>
                                            <td className="p-3 text-gray-400">{new Date(booking.bookingDate || Date.now()).toLocaleDateString()}</td>
                                            <td className="p-3 text-center">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                                    booking.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* SECTION 2: Available Catalog Rows */}
                <h3 className="text-xl font-bold text-gray-800 mb-6">Explore Available Educational Programs</h3>

                {/* Sub-Catalog A: Driving Packages */}
                <h4 className="text-md font-bold text-gray-600 mb-4 uppercase tracking-wide">Training Packages</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {availablePackages.map((pkg) => (
                        <div key={pkg.id || pkg._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative">
                            {pkg.isPopular && (
                                <span className="absolute -top-2.5 right-4 bg-yellow-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</span>
                            )}
                            <div>
                                <h5 className="font-bold text-gray-800 text-lg">{pkg.name}</h5>
                                <p className="text-gray-400 text-xs italic mt-0.5">{pkg.tagline || 'Comprehensive field training session'}</p>
                                <div className="mt-3 flex items-baseline gap-1 text-gray-900">
                                    <span className="text-2xl font-black">Rs. {pkg.price}</span>
                                    <span className="text-gray-400 text-xs">/ package</span>
                                </div>
                                <ul className="mt-4 space-y-2 text-xs text-gray-600 border-t pt-3">
                                    <li>🚗 **Model:** {pkg.carType || 'Standard Training Car'}</li>
                                    <li>⏳ **Duration:** {pkg.durationDays || 30} Days ({pkg.hoursPerDay || 1} Hr/Day)</li>
                                    <li>📖 **Lessons:** {pkg.theoryLessons || 0} Theory | {pkg.practicalLessons || 0} Practical</li>
                                    <li>📍 **Pickup:** {pkg.freePickup ? 'Free Home Pickup Included' : 'Standard Center Station'}</li>
                                </ul>
                            </div>
                            <button 
                                onClick={() => handleInstantBook(pkg, 'package')}
                                className="w-full mt-5 bg-yellow-500 text-white font-bold py-2.5 rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                            >
                                Book Training Package
                            </button>
                        </div>
                    ))}
                </div>

                {/* Sub-Catalog B: Academic Courses */}
                <h4 className="text-md font-bold text-gray-600 mb-4 uppercase tracking-wide">License Courses</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {availableCourses.map((course) => (
                        <div key={course.id || course._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col md:flex-row gap-4 items-start hover:shadow-md transition-shadow">
                            <div className="w-full md:w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
                                <img 
                                    src={`http://localhost:5000/${course.image || 'src/images/6.jpg'}`} 
                                    alt={course.title}
                                    onError={(e) => { e.target.src = 'https://placehold.co/150x100?text=Driving+Course'; }}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                                <div>
                                    <h5 className="font-bold text-gray-800 text-base truncate">{course.title}</h5>
                                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{course.description}</p>
                                    <div className="mt-2 flex gap-4 text-[11px] text-gray-400">
                                        <span>📘 Theory: **{course.theoryHours || 0} Hrs**</span>
                                        <span>🚘 Practical: **{course.practicalHours || 0} Hrs**</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between gap-2 border-t pt-3">
                                    <div>
                                        <span className="text-xs text-gray-400 block">Tuition Starts At</span>
                                        <span className="font-bold text-gray-900 text-base">Rs. {course.startingPrice}</span>
                                    </div>
                                    <button 
                                        onClick={() => handleInstantBook(course, 'course')}
                                        className="bg-gray-900 text-white font-bold px-4 py-2 rounded-md text-xs hover:bg-gray-800 transition-colors"
                                    >
                                        Enroll Course
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}