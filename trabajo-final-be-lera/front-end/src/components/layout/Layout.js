import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import NavBar from "../nav/NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <Outlet />
      {children}
      <Footer/>
    </>
  );
};

export default Layout;
