import { Injectable } from '@angular/core';
import { StorageRepository } from './storage-repository';
import { Todo } from '../../model/todo';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRepositoryService implements StorageRepository {
  constructor() { }

  /**
   * Remove todo from localStorage
   * @param todo todo
   */
  remove(todo: Todo): void {
    let todos = this.getAll();
    todos = todos.filter(e => e.id !== todo.id);
    this.save(todos);
  }

  /**
   * Edit todo in localStorage
   * @param todo todo
   */
  edit(todo: Todo): Todo {
    const todos = this.getAll();
    const index = todos.findIndex(e => e.id === todo.id);
    todos[index] = todo;
    this.save(todos);

    return todo;
  }

  /**
   * Get todo by id from localStorage
   * @param id todo`s id
   */
  get(id: number): Todo {
    const todos = this.getAll();
    return todos.find(e => e.id === id);
  }

  /**
   * Get all todos from localStorage
   */
  getAll(): Todo[] {
    const todos = JSON.parse(localStorage.getItem('todos')) as Todo[] || [];
    return todos;
  }

  /**
   * Save new todo to localStorage
   * @param todo todo
   */
  add(todo: Todo): Todo {
    const todos = this.getAll();
    todos.push(todo);
    this.save(todos);

    return todo;
  }
  /**
   * Save todos to localStorage
   * @param todos todos
   */
  private save(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

}
