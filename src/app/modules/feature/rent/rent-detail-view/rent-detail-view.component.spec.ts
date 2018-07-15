import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentDetailViewComponent } from './rent-detail-view.component';

describe('RentDetailViewComponent', () => {
  let component: RentDetailViewComponent;
  let fixture: ComponentFixture<RentDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
