import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';
import { store } from './store/store';
import { ModalProvider } from './components/modal';
import { ToastProvider } from './components/toast';
import './styles/root.scss';

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
