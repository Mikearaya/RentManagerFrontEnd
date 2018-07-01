import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentDetailFormComponent } from './rent-detail-form.component';

describe('RentDetailFormComponent', () => {
  let component: RentDetailFormComponent;
  let fixture: ComponentFixture<RentDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
