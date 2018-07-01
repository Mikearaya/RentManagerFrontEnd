import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentFormComponent } from './rent-form.component';

describe('RentFormComponent', () => {
  let component: RentFormComponent;
  let fixture: ComponentFixture<RentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
