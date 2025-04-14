import { useContext } from 'react';

import { ModalContext } from 'main/contexts/ModalContext';

const useModal = (component: any) => {
  return useContext(ModalContext)(component);
};

export default useModal;
