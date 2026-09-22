import { createContext, useState } from 'react';

import { Modal } from './modal';
import { getModalConfig } from './modalConfig';

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const openModal = (type, data) => {
    setModal({ type, data });
  };

  const closeModal = () => {
    setModal(null);
  };

  const config = getModalConfig(modal);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {config && (
        <Modal
          title={config.title}
          subtitle={config.subtitle}
          icon={config.icon}
          onClose={closeModal}
        >
          {config.content}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
