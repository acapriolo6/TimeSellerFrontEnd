import { TestBed, inject } from '@angular/core/testing';

import { CloseauctionService } from './closeauction.service';

describe('CloseauctionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CloseauctionService]
    });
  });

  it('should be created', inject([CloseauctionService], (service: CloseauctionService) => {
    expect(service).toBeTruthy();
  }));
});
