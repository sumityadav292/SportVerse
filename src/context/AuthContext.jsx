import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getSession());

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      async login(payload) {
        const session = await authService.login(payload);
        setUser(session);
        return session;
      },
      async signup(payload) {
        const session = await authService.signup(payload);
        setUser(session);
        return session;
      },
      logout() {
        authService.logout();
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
