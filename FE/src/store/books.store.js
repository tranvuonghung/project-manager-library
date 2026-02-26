import { defineStore } from "pinia";
import { bookService } from "../services/book.service";

export const useBooksStore = defineStore("books", {
  state: () => ({
    books: [],
    loading: false,
    error: "",
  }),

  getters: {
    categories: (state) => [...new Set(state.books.map((book) => book.category))],
    totalBooks: (state) => state.books.length,
  },

  actions: {
    async fetchBooks(filters = {}) {
      this.loading = true;
      this.error = "";
      try {
        this.books = await bookService.getAll(filters);
      } catch (error) {
        this.error = error?.message || "Unable to load books";
      } finally {
        this.loading = false;
      }
    },

    async addBook(payload) {
      this.loading = true;
      this.error = "";
      try {
        const created = await bookService.create(payload);
        this.books.push(created);
        return created;
      } catch (error) {
        this.error = error?.message || "Unable to add book";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateBook(id, payload) {
      this.loading = true;
      this.error = "";
      try {
        const updated = await bookService.update(id, payload);
        const index = this.books.findIndex((item) => item.id === updated.id);
        if (index >= 0) {
          this.books[index] = updated;
        }
        return updated;
      } catch (error) {
        this.error = error?.message || "Unable to update book";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteBook(id) {
      this.loading = true;
      this.error = "";
      try {
        const removed = await bookService.delete(id);
        this.books = this.books.filter((item) => item.id !== Number(id));
        return removed;
      } catch (error) {
        this.error = error?.message || "Unable to delete book";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
