import { AUTH_KEY, USERS_KEY, readJson, writeJson } from "./storage";

function delay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const authService = {
  async login({ email, password, remember }) {
    await delay();
    const users = readJson(USERS_KEY, []);
    const user = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );
    if (!user || user.password !== password) {
      throw new Error("Invalid email or password");
    }
    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
      remember: Boolean(remember),
    };
    writeJson(AUTH_KEY, session);
    return session;
  },

  async signup({ name, email, password }) {
    await delay();
    const users = readJson(USERS_KEY, []);
    if (users.some((item) => item.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists");
    }
    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };
    writeJson(USERS_KEY, [...users, user]);
    const session = { id: user.id, name, email, remember: true };
    writeJson(AUTH_KEY, session);
    return session;
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  getSession() {
    return readJson(AUTH_KEY, null);
  },
};
