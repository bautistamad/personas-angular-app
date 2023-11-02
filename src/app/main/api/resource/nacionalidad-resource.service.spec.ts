import { TestBed } from '@angular/core/testing';

import { NacionalidadResourceService } from './nacionalidad-resource.service';

describe('NacionalidadResourceService', () => {
  let service: NacionalidadResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NacionalidadResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
