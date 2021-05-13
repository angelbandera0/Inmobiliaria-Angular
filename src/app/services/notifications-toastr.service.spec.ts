import { TestBed } from '@angular/core/testing';

import { NotificationsToastrService } from './notifications-toastr.service';

describe('NotificationsToastrService', () => {
  let service: NotificationsToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
