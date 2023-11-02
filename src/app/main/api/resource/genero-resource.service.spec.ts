import { TestBed } from '@angular/core/testing';

import { GeneroResourceService } from './genero-resource.service';

describe('GeneroResourceService', () => {
  let service: GeneroResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneroResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
