import { create } from "zustand";

interface ModalState {
  open: boolean;
  title: string;
  modalComponent?: React.ReactNode;
  actionComponent?: React.ReactNode;
  handleClose?: () => void;
  setOpen: (
    open: boolean,
    title: string,
    modalComponent: React.ReactNode
  ) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  title: "",
  setOpen(open, title, modalComponent) {
    set({ open, title, modalComponent });
  },
  handleClose: () => set({ open: false }),
}));
