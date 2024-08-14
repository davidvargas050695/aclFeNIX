import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login, Home, Contract, Module, HomePage } from "./Pages";
import Layout from './components/LayoutSidebar'; // Importa el componente Layout

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
              <Layout><HomePage handleLogout={handleLogout} /></Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Contract"
          element={
            isAuthenticated ? (
              <Layout><Contract  handleLogout={handleLogout} /></Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Module"
          element={
            isAuthenticated ? (
              <Layout><Module  handleLogout={handleLogout} /></Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/CartShop"
          element={
            isAuthenticated ? (
              <Layout><Home  handleLogout={handleLogout} /></Layout>
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
