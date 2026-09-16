import { createBrowserRouter } from 'react-router-dom';
import { Account, Auth, Home } from './pages';
import { ROUTES } from './constants';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.AUTH,
    element: <Auth />,
  },
  {
    path: ROUTES.ACCOUNT,
    element: <Account />,
  },
]);
