// frontend/src/app.jsx
import React, { useState } from 'react';
import { Admin, Resource, fetchUtils, ListGuesser, useLogin, useNotify } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { createTheme } from '@mui/material/styles'; // 💡 Required to compile the custom theme engine

import { PackageList, PackageEdit, PackageCreate } from './packages';
import { CourseList, CourseEdit, CourseCreate } from './courses';
import { BookingList } from './BookingList';
import { Dashboard } from './Dashboard';
import { BlogList, BlogEdit, BlogCreate } from './Blogs';
import { CourseSettingsEdit } from './CourseSettings';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import { TeamList, TeamEdit, TeamCreate } from './TeamManagement';
import PeopleIcon from '@mui/icons-material/People';

// ==========================================
// 🚀 PREMIUM GRAPHICS ENGINE THEME CONFIGURATION
// ==========================================
const modernDarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#f59e0b',    // Accent color matching your main landing logo
        },
        secondary: {
            main: '#38bdf8',    // Cyan highlight tone for data badges
        },
        background: {
            default: '#0f111a', // Deep charcoal-sapphire canvas matrix
            paper: '#161925',   // Elevated card background color
        },
        text: {
            primary: '#f8fafc',  // Crisp title header text
            secondary: '#94a3b8', // Low-contrast descriptive utility label text
        },
        divider: 'rgba(255, 255, 255, 0.05)', // Super clean hairline boundaries
    },
    typography: {
        fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
        h6: {
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: '#ffffff',
        },
        button: {
            textTransform: 'none',
            fontWeight: '600',
            fontSize: '0.825rem',
        },
    },
    components: {
        // 1. Top Navbar Header Layer Override
        MuiAppBar: {
            styleOverrides: {
                colorDefault: {
                    backgroundColor: '#161925',
                    backgroundImage: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    boxShadow: 'none',
                },
            },
        },
        // 2. Left Structural Application Navigation Sidebar
        MuiSidebar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#161925',
                    borderRight: '1px solid rgba(255, 255, 255, 0.04)',
                    '& .RaMenuItemLink-root': { 
                        borderRadius: '10px',
                        margin: '4px 12px',
                        padding: '10px 16px',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        color: '#94a3b8',
                        transition: 'all 0.15s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            color: '#ffffff',
                        },
                    },
                    '& .RaMenuItemLink-active': {
                        color: '#f59e0b',
                        fontWeight: '700',
                        backgroundColor: 'rgba(245, 158, 11, 0.08) !important',
                        '& .MuiSvgIcon-root': {
                            color: '#f59e0b',
                        },
                    },
                },
            },
        },
        // 3. Elegant Structural Cards (The main content wrappers)
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                elevation1: {
                    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
                    borderRadius: '16px',
                    backgroundColor: '#161925',
                    border: '1px solid rgba(255, 255, 255, 0.03)',
                    padding: '8px',
                },
            },
        },
        // 4. Clean Analytical Data Sheets Tables Layout
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                    padding: '16px 20px',
                    fontSize: '0.85rem',
                },
                head: {
                    backgroundColor: '#11131c',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    color: '#f59e0b',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    transition: 'background-color 0.15s ease',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.01) !important',
                    },
                },
            },
        },
        // 5. Button and Interface Actions Customizations
        MuiButton: {
            styleOverrides: {
                contained: {
                    boxShadow: 'none',
                    borderRadius: '10px',
                    padding: '8px 18px',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
                    },
                },
                outlined: {
                    borderRadius: '10px',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                },
            },
        },
        // 6. Native Data Filter Inputs Form Modulators
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    backgroundColor: '#0f111a',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255, 255, 255, 0.15)',
                    },
                },
            },
        },
    },
});

// 1. Authenticated HTTP Client Setup
const httpClient = (url, options = {}) => {
    if (!options.headers) options.headers = new Headers({ Accept: 'application/json' });
    const token = localStorage.getItem('adminToken');
    if (token) options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

// 💡 2. CORE BACKEND INJECTOR: REST BASE DATA INTERFACE WITH MONGODB '_id' ADAPTER
const baseDataProvider = simpleRestProvider('http://localhost:5000/api', httpClient);

const dataProvider = {
    ...baseDataProvider,
    getList: (resource, params) => 
        baseDataProvider.getList(resource, params).then(({ data, total }) => ({
            data: data.map(record => ({ id: record._id || record.id, ...record })),
            total
        })),
    getOne: (resource, params) => 
        baseDataProvider.getOne(resource, params).then(({ data }) => ({
            data: { id: data._id || data.id, ...data }
        })),
    
    // 🛠️ FIXED UPDATE METHOD: Explicitly attaches React-Admin's unique tracking identifier
    // down into MongoDB's native '_id' property payload object structure before dispatching
    update: (resource, params) => {
        const payloadWithMongoId = { 
            ...params.data, 
            _id: params.id 
        };
        return baseDataProvider.update(resource, { 
            ...params, 
            data: payloadWithMongoId 
        }).then(({ data }) => ({
            data: { id: data._id || data.id, ...data }
        }));
    },

    create: (resource, params) => 
        baseDataProvider.create(resource, params).then(({ data }) => ({
            data: { id: data._id || data.id, ...data }
        })),
};

// 3. Auth Provider Setup
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
            if (data.user.role !== 'admin') {
                throw new Error('Access denied. This dashboard is for administrators only.');
            }
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
    checkAuth: () => {
        const token = localStorage.getItem('adminToken');
        const role = localStorage.getItem('adminRole');
        if (token && role === 'admin') return Promise.resolve();
        return Promise.reject();
    },
    getPermissions: () => {
        const role = localStorage.getItem('adminRole');
        return role ? Promise.resolve(role) : Promise.reject();
    },
};

// 4. Custom Login Page Component
const CustomLoginPage = () => {
    const login = useLogin();
    const notify = useNotify();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [btnHovered, setBtnHovered] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        login({ username, password })
            .catch(error => {
                setLoading(false);
                notify(error.message || 'Invalid username or password', { type: 'warning' });
            });
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            background: 'linear-gradient(135deg, #090d1a 0%, #0f1526 100%)',
            fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', padding: '20px', boxSizing: 'border-box'
        }}>
            <div style={{
                background: '#0f1526', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '40px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', boxSizing: 'border-box', border: '1px solid #1e2640'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#f59e0b', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
                        udrive
                    </h1>
                    <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, fontWeight: '500' }}>
                        Administrative Control Panel
                    </p>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>
                            Username
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter admin username" 
                            style={{ 
                                width: '100%', padding: '12px 16px', fontSize: '15px',
                                border: usernameFocused ? '2px solid #f59e0b' : '1px solid #1e2640', 
                                borderRadius: '8px', backgroundColor: '#090d1a', color: '#f1f5f9',
                                outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s'
                            }} 
                            onFocus={() => setUsernameFocused(true)}
                            onBlur={() => setUsernameFocused(false)}
                            onChange={e => setUsername(e.target.value)} 
                            required 
                        />
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#94a3b8', marginBottom: '6px', textTransform: 'uppercase' }}>
                            Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            style={{ 
                                width: '100%', padding: '12px 16px', fontSize: '15px',
                                border: passwordFocused ? '2px solid #f59e0b' : '1px solid #1e2640', 
                                borderRadius: '8px', backgroundColor: '#090d1a', color: '#f1f5f9',
                                outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s'
                            }} 
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading} 
                        onMouseEnter={() => setBtnHovered(true)}
                        onMouseLeave={() => setBtnHovered(false)}
                        style={{ 
                            width: '100%', padding: '14px', 
                            backgroundColor: loading ? '#1e2640' : (btnHovered ? '#d97706' : '#f59e0b'), 
                            color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s'
                        }}
                    >
                        {loading ? 'Authenticating...' : 'Secure Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

// 5. Main App Component
function App() {
    return (
        <Admin 
            dataProvider={dataProvider} 
            authProvider={authProvider} 
            loginPage={CustomLoginPage} 
            dashboard={Dashboard}
            theme={modernDarkTheme}
        >
            {permissions => [
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
                <Resource key="contacts" name="contacts" list={ListGuesser} options={{ label: 'Enquiries' }} />,
                <Resource 
                    name="page-settings/standard-course" 
                    list={CourseSettingsEdit} 
                    icon={SettingsAccessibilityIcon}
                    options={{ label: 'Standard Page Setup' }}
                />,
                <Resource 
                    key="blogs" 
                    name="blogs" 
                    list={BlogList} 
                    edit={BlogEdit} 
                    create={BlogCreate} 
                    options={{ label: 'Blog Posts' }} 
                />,
                <Resource 
    key="team" 
    name="team" 
    list={TeamList} 
    edit={TeamEdit} 
    create={TeamCreate} 
    icon={PeopleIcon}
    options={{ label: 'Manage Team' }} 
/>
                
            ].filter(Boolean)} 
        </Admin>
    );
}

export default App;