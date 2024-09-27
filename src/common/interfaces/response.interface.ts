export interface ResponseList<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  perPage: number;
}
