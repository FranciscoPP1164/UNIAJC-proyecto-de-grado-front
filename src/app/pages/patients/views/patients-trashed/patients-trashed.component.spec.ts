import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsTrashedComponent } from './patients-trashed.component';

describe('PatientsTrashedComponent', () => {
  let component: PatientsTrashedComponent;
  let fixture: ComponentFixture<PatientsTrashedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsTrashedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsTrashedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
