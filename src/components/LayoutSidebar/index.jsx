import React from "react";
import Sidebar from "./../Sidebar"; // Asegúrate de haber creado o importado el Sidebar
import "./layoutSidebar.css";

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;