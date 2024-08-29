import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LayoutSidebar } from './components'; // Importa el componente Layout
import { Login, Contract, Module, HomePage, ModuleList, ClientForm, ModulesForm, Customers, ModuleNew, ContractNew,ModuleContract } from "./Pages";

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
              <LayoutSidebar><Contract handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/ContractNew"
          element={
            isAuthenticated ? (
              <LayoutSidebar><ContractNew handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/ModuleContract/:moduleId"
          element={
            isAuthenticated ? (
              <LayoutSidebar><ModuleContract handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/ClientForm"
          element={
            isAuthenticated ? (
              <LayoutSidebar><ClientForm handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/ClientForm/:customerCode"
          element={
            isAuthenticated ? (
              <LayoutSidebar><ClientForm handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Module"
          element={
            isAuthenticated ? (
              <LayoutSidebar><Module handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/Customers"
          element={
            isAuthenticated ? (
              <LayoutSidebar><Customers handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/ModulesForm"
          element={
            isAuthenticated ? (
              <LayoutSidebar><ModulesForm handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/ModuleList"
          element={
            isAuthenticated ? (
              <LayoutSidebar><ModuleList handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/ModuleNew"
          element={
            isAuthenticated ? (
              <LayoutSidebar><ModuleNew handleLogout={handleLogout} /></LayoutSidebar>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/ModuleNew/:productId"
          element={
            isAuthenticated ? (
              <LayoutSidebar><ModuleNew handleLogout={handleLogout} /></LayoutSidebar>
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
