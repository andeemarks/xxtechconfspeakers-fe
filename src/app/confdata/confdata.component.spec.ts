import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfdataComponent } from './confdata.component';

describe('ConfdataComponent', () => {
  let component: ConfdataComponent;
  let fixture: ComponentFixture<ConfdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfdataComponent]
    });
    fixture = TestBed.createComponent(ConfdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
