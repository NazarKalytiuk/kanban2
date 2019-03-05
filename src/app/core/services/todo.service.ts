import { Injectable, Inject, Injector } from '@angular/core';
import { of, Observable, BehaviorSubject} from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { Todo } from '@core/model';
import { StorageRepository } from './repositories/storage-repository';
import { IndexeddbRepositoryService } from './repositories/indexeddb-repository.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  storage: StorageRepository<Todo>;
  private todos: Todo[] = [];
  private todos$: BehaviorSubject<Todo[]> = new BehaviorSubject(null);

  constructor(private injector: Injector) {
    this.storage = this.injector.get(IndexeddbRepositoryService);
  }

  /**
   * Get all todos
   */
  getAll(): Observable<any> {
    return this.storage.getAll().pipe(
      tap(e => {
        this.todos = e;
        this.todos$.next(this.todos);
      }),
      switchMap(e => this.todos$)
    );
  }

  /**
   * Add new todo
   * @param todo todo
   */
  add(todo: Todo): Observable<Todo> {
    return this.storage.add(todo).pipe(
      tap(e => {
        this.todos.push(e);
        this.todos$.next(this.todos);
      })
    );
  }

  /**
   * Edit todo
   * @param todo todo
   */
  edit(todo: Todo): Observable<Todo> {
    return this.storage.edit(todo).pipe(
      tap(s => {
        const index = this.todos.findIndex(e => e.id === todo.id);
        this.todos[index] = todo;
        this.todos$.next(this.todos);
      })
    );
  }
  /**
   * Remove todo
   * @param todo todo
   */
  remove(todo: Todo): Observable<void> {
    return this.storage.remove(todo).pipe(
      tap(s => {
        this.todos = this.todos.filter(e => e.id !== todo.id);
        this.todos$.next(this.todos);
      })
    );
  }

  /**
   * Get todo by id
   * @param id todo`s id
   */
  get(id: number): Observable<Todo> {
    if (this.todos.length > 0) {
      return of(this.todos.find(e => e.id === id));
    } else {
      return this.storage.get(id);
    }
  }
}
