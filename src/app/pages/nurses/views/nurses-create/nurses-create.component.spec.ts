import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursesCreateComponent } from './nurses-create.component';

describe('NursesCreateComponent', () => {
  let component: NursesCreateComponent;
  let fixture: ComponentFixture<NursesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NursesCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NursesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
