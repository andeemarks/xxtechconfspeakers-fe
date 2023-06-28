import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloutsComponent } from './callouts.component';

describe('CalloutsComponent', () => {
  let component: CalloutsComponent;
  let fixture: ComponentFixture<CalloutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalloutsComponent]
    });
    fixture = TestBed.createComponent(CalloutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
