export type BorrowStatus = "borrowing" | "returned" | "overdue";

export interface BorrowRecord {
  id: number;
  userId: number;
  bookId: number;
  borrowedAt: string;
  dueDate: string;
  returnedAt: string | null;
  status: BorrowStatus | "borrowing" | "returned";
}

export interface BorrowPayload {
  userId: number;
  bookId: number;
}
