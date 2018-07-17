import { TestBed, inject } from '@angular/core/testing';

import { PaymentApiService } from './payment-api.service';

describe('PaymentApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentApiService]
    });
  });

  it('should be created', inject([PaymentApiService], (service: PaymentApiService) => {
    expect(service).toBeTruthy();
  }));
});
