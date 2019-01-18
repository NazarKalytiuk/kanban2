import { Injectable } from '@angular/core';
import { StorageRepository } from './storage-repository';
import { Todo } from '../../model/todo';
import { Observable, BehaviorSubject, of, ReplaySubject, Observer } from 'rxjs';
import { flatMap, filter } from 'rxjs/operators';

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

  private db$: ReplaySubject<IDBDatabase> = new ReplaySubject();

  private storeName = 'todos';

  constructor() {
    const request = this.indexedDB.open(this.storeName, 1);

    request.onerror = console.error;

    request.onsuccess = (e) => {
      this.db$.next(request.result);
    };

    request.onupgradeneeded = (e) => {
      const db = request.result;
      const objects = db.createObjectStore(this.storeName, {keyPath: 'id', autoIncrement: true});
      objects.createIndex('id', 'id', {unique: true});
    };
  }

  get(id: number): Observable<Todo> {
    return this.db$.pipe(flatMap(db => {
      const request = db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).get(id);
      return Observable.create(o => {
        request.onerror = o.error;
        request.onsuccess = (e) => o.next(request.result);
      });
    }));
  }

  getAll(): Observable<Todo[]> {
    return this.db$.pipe(flatMap(db => {
      const request = db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).getAll();
      return Observable.create((o) => {
        request.onerror = o.error;
        request.onsuccess = e => o.next(request.result);
      });
    }));
  }

  add(todo: Todo): Observable<Todo> {
    return this.db$.pipe(flatMap(db => {
      const request = db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).add(todo);
      return Observable.create(o => {
        request.onerror = o.error;
        request.onsuccess = e => {
          const subs$ = this.get(<number>request.result).subscribe(w => {
            o.next(w);
            subs$.unsubscribe();
          });
        };
      });
    }));
  }

  remove(todo: Todo): Observable<void> {
    return this.db$.pipe(flatMap(db => {
      const request = db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).delete(todo.id);
      return Observable.create(o => {
        request.onerror = o.error;
        request.onsuccess = e => o.next(request.result);
      });
    }));
  }

  edit(todo: Todo): Observable<Todo> {
    return this.db$.pipe(flatMap(db => {
      const request = db.transaction(this.storeName, 'readwrite').objectStore(this.storeName).put(todo);
      return Observable.create(o => {
        request.onerror = o.error;
        request.onsuccess = e => o.next(todo);
      });
    }));
  }

}
