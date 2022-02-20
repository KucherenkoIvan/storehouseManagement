export interface IRepository<T> {
  exists (field: keyof T, value: T[keyof T]): Promise<boolean>;
}
