import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursesUpdateComponent } from './nurses-update.component';

describe('NursesUpdateComponent', () => {
  let component: NursesUpdateComponent;
  let fixture: ComponentFixture<NursesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NursesUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NursesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
