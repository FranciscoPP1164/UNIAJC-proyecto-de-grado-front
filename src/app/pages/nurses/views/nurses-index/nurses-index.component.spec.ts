import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursesIndexComponent } from './nurses-index.component';

describe('NursesIndexComponent', () => {
  let component: NursesIndexComponent;
  let fixture: ComponentFixture<NursesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NursesIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NursesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
