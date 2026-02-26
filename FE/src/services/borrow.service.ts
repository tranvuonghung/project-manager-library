import { borrowMock } from "../mock/borrow.mock";
import type { BorrowPayload, BorrowRecord } from "../types/borrow";
import bookServiceTs from "./book.service";

let borrowDb: BorrowRecord[] = borrowMock.map((item) => ({ ...item }));

const clone = <T>(payload: T): T => JSON.parse(JSON.stringify(payload));

const nextId = () => (borrowDb.length ? Math.max(...borrowDb.map((item) => item.id)) + 1 : 1);

const toDateString = (date: Date) => date.toISOString().slice(0, 10);

const plusDays = (dateString: string, days: number) => {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toDateString(date);
};

export const borrowServiceTs = {
  // TODO: Replace mock with real API when backend is ready.
  async getAll(): Promise<BorrowRecord[]> {
    try {
      return Promise.resolve(clone([...borrowDb].sort((a, b) => b.id - a.id)));
    } catch (error) {
      throw new Error("Cannot get borrow records from mock source");
    }
  },

  async getByUser(userId: number): Promise<BorrowRecord[]> {
    try {
      const rows = borrowDb
        .filter((item) => item.userId === Number(userId))
        .sort((a, b) => b.id - a.id);
      return Promise.resolve(clone(rows));
    } catch (error) {
      throw new Error("Cannot get user borrow records from mock source");
    }
  },

  async borrowBook(payload: BorrowPayload): Promise<BorrowRecord> {
    try {
      const book = await bookServiceTs.getById(payload.bookId);
      if (!book) {
        throw new Error("Book not found");
      }
      if (book.quantity <= 0) {
        throw new Error("Book is unavailable");
      }

      await bookServiceTs.update(book.id, {
        quantity: book.quantity - 1,
      });

      const borrowedAt = toDateString(new Date());
      const record: BorrowRecord = {
        id: nextId(),
        userId: Number(payload.userId),
        bookId: Number(payload.bookId),
        borrowedAt,
        dueDate: plusDays(borrowedAt, 30),
        returnedAt: null,
        status: "borrowing",
      };

      borrowDb.unshift(record);
      return Promise.resolve(clone(record));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Cannot create borrow record in mock source");
    }
  },

  async returnBook(borrowId: number): Promise<BorrowRecord> {
    try {
      const index = borrowDb.findIndex((item) => item.id === Number(borrowId));
      if (index < 0) {
        throw new Error("Borrow record not found");
      }

      const current = borrowDb[index];
      if (current.status === "returned") {
        return Promise.resolve(clone(current));
      }

      const book = await bookServiceTs.getById(current.bookId);
      if (book) {
        await bookServiceTs.update(book.id, {
          quantity: (book.quantity || 0) + 1,
        });
      }

      const updated: BorrowRecord = {
        ...current,
        status: "returned",
        returnedAt: toDateString(new Date()),
      };

      borrowDb[index] = updated;
      return Promise.resolve(clone(updated));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Cannot return book in mock source");
    }
  },

  async renewBorrow(borrowId: number, days = 7): Promise<BorrowRecord> {
    try {
      const index = borrowDb.findIndex((item) => item.id === Number(borrowId));
      if (index < 0) {
        throw new Error("Borrow record not found");
      }

      const current = borrowDb[index];
      const updated: BorrowRecord = {
        ...current,
        dueDate: plusDays(current.dueDate, Number(days) || 7),
      };

      borrowDb[index] = updated;
      return Promise.resolve(clone(updated));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Cannot renew borrow record in mock source");
    }
  },
};

export default borrowServiceTs;
