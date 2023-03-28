import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState, createContext, useContext, useMemo, useEffect } from "react";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  error: null,
  isLoading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(true);
        router.push("/login");
      }

      setIsInitialLoading(false);
    });
  }, [auth]);

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setIsLoading(false);
      })
      .catch((error: Error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setIsLoading(false);
      })
      .catch((error: Error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const logOut = async () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((error: Error) => alert(error.message))
      .finally(() => setIsLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      logOut,
      isLoading,
      error,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!isInitialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
