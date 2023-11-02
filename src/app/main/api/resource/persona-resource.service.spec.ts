import { TestBed } from '@angular/core/testing';

import { PersonaResourceService } from './persona-resource.service';

describe('PersonaResourceService', () => {
  let service: PersonaResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
