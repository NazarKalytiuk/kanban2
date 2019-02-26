import { TestBed } from '@angular/core/testing';

import { LocalStorageRepositoryService } from './local-storage-repository.service';
import { Todo } from '@core/model';
import { Subject, of } from 'rxjs';
import { takeUntil, flatMap, concat } from 'rxjs/operators';

function initLocalStorageMock() {
  let store = {};
  spyOn(localStorage, 'getItem').and.callFake( (key: string): String => {
    return store[key] || null;
   });
   spyOn(localStorage, 'removeItem').and.callFake((key: string): void =>  {
     delete store[key];
   });
   spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string =>  {
     return store[key] = <string>value;
   });
   spyOn(localStorage, 'clear').and.callFake(() =>  {
       store = {};
   });
}

describe('LocalStorageRepositoryService', () => {

  let service: LocalStorageRepositoryService = null;
  let destroyed$: Subject<boolean> = null;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    destroyed$ = new Subject();

    service = TestBed.get(LocalStorageRepositoryService);
    initLocalStorageMock();

  });

  afterEach(() => {
    destroyed$.next(true);
    destroyed$.complete();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new todo to localStorage', (done) => {
    // Arrange
    const todo: Todo = {
      checked: false,
      title: 'newTodo'
    };
    // Act
    service.add(todo).pipe(takeUntil(destroyed$)).subscribe(res => {
      // Assert
      const result = JSON.parse(localStorage.getItem('todos'));
      expect(result).toEqual([todo]);
      done();
    });

  });

  it('should remove todo from localStorage', (done) => {
    // Arrange
    const todo: Todo = {
      checked: false,
      title: 'newTodo'
    };
    // Act
    service.add(todo).pipe(
      flatMap(res => service.remove({...todo, id: res.id})),
      takeUntil(destroyed$)
    ).subscribe(s => {
      // Assert
      const result = JSON.parse(localStorage.getItem('todos'));
      expect(result).toEqual([]);
      done();
    });
  });

  it('should edit todo in localStorage', (done) => {
    // Arrange
    const todo: Todo = {
      checked: false,
      title: 'newTodo'
    };
    // Acts
    service.add(todo).pipe(
      flatMap(e => service.edit({...todo, title: 'edited'})),
      takeUntil(destroyed$)
    ).subscribe(res => {
      // Assert
      const result = JSON.parse(localStorage.getItem('todos'));
      expect(result).toEqual([{...todo, title: 'edited'}]);
      done();
    });
  });

  it('should get todo from localStorage', (done) => {
    // Arrange
    const todo: Todo = {
      checked: false,
      title: 'newTodo'
    };
    // Act
    service.add(todo).pipe(
      flatMap(e => service.get(e.id)),
      takeUntil(destroyed$)
    ).subscribe(s => {
      // Assert
      expect(s).toEqual({...todo, id: s.id});
      done();
    });
  });

  it('should get all todos from localStorage', (done) => {
    // Arrange
    const todo: Todo = {
      checked: false,
      title: 'newTodo'
    };
    // Act
    service.add(todo).pipe(
      flatMap(e => service.getAll()),
      takeUntil(destroyed$)
    ).subscribe(s =>  {
      // Assert
      expect(s).toEqual([{...todo, id: s[0].id}]);
      done();
    });
  });

});
