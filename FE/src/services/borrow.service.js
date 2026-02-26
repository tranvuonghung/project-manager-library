import { borrowMock } from "../mock/borrow.mock";
import { withMockPromise } from "../utils/mockHelpers";
import { bookService } from "./book.service";

let borrowDb = JSON.parse(JSON.stringify(borrowMock));

const nextBorrowId = () =>
  borrowDb.length ? Math.max(...borrowDb.map((item) => item.id)) + 1 : 1;

const toDateStr = (date) => date.toISOString().slice(0, 10);

const plusDays = (dateStr, days) => {
  const date = new Date(`${dateStr}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toDateStr(date);
};

export const borrowService = {
  // TODO: Replace mock with real API when backend is ready.
  getByUser(userId) {
    return withMockPromise(
      borrowDb.filter((item) => item.userId === Number(userId)).sort((a, b) => b.id - a.id)
    );
  },

  getAll() {
    return withMockPromise([...borrowDb].sort((a, b) => b.id - a.id));
  },

  async borrowBook({ userId, bookId }) {
    const book = await bookService.getById(bookId);

    if (!book) {
      throw new Error("Book not found");
    }

    if (book.quantity <= 0) {
      throw new Error("Book is unavailable");
    }

    await bookService.update(book.id, {
      quantity: book.quantity - 1,
    });

    const borrowedAt = toDateStr(new Date());

    const newBorrow = {
      id: nextBorrowId(),
      userId: Number(userId),
      bookId: Number(bookId),
      borrowedAt,
      dueDate: plusDays(borrowedAt, 30),
      returnedAt: null,
      status: "borrowing",
    };

    borrowDb.unshift(newBorrow);
    return withMockPromise(newBorrow);
  },

  async returnBook({ borrowId }) {
    const recordIndex = borrowDb.findIndex((item) => item.id === Number(borrowId));
    if (recordIndex < 0) {
      throw new Error("Borrow record not found");
    }

    const record = borrowDb[recordIndex];
    if (record.status === "returned") {
      return withMockPromise(record);
    }

    const book = await bookService.getById(record.bookId);
    if (book) {
      await bookService.update(book.id, {
        quantity: (book.quantity || 0) + 1,
      });
    }

    const returned = {
      ...record,
      status: "returned",
      returnedAt: toDateStr(new Date()),
    };
    borrowDb[recordIndex] = returned;

    return withMockPromise(returned);
  },

  async renewBorrow({ borrowId, days = 7 }) {
    const recordIndex = borrowDb.findIndex((item) => item.id === Number(borrowId));
    if (recordIndex < 0) {
      throw new Error("Borrow record not found");
    }

    const record = borrowDb[recordIndex];
    const renewed = {
      ...record,
      dueDate: plusDays(record.dueDate, Number(days) || 7),
    };

    borrowDb[recordIndex] = renewed;
    return withMockPromise(renewed);
  },
};
