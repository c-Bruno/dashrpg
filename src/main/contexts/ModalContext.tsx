import React from 'react';
import { createContext, ReactNode, useState, FC, ReactElement, useCallback } from 'react';

import { Backdrop } from '@mui/material';

type ModalFunction = (component: (props: { close: () => void; custom?: any }) => ReactElement) => {
  appear: (custom?: any) => void;
  close: () => void;
};

export const ModalContext = createContext<ModalFunction | null>(null);

type ModalProps = {
  component: ReactElement;
};

const Modal: FC<ModalProps> = ({ component }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true} onClick={() => {}}>
      {component}
    </Backdrop>
  );
};

type ModalProviderProps = {
  children: ReactNode;
};

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modalComponent, setModalComponent] = useState<ReactElement | null>(null);

  const modalFunction: ModalFunction = useCallback((component) => {
    function close() {
      setModalComponent(null);
    }

    function appear(custom = null) {
      setModalComponent(component({ close, custom }));
    }

    return {
      appear,
      close,
    };
  }, []);

  return (
    <ModalContext.Provider value={modalFunction}>
      {children}
      {modalComponent && <Modal component={modalComponent} />}
    </ModalContext.Provider>
  );
};
