import { FAVORITES_KEY, readJson, writeJson } from "./storage";

const empty = { matches: [], teams: [], leagues: [] };

export const favoritesService = {
  getAll() {
    return readJson(FAVORITES_KEY, empty);
  },

  toggle(type, id) {
    const current = this.getAll();
    const list = current[type] ?? [];
    const next = list.includes(id)
      ? list.filter((item) => item !== id)
      : [...list, id];
    const updated = { ...current, [type]: next };
    writeJson(FAVORITES_KEY, updated);
    return updated;
  },

  has(type, id) {
    return this.getAll()[type]?.includes(id);
  },
};
