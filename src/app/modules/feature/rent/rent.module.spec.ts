import { RentModule } from './rent.module';

describe('RentModule', () => {
  let rentModule: RentModule;

  beforeEach(() => {
    rentModule = new RentModule();
  });

  it('should create an instance', () => {
    expect(rentModule).toBeTruthy();
  });
});
