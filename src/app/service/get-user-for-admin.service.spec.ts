import { TestBed, inject } from '@angular/core/testing';

import { GetUserForAdminService } from './get-user-for-admin.service';

describe('GetUserForAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetUserForAdminService]
    });
  });

  it('should be created', inject([GetUserForAdminService], (service: GetUserForAdminService) => {
    expect(service).toBeTruthy();
  }));
});
