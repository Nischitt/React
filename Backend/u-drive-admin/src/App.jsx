// frontend/src/app.jsx
import React, { useState } from 'react';
import { Admin, Resource, fetchUtils, ListGuesser, useLogin, useNotify } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { PackageList, PackageEdit, PackageCreate } from './packages';
import { CourseList, CourseEdit, CourseCreate } from './courses';
import { BookingList } from './BookingList';
import { Dashboard } from './Dashboard';
import { BlogList, BlogEdit, BlogCreate } from './Blogs';

// 1. Authenticated HTTP Client
const httpClient = (url, options = {}) => {
    if (!options.headers) options.headers = new Headers({ Accept: 'application/json' });
    const token = localStorage.getItem('adminToken');
    if (token) options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider('http://localhost:5000/api', httpClient);

// 2. Auth Provider Setup
// Replace your old authProvider block in App.jsx with this one:

const authProvider = {
    login: ({ username, password }) => {
        return fetch('http://localhost:5000/api/login', {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        .then(res => {
            if (!res.ok) throw new Error('Invalid email or password');
            return res.json();
        })
        .then(data => {
            // CRITICAL FIX: Explicitly block anyone who isn't an admin
            if (data.user.role !== 'admin') {
                throw new Error('Access denied. This dashboard is for administrators only.');
            }
            
            // If they are an admin, save their session data
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminRole', data.user.role);
        });
    },
    logout: () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminRole');
        return Promise.resolve();
    },
    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
            localStorage.clear();
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // DOUBLE GUARD: Make sure checkAuth fails if an admin token isn't present
    checkAuth: () => {
        const token = localStorage.getItem('adminToken');
        const role = localStorage.getItem('adminRole');
        
        if (token && role === 'admin') {
            return Promise.resolve();
        }
        return Promise.reject();
    },
    getPermissions: () => {
        const role = localStorage.getItem('adminRole');
        return role ? Promise.resolve(role) : Promise.reject();
    },
};

// 3. Custom Login Page (Upgraded to use React-Admin's Native Hook)
// Replacement for CustomLoginPage inside App.jsx
// Updated CustomLoginPage inside App.jsx using Username instead of Email
const CustomLoginPage = () => {
    const login = useLogin();
    const notify = useNotify();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Focus and hover interaction states
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [btnHovered, setBtnHovered] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Pass username and password directly into the React-Admin auth system
        login({ username, password })
            .catch(error => {
                setLoading(false);
                notify(error.message || 'Invalid username or password', { type: 'warning' });
            });
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.98)',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '400px',
                padding: '40px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                boxSizing: 'border-box',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {/* Brand Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ 
                        fontSize: '32px', 
                        fontWeight: '800', 
                        color: '#f59e0b', 
                        margin: '0 0 8px 0',
                        letterSpacing: '-0.5px'
                    }}>
                        udrive
                    </h1>
                    <p style={{ 
                        fontSize: '14px', 
                        color: '#64748b', 
                        margin: 0,
                        fontWeight: '500'
                    }}>
                        Administrative Control Panel
                    </p>
                </div>

                <form onSubmit={handleLogin}>
                    {/* NEW: Username Input Group */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ 
                            display: 'block', 
                            fontSize: '13px', 
                            fontWeight: '600', 
                            color: '#334155', 
                            marginBottom: '6px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Username
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter your admin username" 
                            style={{ 
                                width: '100%', 
                                padding: '12px 16px', 
                                fontSize: '15px',
                                border: usernameFocused ? '2px solid #f59e0b' : '1px solid #cbd5e1', 
                                borderRadius: '8px', 
                                backgroundColor: '#f8fafc',
                                color: '#1e293b',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'all 0.2s ease-in-out'
                            }} 
                            onFocus={() => setUsernameFocused(true)}
                            onBlur={() => setUsernameFocused(false)}
                            onChange={e => setUsername(e.target.value)} 
                            required 
                        />
                    </div>

                    {/* Password Input Group */}
                    <div style={{ marginBottom: '28px' }}>
                        <label style={{ 
                            display: 'block', 
                            fontSize: '13px', 
                            fontWeight: '600', 
                            color: '#334155', 
                            marginBottom: '6px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            style={{ 
                                width: '100%', 
                                padding: '12px 16px', 
                                fontSize: '15px',
                                border: passwordFocused ? '2px solid #f59e0b' : '1px solid #cbd5e1', 
                                borderRadius: '8px', 
                                backgroundColor: '#f8fafc',
                                color: '#1e293b',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'all 0.2s ease-in-out'
                            }} 
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    {/* Action Button */}
                    <button 
                        type="submit" 
                        disabled={loading} 
                        onMouseEnter={() => setBtnHovered(true)}
                        onMouseLeave={() => setBtnHovered(false)}
                        style={{ 
                            width: '100%', 
                            padding: '14px', 
                            backgroundColor: loading ? '#94a3b8' : (btnHovered ? '#d97706' : '#f59e0b'), 
                            color: '#ffffff', 
                            border: 'none', 
                            borderRadius: '8px', 
                            fontSize: '16px', 
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            boxShadow: btnHovered ? '0 4px 12px rgba(245, 158, 11, 0.3)' : 'none',
                            transition: 'all 0.2s ease-in-out'
                        }}
                    >
                        {loading ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <span className="admin-spinner" /> Authenticating...
                            </span>
                        ) : 'Secure Sign In'}
                    </button>
                </form>

                {/* Footer Security Note */}
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                        Authorized personnel entry only. Actions are logged.
                    </p>
                </div>
            </div>

            <style>{`
                .admin-spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: #fff;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};
// 4. Main App Component (Returning a valid array format with tracking keys)
function App() {
    return (
        <Admin 
            dataProvider={dataProvider} 
            authProvider={authProvider} 
            loginPage={CustomLoginPage} 
            dashboard={Dashboard}
        >
            {permissions => [
                // If the user's role is admin, include this resource in the layout array
                permissions === 'admin' ? (
                    <Resource 
                        name="users" 
                        key="users"
                        list={ListGuesser} 
                        options={{ label: 'Registered Students' }} 
                    />
                ) : null,
                
                <Resource key="packages" name="packages" list={PackageList} edit={PackageEdit} create={PackageCreate} />,
                <Resource key="courses" name="courses" list={CourseList} edit={CourseEdit} create={CourseCreate} />,
                <Resource key="bookings" name="bookings" list={BookingList} options={{ label: 'Student Applications' }} />,
                <Resource key="blogs" name="blogs" list={BlogList} edit={BlogEdit} create={BlogCreate} options={{ label: 'Blog Posts' }} />,
                <Resource key="contacts" name="contacts" list={ListGuesser} options={{ label: 'Enquiries' }} />
            ].filter(Boolean)} 
        </Admin>
    );
}

export default App;