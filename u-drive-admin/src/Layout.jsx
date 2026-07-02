import { Layout } from "react-admin";
import CustomAppBar from "./CustomAppBar";
import CustomMenu from "./CustomMenu";

export const MyLayout = (props) => (
  <Layout
    {...props}
    appBar={CustomAppBar}
    menu={CustomMenu}
  />
);