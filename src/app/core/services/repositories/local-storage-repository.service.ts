import { Injectable } from '@angular/core';
import { StorageRepository } from './storage-repository';
import { Todo } from '../../model/todo';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRepositoryService implements StorageRepository {

  constructor() { }

  get(id: string): Todo {
    throw new Error('Method not implemented.');
  }
  getAll(): Todo[] {
    throw new Error('Method not implemented.');
  }
  add(todo: Todo): Todo {
    throw new Error('Method not implemented.');
  }

}
