import { create } from "zustand";

interface User {
  uuid: string;
  name: string;
  chineseName: string;
  email: string;
  deShu?: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: ({ email, password }) => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
