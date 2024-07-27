import { createContext } from "react";
import {
  LoginTeacher,
  RegisterTeacher,
  UpdateInfo,
  UpdatePassword,
  User,
} from "./auth-provider";

export interface AuthContextProps {
  register: (data: RegisterTeacher) => Promise<void>;
  login: (data: LoginTeacher) => Promise<void>;
  signOut: () => void;
  updatePassword: (data: UpdatePassword) => void;
  updateInfo: (data: UpdateInfo) => void;
  user: User | undefined;
  token: string | undefined;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);
