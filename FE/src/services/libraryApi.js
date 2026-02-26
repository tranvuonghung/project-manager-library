import { bookService } from "./book.service";
import { borrowService } from "./borrow.service";
import { STORAGE_KEYS } from "../constants/storageKeys";

const withDelay = (payload, delay = 120) =>
  new Promise((resolve) => setTimeout(() => resolve(payload), delay));

const getCurrentUserId = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) {
      return 2;
    }
    const user = JSON.parse(raw);
    return Number(user?.id) || 2;
  } catch (error) {
    return 2;
  }
};

const coverPalette = ["cover-emerald", "cover-coral", "cover-violet", "cover-sky", "cover-sun"];

const isTechCategory = (category = "") => {
  const normalized = String(category).toLowerCase();
  return normalized.includes("program") || normalized.includes("software");
};

const matchesMainCategory = (book, categoryId = "all") => {
  if (!categoryId || categoryId === "all") {
    return true;
  }

  if (categoryId === "tech") {
    return isTechCategory(book.category);
  }

  if (categoryId === "self-help") {
    const normalized = String(book.category).toLowerCase();
    return normalized.includes("self help") || normalized.includes("productivity");
  }

  return true;
};

const matchesQuickGenre = (book, genreId = "popular") => {
  if (!genreId || genreId === "all") {
    return true;
  }

  if (genreId === "popular") {
    return Number(book.quantity) >= 3;
  }

  if (genreId === "new") {
    return Number(book.id) >= 4;
  }

  if (genreId === "classic") {
    return Number(book.id) <= 3;
  }

  return true;
};

const mapBookCard = (book, index = 0) => ({
  ...book,
  tag: isTechCategory(book.category) ? "tech" : "general",
  badge: book.status === "available" ? "Available" : "Out",
  badgeClass: book.status === "available" ? "badge-green" : "badge-red",
  cover: coverPalette[index % coverPalette.length],
  action: book.status === "available" ? "Borrow" : "Waitlist",
});

const buildPagination = (totalItems, page = 1, pageSize = 4) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return { page: safePage, pageSize, totalPages, pages };
};

export const fetchHomeData = async ({
  filterId = "all",
  categoryId = "all",
  genreId = "popular",
  query = "",
} = {}) => {
  // TODO: Replace mock with real API when backend is ready.
  const books = await bookService.getAll({ query });

  const mainCategories = [
    { id: "all", label: "Tất cả" },
    { id: "tech", label: "Công nghệ" },
    { id: "self-help", label: "Phát triển" },
  ];

  const quickGenres = [
    { id: "popular", label: "Phổ biến" },
    { id: "new", label: "Mới" },
    { id: "classic", label: "Kinh điển" },
  ];

  const discoverFilters = [
    { id: "all", label: "Tất cả" },
    { id: "tech", label: "Tech" },
    { id: "general", label: "General" },
  ];

  const mapped = books.map((book, index) => mapBookCard(book, index));
  const byCategory = mapped.filter((book) => matchesMainCategory(book, categoryId));
  const byGenre = byCategory.filter((book) => matchesQuickGenre(book, genreId));
  const discover = byGenre.filter((item) => (filterId === "all" ? true : item.tag === filterId));
  const recommended = (byGenre.length ? byGenre : byCategory.length ? byCategory : mapped).slice(0, 4);

  return withDelay({
    mainCategories,
    quickGenres,
    discoverFilters,
    recommended,
    discover,
  });
};

export const fetchLibrary = async ({ tab = "favorites", page = 1, query = "" } = {}) => {
  // TODO: Replace mock with real API when backend is ready.
  const userId = getCurrentUserId();
  const books = await bookService.getAll({ query });
  const borrowed = await borrowService.getByUser(userId);

  const borrowedBookIds = new Set(
    borrowed.filter((item) => item.status === "borrowing").map((item) => item.bookId)
  );

  const libraryItems = books
    .filter((book) => {
      if (tab === "active") {
        return borrowedBookIds.has(book.id);
      }
      return true;
    })
    .map((book, index) => ({
      ...mapBookCard(book, index),
      tab: tab === "active" ? "active" : "favorites",
    }));

  const pagination = buildPagination(libraryItems.length, page, 4);
  const start = (pagination.page - 1) * pagination.pageSize;
  const items = libraryItems.slice(start, start + pagination.pageSize);

  return withDelay({
    items,
    pagination,
    counts: {
      favorites: books.length,
      active: borrowedBookIds.size,
    },
  });
};

export const fetchHistory = async ({ page = 1 } = {}) => {
  // TODO: Replace mock with real API when backend is ready.
  const userId = getCurrentUserId();
  const books = await bookService.getAll();
  const bookMap = new Map(books.map((book) => [book.id, book]));

  const itemsRaw = await borrowService.getByUser(userId);

  const items = itemsRaw.map((item, index) => {
    const book = bookMap.get(item.bookId);
    const isBorrowing = item.status === "borrowing";

    return {
      id: item.id,
      bookId: item.bookId,
      code: `BR-${String(item.id).padStart(4, "0")}`,
      statusLabel: isBorrowing ? "Borrowing" : "Returned",
      statusClass: isBorrowing ? "status-warning" : "status-success",
      cover: coverPalette[index % coverPalette.length],
      title: book?.title || "Unknown",
      author: book?.author || "Unknown",
      borrowed: item.borrowedAt,
      returned: item.returnedAt,
      due: item.dueDate,
      actions: isBorrowing
        ? [
            { id: "renew", label: "Renew", variant: "primary" },
            { id: "return", label: "Return", variant: "ghost" },
          ]
        : [{ id: "borrow-again", label: "Borrow Again", variant: "primary" }],
    };
  });

  const pagination = buildPagination(items.length, page, 5);
  const start = (pagination.page - 1) * pagination.pageSize;
  const pagedItems = items.slice(start, start + pagination.pageSize);

  return withDelay({ items: pagedItems, pagination });
};

export const searchBooks = async ({ query = "" } = {}) => {
  // TODO: Replace mock with real API when backend is ready.
  const results = await bookService.getAll({ query });
  return withDelay({ results });
};

export const borrowBook = async ({ bookId } = {}) => {
  // TODO: Replace mock with real API when backend is ready.
  const userId = getCurrentUserId();
  const borrow = await borrowService.borrowBook({ userId, bookId });
  return withDelay({ success: true, message: "Borrow request queued", borrow });
};

export const renewLoan = async ({ loanId } = {}) => {
  // TODO: Replace mock with real API when backend is ready.
  const borrow = await borrowService.renewBorrow({ borrowId: loanId });
  return withDelay({ success: true, message: "Renew request queued", borrow });
};

export const submitReview = async ({ bookId, payload } = {}) => {
  // TODO: Replace mock with real API when backend is ready.
  return withDelay({ success: true, message: "Review saved", bookId, payload });
};

export const toggleFavorite = async ({ bookId } = {}) => {
  // TODO: Replace mock with real API when backend is ready.
  return withDelay({ success: true, message: "Favorite toggled", bookId });
};

export const returnBorrowedBook = async ({ borrowId } = {}) => {
  // TODO: Replace mock with real API when backend is ready.
  const borrow = await borrowService.returnBook({ borrowId });
  return withDelay({ success: true, borrow });
};
