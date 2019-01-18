import { TestBed } from '@angular/core/testing';

import { IndexeddbRepositoryService } from './indexeddb-repository.service';

describe('IndexeddbRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndexeddbRepositoryService = TestBed.get(IndexeddbRepositoryService);
    expect(service).toBeTruthy();
  });
});
