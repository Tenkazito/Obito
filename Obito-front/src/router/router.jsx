import Login from '../pages/Login'
import Home from '../pages/Home'
import Dashboard from '../pages/home/Dashboard'
import Transfer from '../pages/home/Transfer'
import History from '../pages/home/History'
import NotFound from '../pages/NotFound'
import { createBrowserRouter } from 'react-router-dom'
import RedirectIfLoggedIn from './redirectIfLoggedIn'
import ProtectedRoute from './protectedRoute'

export const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <RedirectIfLoggedIn>
            <Login />
        </RedirectIfLoggedIn>
      ),
    },
    {
      path: '/home',
      element: (
        <ProtectedRoute>
            <Home />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'transfer',
          element: <Transfer />,
        },
        {
          path: 'history',
          element: <History />,
        },
        // Agrega más subrutas según necesites
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
]);