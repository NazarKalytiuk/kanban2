import { Observable } from 'rxjs';

export interface StorageRepository<T> {
  get(id: number): Observable<T>;
  getAll(): Observable<T[]>;
  add(todo: T): Observable<T>;
  remove(todo: T): Observable<undefined>;
  edit(todo: T): Observable<T>;
}
