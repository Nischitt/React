import { Menu } from "react-admin";

const CustomMenu = () => (
  <Menu
    sx={{
      background: "#0f172a",
      height: "100%",

      "& .RaMenuItemLink-root": {
        borderRadius: "12px",
        margin: "4px 8px",
      },

      "& .RaMenuItemLink-active": {
        background: "rgba(245,158,11,.15)",
        borderLeft: "4px solid #f59e0b",
      },
    }}
  />
);

export default CustomMenu;