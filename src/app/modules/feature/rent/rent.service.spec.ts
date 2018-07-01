import { TestBed, inject } from '@angular/core/testing';

import { RentService } from './rent.service';

describe('RentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RentService]
    });
  });

  it('should be created', inject([RentService], (service: RentService) => {
    expect(service).toBeTruthy();
  }));
});
