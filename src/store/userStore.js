import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  userId: null,
  setUser: (user) => set({ user, userId: user?.$id }),
  clearUser: () => set({ user: null, userId: null }),

  isAuthenticated: false,
  setIsAuthenticated: (status) => set({ isAuthenticated: status }),
}));

export default useUserStore;
