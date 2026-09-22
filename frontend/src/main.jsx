import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing';
import { ModalProvider } from './components/modal/modalProvider';
import './styles/root.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </Provider>
);
