import React, { useState, useEffect } from 'react';
import { API_URL } from './config';

export const StudentProfile = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${API_URL}/api/student/portal-metrics`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(setData);
    }, []);

    if (!data) return <div>Loading your progress...</div>;

    return (
        <div className="p-8 bg-slate-900 rounded-2xl">
            <h2 className="text-white text-2xl font-bold">My Progress</h2>
            <p className="text-slate-400 mt-1">{data.studentName} &middot; {data.activeCourse}</p>

            {/* Overall Course Progress */}
            <div className="mt-6">
                <div className="flex justify-between text-sm text-slate-400">
                    <span>Course Progress</span>
                    <span>{data.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-2">
                    <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${data.progressPercent}%` }}
                    />
                </div>
            </div>

            {/* Attendance Rate */}
            <div className="mt-6">
                <div className="flex justify-between text-sm text-slate-400">
                    <span>Attendance Rate</span>
                    <span>{data.attendanceRate}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full mt-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${data.attendanceRate}%` }}
                    />
                </div>
            </div>

            {/* Lessons Remaining */}
            <div className="mt-6 flex justify-between text-sm">
                <span className="text-slate-400">Lessons Remaining</span>
                <span className="text-white font-semibold">{data.upcomingLessons}</span>
            </div>

            {/* Certificate Status */}
            <div className="mt-3 flex justify-between text-sm">
                <span className="text-slate-400">Certificate Status</span>
                <span className={data.certificateStatus === 'Available' ? 'text-green-400 font-semibold' : 'text-slate-300 font-semibold'}>
                    {data.certificateStatus}
                </span>
            </div>
        </div>
    );
};