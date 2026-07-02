import React from "react";
import { useGetList } from "react-admin";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from "recharts";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";


export function Dashboard() {
  // 1. Fetching live data from your resources
  const { data: bookings, isLoading: loadingBookings } = useGetList("bookings");
  const { total: leadsCount } = useGetList("contacts");
  const { total: coursesCount } = useGetList("courses");

  const cardStyle = {
    background: "#161925",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  };

  // Logic for dynamic stats
  const statsData = [
    { title: "Total Bookings", value: bookings?.length || 0, color: "#10b981", icon: "📈" },
    { title: "Active Courses", value: coursesCount || 0, color: "#38bdf8", icon: "🎓" },
    
   
  ];

  return (
    <Box sx={{ p: 3, background: "#0f111a", minHeight: "100vh", color: "#fff" }}>
      
      {/* HEADER SECTION */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>🚗 Management Cockpit</Typography>
            <Typography sx={{ color: "#94a3b8" }}>Real-time overview of your driving school operations.</Typography>
        </Box>
      </Box>

      {/* URGENT ALERT BANNER */}
      {leadsCount > 0 && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: "#ef444420", border: "1px solid #ef4444", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ color: "#fca5a5" }}>⚠️ {leadsCount} new leads require immediate follow-up.</Typography>
        </Paper>
      )}

      {/* STATS GRID */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statsData.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Box sx={cardStyle}>
              <Typography sx={{ color: "#94a3b8", fontSize: "13px" }}>{item.title}</Typography>
              <Typography sx={{ fontSize: "32px", fontWeight: 800, my: 1 }}>{item.value}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

    
      
    </Box>
  );
}