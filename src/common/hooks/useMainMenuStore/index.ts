import { create } from "zustand";

interface MainMenuState {
  open: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export const useMainMenuStore = create<MainMenuState>((set) => ({
  open: false,
  toggleDrawer: (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    set({ open });
  },
}));
