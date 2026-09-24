import { useCallback, useState } from 'react';

import { ModalContext } from './modalContext';
import { Modal } from './Modal';

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const openModal = useCallback((data) => {
    setModal(data);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modal && <Modal {...modal} onClose={closeModal} />}
    </ModalContext.Provider>
  );
};
