export interface ResponseList<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  perPage: number;
}

export interface Response<T> {
  data: T;
  ok: boolean;
  message: string;
}
