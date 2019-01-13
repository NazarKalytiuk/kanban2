import { Injectable } from '@angular/core';
import { LocalStorageRepositoryService } from './repositories/local-storage-repository.service';
import { StorageRepository } from './repositories/storage-repository';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storage: StorageRepository;
  constructor(storage: LocalStorageRepositoryService) {
    this.storage = storage;
  }

  getAll() {
    console.log(this.storage);
  }
}
