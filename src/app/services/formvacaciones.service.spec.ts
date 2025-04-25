import { TestBed } from '@angular/core/testing';

import { FormvacacionesService } from './formvacaciones.service';

describe('FormvacacionesService', () => {
  let service: FormvacacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormvacacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
