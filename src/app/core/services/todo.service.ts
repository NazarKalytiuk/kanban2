import { Injectable, Injector } from '@angular/core';
import { Todo } from '@core/model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IndexeddbRepositoryService } from './repositories/indexeddb-repository.service';
import { StorageRepository } from './repositories/storage-repository';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storage: StorageRepository<Todo>;
  private todos$: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

  constructor(private injector: Injector) {
    this.storage = this.injector.get(IndexeddbRepositoryService);
  }

  /**
   * Get all todos
   */
  getAll(): Observable<any> {
    return this.storage.getAll().pipe(
      tap(e => {
        this.todos$.next(e);
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
        this.todos$.next([...this.todos$.value, e]);
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
        const index = this.todos$.value.findIndex(e => e.id === todo.id);
        this.todos$.value[index] = todo;
        this.todos$.next(this.todos$.value);
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
        const todos = this.todos$.value.filter(e => e.id !== todo.id);
        this.todos$.next(todos);
      })
    );
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
