export type BookStatus = "available" | "unavailable";

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  quantity: number;
  status: BookStatus;
}

export interface BookFilters {
  query?: string;
  category?: string;
  status?: BookStatus;
}

export interface BookCreatePayload {
  title: string;
  author: string;
  category: string;
  quantity: number;
}

export type BookUpdatePayload = Partial<BookCreatePayload>;
