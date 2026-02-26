import { booksMock } from "../mock/books.mock";
import type {
  Book,
  BookCreatePayload,
  BookFilters,
  BookStatus,
  BookUpdatePayload,
} from "../types/book";

let booksDb: Book[] = booksMock.map((item) => ({ ...item }));

const clone = <T>(payload: T): T => JSON.parse(JSON.stringify(payload));

const normalizeStatus = (quantity: number): BookStatus => (quantity > 0 ? "available" : "unavailable");

const normalizeBook = (payload: Partial<Book> & { id: number }): Book => {
  const quantity = Math.max(0, Number(payload.quantity) || 0);

  return {
    id: Number(payload.id),
    title: String(payload.title || "Untitled").trim(),
    author: String(payload.author || "Unknown").trim(),
    category: String(payload.category || "General").trim(),
    quantity,
    status: normalizeStatus(quantity),
  };
};

const nextId = () => (booksDb.length ? Math.max(...booksDb.map((item) => item.id)) + 1 : 1);

const matchFilter = (book: Book, filters: BookFilters) => {
  const query = String(filters.query || "").trim().toLowerCase();
  const category = String(filters.category || "").trim().toLowerCase();
  const status = String(filters.status || "").trim().toLowerCase();

  if (query) {
    const matchedText =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query);
    if (!matchedText) {
      return false;
    }
  }

  if (category && book.category.toLowerCase() !== category) {
    return false;
  }

  if (status && book.status.toLowerCase() !== status) {
    return false;
  }

  return true;
};

export const bookServiceTs = {
  // TODO: Replace mock with real API when backend is ready.
  async getAll(filters: BookFilters = {}): Promise<Book[]> {
    try {
      const rows = booksDb.filter((book) => matchFilter(book, filters)).sort((a, b) => a.id - b.id);
      return Promise.resolve(clone(rows));
    } catch (error) {
      throw new Error("Cannot get books from mock source");
    }
  },

  async getById(id: number): Promise<Book | null> {
    try {
      const row = booksDb.find((item) => item.id === Number(id)) || null;
      return Promise.resolve(clone(row));
    } catch (error) {
      throw new Error("Cannot get book detail from mock source");
    }
  },

  async create(payload: BookCreatePayload): Promise<Book> {
    try {
      const book = normalizeBook({
        id: nextId(),
        ...payload,
      });
      booksDb.push(book);
      return Promise.resolve(clone(book));
    } catch (error) {
      throw new Error("Cannot create book in mock source");
    }
  },

  async update(id: number, payload: BookUpdatePayload): Promise<Book> {
    try {
      const index = booksDb.findIndex((item) => item.id === Number(id));
      if (index < 0) {
        throw new Error("Book not found");
      }

      const updated = normalizeBook({
        ...booksDb[index],
        ...payload,
        id: booksDb[index].id,
      });

      booksDb[index] = updated;
      return Promise.resolve(clone(updated));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Cannot update book in mock source");
    }
  },

  async delete(id: number): Promise<Book> {
    try {
      const index = booksDb.findIndex((item) => item.id === Number(id));
      if (index < 0) {
        throw new Error("Book not found");
      }

      const [removed] = booksDb.splice(index, 1);
      return Promise.resolve(clone(removed));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Cannot delete book in mock source");
    }
  },
};

export default bookServiceTs;
