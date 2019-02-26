import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { Todo } from '@core/model';
import { StorageRepository } from './storage-repository';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRepositoryService implements StorageRepository<Todo> {
  constructor() { }

  /**
   * Remove todo from localStorage
   * @param todo todo
   */
  remove(todo: Todo): Observable<undefined> {
    let todos = this.getAllSync();
    todos = todos.filter(e => e.id !== todo.id);
    this.save(todos);
    return of(undefined);
  }

  /**
   * Edit todo in localStorage
   * @param todo todo
   */
  edit(todo: Todo): Observable<Todo> {
    const todos = this.getAllSync();
    const index = todos.findIndex(e => e.id === todo.id);
    todos[index] = todo;
    this.save(todos);

    return of(todo);
  }

  /**
   * Get todo by id from localStorage
   * @param id todo`s id
   */
  get(id: number): Observable<Todo> {
    const todos = this.getAllSync();
    const todo = todos.find(e => e.id === id);

    return of(todo);
  }

  /**
   * Get all todos from localStorage
   */
  getAll(): Observable<Todo[]> {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return of(todos);
  }

  /**
   * Save new todo to localStorage
   * @param todo todo
   */
  add(todo: Todo): Observable<Todo> {
    const todos = this.getAllSync();
    todo.id = new Date().valueOf(); // generate an id
    todos.push(todo);
    this.save(todos);

    return of(todo);
  }
  /**
   * Save todos to localStorage
   * @param todos todos
   */
  private save(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  private getAllSync(): Todo[] {
    const todos = JSON.parse(localStorage.getItem('todos')) as Todo[] || [];
    return todos;
  }

}
