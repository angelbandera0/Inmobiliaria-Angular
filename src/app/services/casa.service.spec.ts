import { TestBed } from '@angular/core/testing';

import { CasaService } from './casa.service';

describe('CasaService', () => {
  let service: CasaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
