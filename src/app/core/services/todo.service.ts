import { Injectable } from '@angular/core';
import { LocalStorageRepositoryService } from './repositories/local-storage-repository.service';
import { StorageRepository } from './repositories/storage-repository';
import { of, Observable } from 'rxjs';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storage: StorageRepository;
  constructor(storage: LocalStorageRepositoryService) {
    this.storage = storage;
  }

  getAll(): Observable<Todo[]> {
    return of(this.storage.getAll());
  }

  add(todo: Todo): Observable<Todo> {
    return of(this.storage.add(todo));
  }

  edit(todo: Todo): Observable<Todo> {
    return of(this.storage.edit(todo));
  }

  remove(todo: Todo): Observable<void> {
    return of(this.storage.remove(todo));
  }

  get(id: number): Observable<Todo> {
    return of(this.storage.get(id));
  }
}
