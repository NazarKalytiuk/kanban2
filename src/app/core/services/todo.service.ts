import { Injectable } from '@angular/core';
import { LocalStorageRepositoryService } from './repositories/local-storage-repository.service';
import { StorageRepository } from './repositories/storage-repository';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Todo } from '../model/todo';
import { tap } from 'rxjs/operators';
import { IndexeddbRepositoryService } from './repositories/indexeddb-repository.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private storage: StorageRepository<Todo>;
  private todos$: BehaviorSubject<Todo[]> = new BehaviorSubject(null);

  constructor(storage: IndexeddbRepositoryService) {
    this.storage = storage;
  }
  /**
   * Get all todos
   */
  getAll(): Observable<Todo[]> {
    if (!this.todos$.value) {
      const all$ = this.storage.getAll().subscribe(c => {
        console.log(c);
        this.todos$.next(c);
        all$.unsubscribe();
      });
    }
    return this.todos$.asObservable();
  }

  /**
   * Add new todo
   * @param todo todo
   */
  add(todo: Todo): Observable<Todo> {
    return this.storage.add(todo).pipe(
      tap(e => {
        const todos = [...this.todos$.value, e];
        this.todos$.next(todos);
      }));
  }

  /**
   * Edit todo
   * @param todo todo
   */
  edit(todo: Todo): Observable<Todo> {
    return this.storage.edit(todo).pipe(tap(s => {
      const index = this.todos$.value.findIndex(e => e.id === todo.id);
      this.todos$.value[index] = todo;
      this.todos$.next(this.todos$.value);
    }));
  }
  /**
   * Remove todo
   * @param todo todo
   */
  remove(todo: Todo): Observable<void> {
    return this.storage.remove(todo).pipe(tap(s => {
      const todos = this.todos$.value.filter(e => e.id !== todo.id);
      this.todos$.next(todos);
    }));
  }

  /**
   * Get todo by id
   * @param id todo`s id
   */
  get(id: number): Observable<Todo> {
    if (this.todos$.value.length > 0) {
      return of(this.todos$.value.find(e => e.id === id));
    } else {
      return this.storage.get(id);
    }
  }
}
