import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursesTrashedComponent } from './nurses-trashed.component';

describe('NursesTrashedComponent', () => {
  let component: NursesTrashedComponent;
  let fixture: ComponentFixture<NursesTrashedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NursesTrashedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NursesTrashedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
