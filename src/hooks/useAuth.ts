import { useState } from "react";
import { useAppContext } from "../components/AppProvider";

export const useAuth = () => {
  const [_, setToken] = useState(null);
  const { setUser, setLoggedIn } = useAppContext();

  const login = (username, password) => {
    return fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30000, // optional, defaults to 60
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw "Login failed.";
      })
      .then(({ token, ...user }) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
        setLoggedIn(true);
      });
  };

  const logout = () => {
    console.log("logout");
    setToken(null);
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser(null);
  };

  return { login, logout };
};
