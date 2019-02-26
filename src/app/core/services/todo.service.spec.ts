import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { StorageRepository } from './repositories/storage-repository';
import { Todo } from '@core/model';
import { Observable, of } from 'rxjs';
import { IndexeddbRepositoryService } from './repositories/indexeddb-repository.service';
import { LocalStorageRepositoryService } from './repositories/local-storage-repository.service';
import { concat } from 'rxjs/operators';

class MockRepository implements StorageRepository<Todo> {
  private todo: Todo = {
    checked: false,
    title: 'title',
    id: 1
  };
  get(id: number): Observable<Todo> {
    return of(this.todo);
  }
  getAll(): Observable<Todo[]> {
    return of([this.todo]);
  }
  add(todo: Todo): Observable<Todo> {
    return of(todo);
  }
  remove(todo: Todo): Observable<undefined> {
    return of(undefined);
  }
  edit(todo: Todo): Observable<Todo> {
    return of(todo);
  }
}

describe('TodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: IndexeddbRepositoryService, useValue: new MockRepository()},
        {provide: LocalStorageRepositoryService, useValue: new MockRepository()}]
    });
  });

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });

  it('should add new todo', (done) => {
    const service: TodoService = TestBed.get(TodoService);
    const todo: Todo = {
      checked: false,
      title: 'title',
      id: 1
    };
    service.add(todo).subscribe(s => {
      service.get(todo.id).subscribe(e => {
        expect(todo).toEqual(e);
        done();
      });
    });
  });

  it('should edit todo', (done) => {
    const service: TodoService = TestBed.get(TodoService);
    const todo: Todo = {
      checked: false,
      title: 'title',
      id: 1
    };
    service.add(todo).subscribe(s => {
      service.edit({...todo, checked: true}).subscribe(r => {
        service.get(todo.id).subscribe(e => {
          expect(todo.checked).not.toEqual(e.checked);
          done();
        });
      });
    });
  });

  it('should remove todo', (done) => {
    const service: TodoService = TestBed.get(TodoService);
    const todo: Todo = {
      checked: false,
      title: 'title',
      id: 1
    };
    const todo2: Todo = {
      checked: false,
      title: 'title',
      id: 2
    };
    service.add(todo).subscribe(s => {
      service.add(todo2).subscribe(w => {
        service.remove(todo).subscribe(null, null, () => {
          service.get(todo.id).subscribe(e => {
            expect(e).toBeUndefined();
            done();
          });
        });
      });
    });
  });

  it('should get new todo from storage todo', (done) => {
    const service: TodoService = TestBed.get(TodoService);
    service.get(5).subscribe(e => {
      expect(e).not.toBeUndefined();
      done();
    });
  });

  it('should get all todos', (done) => {
    const service: TodoService = TestBed.get(TodoService);
    service.getAll().subscribe(e => {
      expect(e).not.toBeUndefined();
      done();
    });
  });

});
