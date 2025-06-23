import { createContext } from "react";

export type AuthContextType = {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  logout: () => Promise<void>;
  isLoading: boolean; 
};

export const authContext = createContext<AuthContextType>({
  isLogin: false,
  setIsLogin: () => {},
  logout: async () => {},
  isLoading: true, 
});