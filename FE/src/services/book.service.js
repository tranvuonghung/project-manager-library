import { booksMock } from "../mock/books.mock";
import { clone, withMockPromise } from "../utils/mockHelpers";

let booksDb = clone(booksMock);

const normalizeBook = (book) => ({
  ...book,
  quantity: Number(book.quantity) || 0,
  status: Number(book.quantity) > 0 ? "available" : "unavailable",
});

const nextId = () => (booksDb.length ? Math.max(...booksDb.map((item) => item.id)) + 1 : 1);

const filterBooks = (items, { query = "", category = "", status = "" } = {}) => {
  let data = [...items];

  if (query) {
    const q = query.trim().toLowerCase();
    data = data.filter(
      (item) => item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q)
    );
  }

  if (category) {
    data = data.filter((item) => item.category === category);
  }

  if (status) {
    data = data.filter((item) => item.status === status);
  }

  return data;
};

export const bookService = {
  // TODO: Replace mock with real API when backend is ready.
  getAll(filters = {}) {
    const filtered = filterBooks(booksDb, filters).sort((a, b) => a.id - b.id);
    return withMockPromise(filtered);
  },

  getById(id) {
    const book = booksDb.find((item) => item.id === Number(id)) || null;
    return withMockPromise(book);
  },

  create(payload) {
    const newBook = normalizeBook({
      id: nextId(),
      title: payload.title?.trim() || "Untitled",
      author: payload.author?.trim() || "Unknown",
      category: payload.category?.trim() || "General",
      quantity: payload.quantity,
      status: payload.status,
    });
    booksDb.push(newBook);
    return withMockPromise(newBook);
  },

  update(id, payload) {
    const index = booksDb.findIndex((item) => item.id === Number(id));
    if (index < 0) {
      return Promise.reject(new Error("Book not found"));
    }

    const updated = normalizeBook({
      ...booksDb[index],
      ...payload,
    });

    booksDb[index] = updated;
    return withMockPromise(updated);
  },

  delete(id) {
    const index = booksDb.findIndex((item) => item.id === Number(id));
    if (index < 0) {
      return Promise.reject(new Error("Book not found"));
    }

    const [removed] = booksDb.splice(index, 1);
    return withMockPromise(removed);
  },
};
