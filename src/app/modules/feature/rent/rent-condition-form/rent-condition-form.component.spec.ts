import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentConditionFormComponent } from './rent-condition-form.component';

describe('RentConditionFormComponent', () => {
  let component: RentConditionFormComponent;
  let fixture: ComponentFixture<RentConditionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentConditionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentConditionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
