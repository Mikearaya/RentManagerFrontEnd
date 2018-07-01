import { OwnerModule } from './owner.module';

describe('OwnerModule', () => {
  let ownerModule: OwnerModule;

  beforeEach(() => {
    ownerModule = new OwnerModule();
  });

  it('should create an instance', () => {
    expect(ownerModule).toBeTruthy();
  });
});
