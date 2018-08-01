import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentExtensionFormComponent } from './rent-extension-form.component';

describe('RentExtensionFormComponent', () => {
  let component: RentExtensionFormComponent;
  let fixture: ComponentFixture<RentExtensionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentExtensionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentExtensionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
