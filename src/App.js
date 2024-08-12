import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login, Home } from "./Pages";
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
              <Navigate to="/Home" />
            )
          }
        />
        <Route
          path="/Home"
          element={
            isAuthenticated ? (
              <Layout><Home setItemCount={() => {}} setTotalPrice={() => {}} /></Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Shop"
          element={
            isAuthenticated ? (
              <Layout><Home onLogout={handleLogout} /></Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Contact"
          element={
            isAuthenticated ? (
              <Layout><Home onLogout={handleLogout} /></Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/CartShop"
          element={
            isAuthenticated ? (
              <Layout><Home onLogout={handleLogout} /></Layout>
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
