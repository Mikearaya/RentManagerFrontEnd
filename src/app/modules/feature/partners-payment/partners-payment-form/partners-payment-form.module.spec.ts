import { PartnersPaymentFormModule } from './partners-payment-form.module';

describe('PartnersPaymentFormModule', () => {
  let partnersPaymentFormModule: PartnersPaymentFormModule;

  beforeEach(() => {
    partnersPaymentFormModule = new PartnersPaymentFormModule();
  });

  it('should create an instance', () => {
    expect(partnersPaymentFormModule).toBeTruthy();
  });
});
