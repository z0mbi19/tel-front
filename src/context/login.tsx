import { toaster } from "evergreen-ui";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContextType, Login } from "../interface/login";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = (props: any) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer${token.jwt}`;
      setUser(token);
    }
  }, []);

  async function handleLogin(auth: Login) {
    await api
      .post("auth", auth)
      .then(({ data }) => {
        setUser(data);
        localStorage.setItem("token", JSON.stringify(data));
        api.defaults.headers.common.Authorization = `Bearer${data.jwt}`;
        navigate("/code");
      })
      .catch((e) => {
        console.log(e.response.data);
        toaster.danger(e.response.data);
        localStorage.removeItem("token");
        api.defaults.headers.common.Authorization = `Bearer`;
        navigate("/login");
      });
  }
  async function handleLogout() {
    setUser(null);
    localStorage.removeItem("token");
    api.defaults.headers.common.Authorization = `Bearer`;
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
};
