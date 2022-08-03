import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { LazyLoading } from 'components';

// general
const Home = React.lazy(() => import('./containers/home/Home'));

// Login
const Login = React.lazy(() => import('./containers/login/Login'));

const Router = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!window.location.href.includes('#')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <Suspense fallback={<LazyLoading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
