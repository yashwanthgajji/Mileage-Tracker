import { create } from 'zustand';

// Create a store for the user
export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));