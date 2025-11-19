import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../../components/ScrollToTop";

const Layout = () => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <div className="layout">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
