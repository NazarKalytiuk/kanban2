import { TestBed } from '@angular/core/testing';

import { LocalStorageRepositoryService } from './local-storage-repository.service';
import { Todo } from '@core/model';

describe('LocalStorageRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.clear();
  });

  it('should be created', () => {
    const service: LocalStorageRepositoryService = TestBed.get(LocalStorageRepositoryService);
    expect(service).toBeTruthy();
  });

  it('should add new todo to localStorage', () => {
    // Arrange
    const service: LocalStorageRepositoryService = TestBed.get(LocalStorageRepositoryService);
    const todo: Todo = {
      checked: false,
      title: 'title'
    };
    // Act
    service.add(todo).subscribe(c => {
      const todos = JSON.parse(localStorage.getItem('todos'));
      // Assert
      expect(todos[0]).toEqual(todo);
    });
  });

  it('should remove todo from localStorage', () => {
    // Arrange
    const service: LocalStorageRepositoryService = TestBed.get(LocalStorageRepositoryService);
    const todo: Todo = {
      checked: false,
      title: 'title',
      id: 123
    };
    // Act
    service.add(todo).subscribe(c => {
      service.remove(todo).subscribe(_ => {
        const todos = JSON.parse(localStorage.getItem('todos'));
        // Assert
        expect(todos).toEqual([]);
      });
    });
  });

  it('should edit todo in localStorage', () => {
    // Arrange
    const service: LocalStorageRepositoryService = TestBed.get(LocalStorageRepositoryService);
    const todo: Todo = {
      checked: false,
      title: 'title'
    };
    // Act
    service.add(todo).subscribe(c => {
      service.edit({...todo, title: 'newTitle'}).subscribe(e => {
        const todos = JSON.parse(localStorage.getItem('todos'));
        expect(todos[0].title).toEqual('newTitle');
      });
    });
  });

  it('should get todo from localStorage', () => {
    // Arrange
    const service: LocalStorageRepositoryService = TestBed.get(LocalStorageRepositoryService);
    const todo: Todo = {
      checked: false,
      title: 'title',
      id: 1
    };
    // Act
    service.add(todo).subscribe(c => {
      service.get(1).subscribe(e => {
        const todos = JSON.parse(localStorage.getItem('todos'));
        expect(todos[0]).toEqual(todo);
      });
    });
  });

  it('should get all todos from localStorage', () => {
    // Arrange
    const service: LocalStorageRepositoryService = TestBed.get(LocalStorageRepositoryService);
    const todo: Todo = {
      checked: false,
      title: 'title',
      id: 1
    };
    // Act
    service.add(todo).subscribe(c => {
      service.getAll().subscribe(e => {
        const todos = JSON.parse(localStorage.getItem('todos'));
        expect(todos).toEqual([todo]);
      });
    });
  });

});
