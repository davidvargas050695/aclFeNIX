import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login, Home, Shop, Contact, CartShop } from "./Pages";
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

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
              <Layout><Shop onLogout={handleLogout} /></Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Contact"
          element={
            isAuthenticated ? (
              <Layout><Contact onLogout={handleLogout} /></Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/CartShop"
          element={
            isAuthenticated ? (
              <Layout><CartShop onLogout={handleLogout} /></Layout>
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
