import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Toaster } from '@/components/ui/toaster';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Transfer from './routes/transfer.tsx';
import Home from './routes/home.tsx';
import Root from './routes/root.tsx';
import ErrorPage from './routes/error.tsx';
import Loan from './routes/loan.tsx';
import History from './routes/history.tsx';
import LoginPage from './routes/login.tsx';
import RootAdmin from './routes/rootAdmin.tsx';
import Users, { loader as userLoader } from './routes/users.tsx';
import Accounts, { loader as accountLoader } from './routes/accounts.tsx';
import { loader as userAccountLoader } from './routes/transfer.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'transfer',
        element: <Transfer />,
        loader: userAccountLoader
      },
      {
        path: 'loan',
        element: <Loan />
      },
      {
        path: 'history',
        element: <History />
      }
      // {
      //   path: 'devices/:deviceID',
      //   element: <DeviceInfo />,
      //   loader: deviceLoader,
      // }
    ]
  },
  {
    path: '/admin/',
    element: <RootAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'loan',
        element: <Loan />
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            element: <Users />,
            loader: userLoader
          }
        ]
      },
      {
        path: 'accounts',
        children: [
          {
            path: '',
            element: <Accounts />,
            loader: accountLoader
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </StrictMode>
);
