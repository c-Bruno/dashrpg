import { useContext } from 'react';
import { ModalContext } from 'main/contexts/ModalContext';

export default function useModal(component) {
  return useContext(ModalContext)(component);
}