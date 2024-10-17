import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsIndexComponent } from './appointments-index.component';

describe('AppointmentsIndexComponent', () => {
  let component: AppointmentsIndexComponent;
  let fixture: ComponentFixture<AppointmentsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
