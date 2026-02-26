import { usersMock } from "../mock/users.mock";
import { clone, withMockPromise } from "../utils/mockHelpers";

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const safeUser = { ...user };
  delete safeUser.password;
  return safeUser;
};

export const authService = {
  // TODO: Replace mock with real API when backend is ready.
  async login({ username, password }) {
    const account = usersMock.find(
      (item) => item.username === String(username).trim() && item.password === String(password).trim()
    );

    if (!account) {
      throw new Error("Invalid username or password");
    }

    const user = sanitizeUser(account);
    const token = `mock-jwt-${account.role}-${Date.now()}`;

    return withMockPromise({ token, user });
  },

  getUsers() {
    return withMockPromise(usersMock.map((item) => sanitizeUser(item)));
  },

  logout() {
    return withMockPromise({ success: true });
  },

  findById(userId) {
    const user = usersMock.find((item) => item.id === Number(userId));
    return withMockPromise(clone(sanitizeUser(user)));
  },
};
