import { Injectable } from '@angular/core';
import { StorageRepository } from './storage-repository';
import { Todo } from '../../model/todo';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRepositoryService implements StorageRepository {
  constructor() { }

  remove(todo: Todo): void {
    let todos = this.getAll();
    todos = todos.filter(e => e.id !== todo.id);
    this.save(todos);
  }
  edit(todo: Todo): Todo {
    const todos = this.getAll();
    const index = todos.findIndex(e => e.id === todo.id);
    todos[index] = todo;
    this.save(todos);

    return todo;
  }
  get(id: number): Todo {
    const todos = this.getAll();
    return todos.find(e => e.id === id);
  }
  getAll(): Todo[] {
    const todos = JSON.parse(localStorage.getItem('todos')) as Todo[] || [];
    console.log(todos);
    return todos;
  }
  add(todo: Todo): Todo {
    const todos = this.getAll();
    todos.push(todo);
    this.save(todos);

    return todo;
  }

  private save(todos: Todo[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

}
