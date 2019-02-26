import { TestBed } from '@angular/core/testing';

import { IndexeddbRepositoryService } from './indexeddb-repository.service';
import { Todo } from '@core/model';

describe('IndexeddbRepositoryService', () => {

  let service: IndexeddbRepositoryService = null;

  const todo: Todo = {
    checked: false,
    title: 'title',
    id: 1
  };

  beforeAll((done) => {
    const req = window.indexedDB.deleteDatabase('todos');
    req.onsuccess = (e) => {
      done();
    };
  });

  beforeEach((done) => {
    TestBed.configureTestingModule({});
    const req = window.indexedDB.deleteDatabase('todos');
    req.onsuccess = (e) => {
      service = new IndexeddbRepositoryService();
      service.add(todo).subscribe(s => {
        done();
      });
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add new todo to indexeddb', (done) => {
    // Arrange
    const _todo: Todo = {
      checked: false,
      title: 'title',
      id: 2
    };
    // Act
    service.add(_todo).subscribe(c => {
      service.get(2).subscribe(res => {
        // Assert
        expect(res).toEqual(_todo);
        done();
      });
    });
  });

  it('should edit todo in indexeddb', (done) => {
    // Arrange
    // Act
    service.edit({...todo, checked: true}).subscribe(s => {
      // Assert
      service.get(1).subscribe(res => {
        expect(res).toEqual({...todo, checked: true});
        done();
      });
    });
  });

  it('should remove todo from indexeddb', (done) => {
    // Arrange
    // Act
    service.remove(todo).subscribe(s => {
      // Assert
      service.get(1).subscribe(res => {
        expect(res).toBeUndefined();
        done();
      });
    });
  });

  it('should get all todos from indexeddb', (done) => {
    // Arrange
    // Act
    // Assert
    service.getAll().subscribe(res => {
      expect(res).not.toBeUndefined();
      done();
    });
  });
});
