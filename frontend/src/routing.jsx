import { createBrowserRouter } from 'react-router-dom';
import { Account, Auth, Catalog, Home, Product } from './pages';
import { ROUTES } from './constants';
import { MainLayout } from './layouts';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.PRODUCT_VIEW,
        element: <Product />,
      },
      {
        path: ROUTES.CATALOG,
        element: <Catalog />,
      },
    ],
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
