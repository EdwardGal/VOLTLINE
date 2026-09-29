import { createBrowserRouter } from 'react-router-dom';

import { Account, Auth, Cart, Catalog, Home, NotFound, Product } from './pages';
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
        path: ROUTES.CATALOG,
        element: <Catalog />,
      },
      {
        path: ROUTES.CATALOG_CATEGORY,
        element: <Catalog />,
      },
      {
        path: ROUTES.PRODUCT_VIEW,
        element: <Product />,
      },
      {
        path: ROUTES.CART,
        element: <Cart />,
      },
      {
        path: '*',
        element: <NotFound />,
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
