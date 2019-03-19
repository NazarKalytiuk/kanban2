import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { StorageRepository } from './repositories/storage-repository';
import { Todo } from '@core/model';
import { Observable, of, Subject } from 'rxjs';
import { IndexeddbRepositoryService } from './repositories/indexeddb-repository.service';
import { LocalStorageRepositoryService } from './repositories/local-storage-repository.service';
import { flatMap, takeUntil } from 'rxjs/operators';

class MockRepository implements StorageRepository<Todo> {
  store: Todo[] = [];
  get(id: number): Observable<Todo> {
    const result = this.store[id];
    return of(result);
  }
  getAll(): Observable<Todo[]> {
    return of(this.store);
  }
  add(todo: Todo): Observable<Todo> {
    this.store[todo.id] = todo;
    return of(todo);
  }
  remove(todo: Todo): Observable<undefined> {
    delete this.store[todo.id];
    return of(undefined);
  }
  edit(todo: Todo): Observable<Todo> {
    this.store[todo.id] = todo;
    return of(todo);
  }
}

describe('TodoService', () => {
  let destroyed$: Subject<boolean> = null;
  let service: TodoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: IndexeddbRepositoryService, useValue: new MockRepository()},
        {provide: LocalStorageRepositoryService, useValue: new MockRepository()}]
    });
    destroyed$ = new Subject();
    service = TestBed.get(TodoService);
  });

  afterEach(() => {
    destroyed$.next(true);
    destroyed$.complete();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new todo', (done) => {
    const todo: Todo = {
      checked: false,
      title: 'title',
      id: 1
    };
    service.add(todo).pipe(
      flatMap(e => service.get(e.id)),
      takeUntil(destroyed$)
    ).subscribe(e => {
      expect(todo).toEqual(e);
      done();
    });
  });

  it('should edit todo', (done) => {
    const todo: Todo = {
      checked: false,
      title: 'title',
      id: 2
    };
    service.add(todo).pipe(
      flatMap(e => service.edit({...todo, checked: true})),
      flatMap(s => service.get(s.id)),
      takeUntil(destroyed$)
    ).subscribe(e => {
      expect(todo.checked).not.toEqual(e.checked);
      done();
    });
  });

  it('should remove todo', (done) => {
    const todo: Todo = {
      checked: false,
      title: 'title',
      id: 3
    };
    service.add(todo).pipe(
      flatMap(e => service.remove(todo)),
      flatMap(s => service.get(todo.id)),
      takeUntil(destroyed$)
    ).subscribe(e => {
      expect(e).toBeUndefined();
      done();
    });
  });

  it('should get new todo from storage todo', (done) => {
    const todo: Todo = {
      checked: false,
      title: 'title',
      id: 4
    };
    service.add(todo).pipe(
      flatMap(e => service.get(e.id))
    ).subscribe(e => {
      expect(e).not.toBeUndefined();
      done();
    });
  });

  it('should get all todos', (done) => {
    service.getAll().subscribe(e => {
      expect(e).not.toBeUndefined();
      done();
    });
  });

});
