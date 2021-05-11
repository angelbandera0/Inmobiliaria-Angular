import { TestBed } from '@angular/core/testing';

import { NgxUiLoadService } from './ngx-ui-load.service';

describe('NgxUiLoadService', () => {
  let service: NgxUiLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxUiLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
