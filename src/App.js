import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login, Contract, Module, HomePage, ModulesForm, Customers } from "./Pages";
import { LayoutSidebar } from './components'; // Importa el componente Layout

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/HomePage" />
            )
          }
        />
        <Route
          path="/Home"
          element={
            isAuthenticated ? (
              <LayoutSidebar><HomePage handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Contract"
          element={
            isAuthenticated ? (
              <LayoutSidebar><Contract  handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Module"
          element={
            isAuthenticated ? (
              <LayoutSidebar><Module  handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Customers"
          element={
            isAuthenticated ? (
              <LayoutSidebar><Customers  handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/ModulesForm"
          element={
            isAuthenticated ? (
              <LayoutSidebar><ModulesForm  handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/Home" />} />
      </Routes>
    </Router>
  );
}

export default App;
