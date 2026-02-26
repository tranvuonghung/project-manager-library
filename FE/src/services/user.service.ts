import { usersMock } from "../mock/users.mock";
import type { AuthLoginPayload, AuthLoginResponse, User } from "../types/user";

type UserAccount = User & { password: string };

const usersDb: UserAccount[] = usersMock.map((item) => ({ ...item })) as UserAccount[];

const clone = <T>(payload: T): T => JSON.parse(JSON.stringify(payload));

const sanitizeUser = (account: UserAccount): User => {
  const { password, ...safeUser } = account;
  void password;
  return safeUser;
};

export const userServiceTs = {
  // TODO: Replace mock with real API when backend is ready.
  async login(payload: AuthLoginPayload): Promise<AuthLoginResponse> {
    try {
      const username = String(payload.username || "").trim();
      const password = String(payload.password || "").trim();

      const account = usersDb.find((item) => item.username === username && item.password === password);
      if (!account) {
        throw new Error("Invalid credentials");
      }

      const token = `mock-jwt-${account.role}-${Date.now()}`;
      return Promise.resolve({
        token,
        user: clone(sanitizeUser(account)),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Cannot login using mock source");
    }
  },

  async getAll(): Promise<User[]> {
    try {
      const users = usersDb.map((account) => sanitizeUser(account));
      return Promise.resolve(clone(users));
    } catch (error) {
      throw new Error("Cannot get users from mock source");
    }
  },

  async getById(id: number): Promise<User | null> {
    try {
      const account = usersDb.find((item) => item.id === Number(id));
      return Promise.resolve(account ? clone(sanitizeUser(account)) : null);
    } catch (error) {
      throw new Error("Cannot get user detail from mock source");
    }
  },

  async logout(): Promise<{ success: boolean }> {
    try {
      return Promise.resolve({ success: true });
    } catch (error) {
      throw new Error("Cannot logout from mock source");
    }
  },
};

export default userServiceTs;
