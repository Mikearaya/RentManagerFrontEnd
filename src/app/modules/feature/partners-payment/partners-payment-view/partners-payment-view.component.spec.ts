import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersPaymentViewComponent } from './partners-payment-view.component';

describe('PartnersPaymentViewComponent', () => {
  let component: PartnersPaymentViewComponent;
  let fixture: ComponentFixture<PartnersPaymentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersPaymentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersPaymentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
