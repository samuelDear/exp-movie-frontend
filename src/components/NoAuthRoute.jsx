import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const NoAuthRoute = () => {
  const id = localStorage.getItem('sessionid');
  if (id) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default NoAuthRoute;
