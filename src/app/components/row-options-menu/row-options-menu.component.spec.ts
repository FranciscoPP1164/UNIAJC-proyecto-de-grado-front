import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowOptionsMenuComponent } from './row-options-menu.component';

describe('RowOptionsMenuComponent', () => {
  let component: RowOptionsMenuComponent;
  let fixture: ComponentFixture<RowOptionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowOptionsMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RowOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
