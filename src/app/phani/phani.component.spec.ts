import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaniComponent } from './phani.component';

describe('PhaniComponent', () => {
  let component: PhaniComponent;
  let fixture: ComponentFixture<PhaniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
