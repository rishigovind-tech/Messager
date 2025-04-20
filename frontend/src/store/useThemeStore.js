import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("message-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("message-theme", theme);
    set({ theme });
  },
}));
