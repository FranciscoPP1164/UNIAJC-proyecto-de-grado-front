export interface IPagination<T> {
  count: number;
  current_page: number;
  data: T[];
  rowsPerPage: number;
}
