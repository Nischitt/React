import React, { useState } from 'react';
import { Admin, Resource, fetchUtils, ListGuesser, useLogin, useNotify } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { createTheme } from '@mui/material/styles';
import SchoolIcon from "@mui/icons-material/School";
import SettingsIcon from '@mui/icons-material/Settings'; // Add this line
import RateReviewIcon from '@mui/icons-material/RateReview';

// Icons
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BookIcon from '@mui/icons-material/Book';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GroupIcon from '@mui/icons-material/Group';
import { SiteSettingsEdit } from './SiteSettingsEdit';
// App.jsx
import { ReviewList, ReviewEdit } from './Reviews';
import { API_URL } from './config';


import { PackageList, PackageEdit, PackageCreate } from './packages';
import { CourseList, CourseEdit, CourseCreate } from './courses';
import { BookingList } from './BookingList';
import { BookingEdit } from './BookingEdit';

import { Dashboard } from './Dashboard';
import { BlogList, BlogEdit, BlogCreate } from './Blogs';
import { CourseSettingsEdit } from './CourseSettings';
import { MyLayout } from "./Layout";
import { TeamList, TeamEdit, TeamCreate } from './TeamManagement';
// 🚀 PREMIUM MODERN DARK THEME
const modernDarkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#f59e0b",
    },

    background: {
      default: "#0b1120",
      paper: "#111827",
    },
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },

  shape: {
    borderRadius: 20,
  },
  components: {
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 20,
      },
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: {
        borderRadius: 20,
      },
    },
  },

  MuiTableHead: {
    styleOverrides: {
      root: {
        backgroundColor: "#1e293b",
      },
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: {
        transition: "0.2s",

        "&:hover": {
          backgroundColor: "rgba(245,158,11,.05)",
        },
      },
    },
  },
},

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,.08)",
        },
      },
    },
  },
});
const httpClient = (url, options = {}) => {
    if (!options.headers) options.headers = new Headers({ Accept: 'application/json' });
    const token = localStorage.getItem('adminToken');
    if (token) options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const baseDataProvider = simpleRestProvider(`${API_URL}/api`, httpClient);

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
    update: (resource, params) => {
        const payloadWithMongoId = { ...params.data, _id: params.id };
        return baseDataProvider.update(resource, { ...params, data: payloadWithMongoId })
            .then(({ data }) => ({ data: { id: data._id || data.id, ...data } }));
    },
    create: (resource, params) => 
        baseDataProvider.create(resource, params).then(({ data }) => ({
            data: { id: data._id || data.id, ...data }
        })),
};

const authProvider = {
    login: ({ username, password }) => {
        return fetch(`${API_URL}/api/login`, {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        .then(res => res.ok ? res.json() : Promise.reject('Invalid credentials'))
        .then(data => {
            if (data.user.role !== 'admin') throw new Error('Unauthorized');
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminRole', data.user.role);
        });
    },
    logout: () => { localStorage.clear(); return Promise.resolve(); },
    checkError: (error) => (error.status === 401 || error.status === 403) ? Promise.reject() : Promise.resolve(),
    checkAuth: () => (localStorage.getItem('adminToken') ? Promise.resolve() : Promise.reject()),
    getPermissions: () => Promise.resolve(localStorage.getItem('adminRole')),
};
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("SENDING DATA:", formData); // 👈 IMPORTANT CHECK


  console.log("STATUS:", response.status);

  const data = await response.json();
  console.log("RESPONSE:", data);
};

const CustomLoginPage = () => {
    // ... (Keep your existing CustomLoginPage implementation)
    return <div style={{ background: '#0f111a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Login Interface</div>;
};

function App() {
    return (
        <Admin 
             dataProvider={dataProvider}
  authProvider={authProvider}
  dashboard={Dashboard}
  theme={modernDarkTheme}
  layout={MyLayout}
        >
            {permissions => [
                permissions === 'admin' && (
                    <Resource name="users" list={ListGuesser} icon={GroupIcon} options={{ label: 'Students' }} />
                ),
                <Resource name="packages" list={PackageList} edit={PackageEdit} create={PackageCreate} icon={LocalOfferIcon} />,
                <Resource name="courses" list={CourseList} edit={CourseEdit} create={CourseCreate} icon={MenuBookIcon} />,
                <Resource name="bookings" list={BookingList}edit={BookingEdit} icon={BookIcon} options={{ label: 'Applications' }} />,
                <Resource name="contacts" list={ListGuesser} icon={MailOutlineIcon} options={{ label: 'Enquiries' }} />,
                <Resource name="blogs" list={BlogList} edit={BlogEdit} create={BlogCreate} icon={MenuBookIcon} />,
                <Resource name="team" list={TeamList} edit={TeamEdit} create={TeamCreate} icon={PeopleIcon} options={{ label: 'Our Team' }} />,
                <Resource name="reviews" list={ReviewList} edit={ReviewEdit} icon={RateReviewIcon} options={{ label: 'Customer Reviews' }} />,
                // Add this inside the <Admin> component array:
<Resource name="site-settings" edit={SiteSettingsEdit} icon={SettingsIcon} options={{ label: 'Site Content' }} />

                    

                
            ].filter(Boolean)}
        </Admin>
    );
}

export default App;