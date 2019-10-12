import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersPaymentFormComponent } from './partners-payment-form.component';

describe('PartnersPaymentFormComponent', () => {
  let component: PartnersPaymentFormComponent;
  let fixture: ComponentFixture<PartnersPaymentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersPaymentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
