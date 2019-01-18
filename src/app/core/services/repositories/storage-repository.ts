import { Todo } from '../../model/todo';
import { Observable } from 'rxjs';

export interface StorageRepository<T> {
  get(id: number): Observable<T>;
  getAll(): Observable<T[]>;
  add(todo: T): Observable<T>;
  remove(todo: T): Observable<void>;
  edit(todo: T): Observable<T>;
}
