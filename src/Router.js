import React, { useEffect, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { LazyLoading, NoAuthRoute } from 'components';

// Home
const Home = React.lazy(() => import('./containers/home/Home'));
const MovieDetail = React.lazy(() => import('./containers/home/MovieDetail'));

// Login
const Login = React.lazy(() => import('./containers/login/Login'));
const Forgot = React.lazy(() => import('./containers/login/Forgot'));
const Change = React.lazy(() => import('./containers/login/Change'));
const Register = React.lazy(() => import('./containers/login/Register'));

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
        <Route path="/movie/:id" element={<MovieDetail />} />

        {/* RUTAS DEL LOGIN */}
        <Route element={<NoAuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/change" element={<Change />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
