import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = rest.isAuthenticated;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/" />}
    />
  );
};

export default PrivateRoute;
