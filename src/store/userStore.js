import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  clearUser: () => set({ user: null }),
  isAuthenticated: false,
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),
}));

export default useUserStore;
