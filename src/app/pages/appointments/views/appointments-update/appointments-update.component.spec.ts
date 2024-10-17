import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsUpdateComponent } from './appointments-update.component';

describe('AppointmentsUpdateComponent', () => {
  let component: AppointmentsUpdateComponent;
  let fixture: ComponentFixture<AppointmentsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
