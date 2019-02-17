import { Injectable } from '@angular/core';
import { Observable, AsyncSubject, of } from 'rxjs';
import { flatMap, } from 'rxjs/operators';

import { Todo } from '@core/model';
import { StorageRepository } from './storage-repository';

/**
 * Add indexeddb browser prefixes to Window interface
 */
declare global {
  interface Window {
    mozIndexedDB: IDBFactory;
    webkitIndexedDB: IDBFactory;
    msIndexedDB: IDBFactory;
  }
}

@Injectable({
  providedIn: 'root'
})
export class IndexeddbRepositoryService implements StorageRepository<Todo> {

  private indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  private db$: AsyncSubject<IDBDatabase> = new AsyncSubject(); // get db as subject when db is ready
  private storeName = 'todos';

  constructor() {
    const request = this.indexedDB.open(this.storeName, 1);

    request.onerror = console.error;

    request.onsuccess = (e) => {
      request.result.onversionchange = (event) => {
        request.result.close();
      };
      this.db$.next(request.result); // get initialized db
      this.db$.complete();
    };

    request.onupgradeneeded = (e) => {
      // create db
      const db = request.result;
      const objects = db.createObjectStore(this.storeName, {keyPath: 'id', autoIncrement: true});
      objects.createIndex('id', 'id', {unique: true});
    };
  }

  /**
   * Create observable from request
   * @param request IDBRequest
   */
  handleRequest(request: IDBRequest): Observable<any> {
    return Observable.create(o => {
      request.onerror = o.error;
      request.onsuccess = (e) => o.next(request.result);
    });
  }

  /**
   * Get Todo by id
   * @param id todo`s id
   */
  get(id: number | IDBValidKey): Observable<Todo> {
    return this.db$.pipe(flatMap(db => {
      const request = db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).get(id);
      return this.handleRequest(request);
    }));
  }

  /**
   * Get all todos from db
   */
  getAll(): Observable<Todo[]> {
    return this.db$.pipe(flatMap(db => {
      const request = db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).getAll();
      return this.handleRequest(request);
    }));
  }

  /**
   * Add new todo to indexeddb
   * @param todo Todo
   */
  add(todo: Todo): Observable<Todo> {
    return this.db$.pipe(flatMap(db => {
      const request = db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).add(todo);
      return this.handleRequest(request).pipe(flatMap(e => this.get(e)));
    }));
  }

  /**
   * Delete todo from db
   * @param todo Todo
   */
  remove(todo: Todo): Observable<void> {
    return this.db$.pipe(flatMap(db => {
      const request = db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).delete(todo.id);
      return this.handleRequest(request);
    }));
  }

  /**
   * Edit todo
   * @param todo Todo
   */
  edit(todo: Todo): Observable<Todo> {
    return this.db$.pipe(flatMap(db => {
      const request = db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).put(todo);
      return this.handleRequest(request).pipe(flatMap(e => this.get(e)));
    }));
  }

}
