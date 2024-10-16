import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsIndexComponent } from './patients-index.component';

describe('PatientsIndexComponent', () => {
  let component: PatientsIndexComponent;
  let fixture: ComponentFixture<PatientsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
