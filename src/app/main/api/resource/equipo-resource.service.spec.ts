import { TestBed } from '@angular/core/testing';

import { EquipoResourceService } from './equipo-resource.service';

describe('EquipoResourceService', () => {
  let service: EquipoResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipoResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
