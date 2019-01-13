import { Injectable } from '@angular/core';
import { LocalStorageRepositoryService } from './repositories/local-storage-repository.service';
import { StorageRepository } from './repositories/storage-repository';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Todo } from '../model/todo';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private storage: StorageRepository;
  private todos$: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

  constructor(storage: LocalStorageRepositoryService) {
    this.storage = storage;
  }
  /**
   * Get all todos
   */
  getAll(): Observable<Todo[]> {
    if (this.todos$.value.length < 1) {
      const todos = this.storage.getAll();
      this.todos$.next(todos);
    }
    return this.todos$.asObservable();
  }

  /**
   * Add new todo
   * @param todo todo
   */
  add(todo: Todo): Observable<Todo> {
    const added = this.storage.add(todo);
    const todos = [...this.todos$.value, added];
    this.todos$.next(todos);
    return of(added);
  }

  /**
   * Edit todo
   * @param todo todo
   */
  edit(todo: Todo): Observable<Todo> {
    const edited = this.storage.edit(todo);
    const index = this.todos$.value.findIndex(e => e.id === todo.id);
    this.todos$.value[index] = todo;
    this.todos$.next(this.todos$.value);
    return of(edited);
  }
  /**
   * Remove todo
   * @param todo todo
   */
  remove(todo: Todo): Observable<void> {
    const todos = this.todos$.value.filter(e => e.id !== todo.id);
    this.todos$.next(todos);
    const removed = this.storage.remove(todo);
    return of(removed);
  }

  /**
   * Get todo by id
   * @param id todo`s id
   */
  get(id: number): Observable<Todo> {
    return of(this.todos$.value.find(e => e.id === id));
  }
}
