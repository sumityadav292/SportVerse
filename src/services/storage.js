const AUTH_KEY = "sportverse.auth";
const USERS_KEY = "sportverse.users";
const FAVORITES_KEY = "sportverse.favorites";

export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export { AUTH_KEY, USERS_KEY, FAVORITES_KEY };
