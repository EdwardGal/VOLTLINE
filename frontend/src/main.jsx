import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';

import './styles/root.scss';
import { ToastProvider } from './components/toast';
import { ModalProvider } from './components/modal';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ToastProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ToastProvider>
  </Provider>
);
