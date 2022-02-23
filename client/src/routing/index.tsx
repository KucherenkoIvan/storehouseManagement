import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth.hook';
import Login from '../Pages/Login';
import FallBack from './FallBack';

const pages = [
  {
    page: Login,
    path: '/login',
    auth: false
  },
  {
    page: React.lazy(() => import('../Pages/Register')),
    path: '/register',
    auth: false
  },
  {
    page: React.lazy(() => import('../Pages/Main')),
    path: '/',
    auth: true
  },
  {
    page: React.lazy(() => import('../Pages/Products')),
    path: '/products',
    auth: true
  },
  {
    page: React.lazy(() => import('../Pages/LK')),
    path: '/lk',
    auth: true
  }
];

const AppRouter = () => {
  const { userInfo } = useAuth();

  const isAuthorized = !!userInfo.token;

  const availablePages = pages.filter(page => page.auth === isAuthorized);

  return (
    <Router>
      <Routes>
        {
          availablePages.map(({ page, path }) => {
            return (
              <Route
                path={path}
                element={
                  <React.Suspense fallback={<FallBack/>}>
                    {React.createElement(page)}
                  </React.Suspense>
                }
                key={path}
              />
            )
          })
        }

        <Route path="*" element={<Navigate to={isAuthorized ? '/' : '/login'}/>}/>

      </Routes>
    </Router>
  );
}

export default AppRouter;
