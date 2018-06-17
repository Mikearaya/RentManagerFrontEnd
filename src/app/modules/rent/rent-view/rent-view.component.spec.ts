
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentViewComponent } from './rent-view.component';

describe('RentViewComponent', () => {
  let component: RentViewComponent;
  let fixture: ComponentFixture<RentViewComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
