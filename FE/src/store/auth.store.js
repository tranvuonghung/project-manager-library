import { defineStore } from "pinia";
import { authService } from "../services/auth.service";
import { STORAGE_KEYS } from "../constants/storageKeys";

const readFromStorage = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }

    if (typeof fallback === "object") {
      return JSON.parse(raw);
    }

    return raw;
  } catch (error) {
    return fallback;
  }
};

const persistAuth = ({ token, user }) => {
  if (token) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  } else {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }

  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: readFromStorage(STORAGE_KEYS.USER, null),
    token: readFromStorage(STORAGE_KEYS.TOKEN, ""),
    role: readFromStorage(STORAGE_KEYS.USER, null)?.role || "",
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
    isAdmin: (state) => state.role === "admin",
    isUser: (state) => state.role === "user",
  },

  actions: {
    hydrate() {
      const user = readFromStorage(STORAGE_KEYS.USER, null);
      this.user = user;
      this.role = user?.role || "";
      this.token = readFromStorage(STORAGE_KEYS.TOKEN, "");
    },

    async login(credentials) {
      this.loading = true;
      try {
        const { token, user } = await authService.login(credentials);
        this.token = token;
        this.user = user;
        this.role = user.role;

        persistAuth({ token, user });
        return user;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      try {
        await authService.logout();
      } finally {
        this.token = "";
        this.user = null;
        this.role = "";
        persistAuth({ token: "", user: null });
        this.loading = false;
      }
    },
  },
});
