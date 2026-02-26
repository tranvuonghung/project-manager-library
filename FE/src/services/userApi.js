import { getInitials } from "../utils/formatters";
import { STORAGE_KEYS } from "../constants/storageKeys";

const withDelay = (payload, delay = 120) =>
  new Promise((resolve) => setTimeout(() => resolve(payload), delay));

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

export const fetchProfile = async () => {
  // TODO: Replace mock with real API when backend is ready.
  const user = getStoredUser();
  const name = user?.name || "Người dùng";

  return withDelay({
    id: user?.id || "guest",
    name,
    role: user?.role || "user",
    avatarUrl: user?.avatarUrl || "",
    initials: getInitials(name),
    email: user?.email || "nguoidung@library.local",
  });
};

export const fetchNotifications = async () => {
  // TODO: Replace mock with real API when backend is ready.
  return withDelay({ unread: 2, items: [] });
};

export const updateProfile = async ({ payload } = {}) => {
  // TODO: Replace mock with real API when backend is ready.
  const current = getStoredUser();
  const updated = {
    ...(current || {}),
    ...(payload || {}),
  };

  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));
  return withDelay({ success: true, payload: updated });
};
