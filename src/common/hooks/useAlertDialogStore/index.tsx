import { create } from "zustand";

interface AlertDialogState {
  title: string;
  message: string;
  open: boolean;
  action: "accept" | "cancel" | undefined;
  actionComponent?: React.ReactNode;
  setOpen: (open: boolean, actionComponent: React.ReactNode) => void;
}

export const useAlertDialogStore = create<AlertDialogState>((set) => ({
  title: "",
  message: "",
  open: false,
  action: undefined,
  setOpen(open, actionComponent) {
    set({ open, actionComponent });
  },
}));
