import { PartnersPaymentModule } from './partners-payment.module';

describe('PartnersPaymentModule', () => {
  let partnersPaymentModule: PartnersPaymentModule;

  beforeEach(() => {
    partnersPaymentModule = new PartnersPaymentModule();
  });

  it('should create an instance', () => {
    expect(partnersPaymentModule).toBeTruthy();
  });
});
