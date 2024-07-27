import React, { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface RegisterTeacher {
  name: string;
  email: string;
  password: string;
}

export interface LoginTeacher {
  email: string;
  password: string;
}

export interface UpdatePassword {
  recentPassword: string;
  newPassword: string;
}

export interface UpdateInfo {
  email: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface ResponseLogin {
  data: {
    token: string;
    teacher: User;
  };
}

export interface ResponseFindTeacher {
  data: {
    teacher: User;
  };
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>("");

  const register = async (data: RegisterTeacher) => {
    try {
      setLoading(true);

      const teacher = await api.post("/teacher", data);

      console.log(teacher.data);

      toast.success("Registerd");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
      setLoading(false);
    }
  };

  const login = async (data: LoginTeacher) => {
    try {
      setLoading(true);

      const user = (await api.post("/auth", data)) as ResponseLogin;

      localStorage.setItem("@user", JSON.stringify(user.data.teacher));
      localStorage.setItem("@token", user.data.token);

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.data.token}`;

      setToken(user.data.token);
      setUser(user.data.teacher);

      toast.success("Login Succesful");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Email or Password Invalid");
      setLoading(false);
    }
  };

  const updatePassword = async (data: UpdatePassword) => {
    try {
      setLoading(true);

      await api.patch("/teacher", data);
      const teacherUpdated = (await api.get("/teacher")) as ResponseFindTeacher;

      localStorage.setItem(
        "@user",
        JSON.stringify(teacherUpdated.data.teacher)
      );
      setUser(teacherUpdated.data.teacher);

      toast.success("Password Changed");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  const updateInfo = async (data: UpdateInfo) => {
    try {
      setLoading(true);

      await api.put("/teacher", data);
      const teacherUpdated = (await api.get("/teacher")) as ResponseFindTeacher;

      localStorage.setItem(
        "@user",
        JSON.stringify(teacherUpdated.data.teacher)
      );
      setUser(teacherUpdated.data.teacher);

      toast.success("Info Changed");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error");
    }
  };

  const signOut = () => {
    localStorage.removeItem("@user");
    localStorage.removeItem("@token");

    setUser(undefined);
    setToken(undefined);
  };

  useEffect(() => {
    const user = localStorage.getItem("@user");
    const token = localStorage.getItem("@token");

    if (user && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        signOut,
        updatePassword,
        updateInfo,
        loading,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
