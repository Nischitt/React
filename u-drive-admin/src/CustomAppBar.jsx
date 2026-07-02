import { AppBar } from "react-admin";
import { Box, Typography } from "@mui/material";

const CustomAppBar = () => (
  <AppBar
    sx={{
      background: "#111827",
      boxShadow: "none",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    <Box
      sx={{
        width: "100%",
        px: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="700"
      >
        🚗 UDrive Admin
      </Typography>

      <Typography>
        Welcome Admin
      </Typography>
    </Box>
  </AppBar>
);

export default CustomAppBar;