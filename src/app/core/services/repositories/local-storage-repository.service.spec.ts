import { TestBed } from '@angular/core/testing';

import { LocalStorageRepositoryService } from './local-storage-repository.service';

describe('LocalStorageRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageRepositoryService = TestBed.get(LocalStorageRepositoryService);
    expect(service).toBeTruthy();
  });
});
