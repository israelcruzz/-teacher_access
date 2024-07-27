import React, { useState } from "react";
import { AuthContext } from "./auth-context";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface RegisterTeacher {
  name: string;
  email: string;
  password: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const register = async ({ name, email, password }: RegisterTeacher) => {
    const teacher = await
  };

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
