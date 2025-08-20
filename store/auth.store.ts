import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@/types";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
  //   clearAuth: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  fetchAuthenticatedUser: async () => {
    try {
      set({ isLoading: true });
      const user = await getCurrentUser();

      if (!user) {
        set({ user: null, isAuthenticated: false });
        return;
      }
      set({ user, isAuthenticated: true });
    } catch (error) {
      console.error("Failed to fetch authenticated user:", error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
