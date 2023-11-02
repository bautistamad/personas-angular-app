import { TestBed } from '@angular/core/testing';

import { HobbyResourceService } from './hobby-resource.service';

describe('HobbyResourceService', () => {
  let service: HobbyResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HobbyResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
