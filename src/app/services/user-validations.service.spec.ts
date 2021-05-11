import { TestBed } from '@angular/core/testing';

import { UserValidationsService } from './user-validations.service';

describe('UserValidationsService', () => {
  let service: UserValidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserValidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
