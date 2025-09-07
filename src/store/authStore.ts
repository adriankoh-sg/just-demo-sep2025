import {
  FirebaseAuthTypes,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "@react-native-firebase/auth";
import { create } from "zustand";

interface User extends Partial<FirebaseAuthTypes.User> {
  chineseName: string;
  deShu: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  isError: false,
  error: null,
  login: ({ email, password }) => {
    set({ isLoading: true, isError: false, error: null });
    const auth = getAuth();

    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          set({
            isAuthenticated: true,
            user: {
              displayName: user.displayName,
              email: user.email,
              uid: user.uid,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              chineseName: "",
              deShu: "",
            },
          });

          resolve();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Login failed:", errorCode, errorMessage);
          set({ isError: true, error: errorMessage });
          reject(error);
        })
        .finally(() => {
          set({ isLoading: false });
          resolve();
        });
    });
  },
  logout: () => {
    set({ isLoading: true, isError: false, error: null });

    return new Promise((resolve, reject) => {
      signOut(getAuth())
        .then(() => {
          console.log("User signed out!");
          set({ isAuthenticated: false, user: null });
          resolve();
        })
        .catch((error) => {
          console.error("Sign-out error:", error);
          set({ isError: true, error: error.message });
          reject(error);
        })
        .finally(() => {
          set({ isLoading: false });
          resolve();
        });
    });
  },
}));
