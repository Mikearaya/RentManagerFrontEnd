import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentContratComponent } from './rent-contrat.component';

describe('RentContratComponent', () => {
  let component: RentContratComponent;
  let fixture: ComponentFixture<RentContratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentContratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
