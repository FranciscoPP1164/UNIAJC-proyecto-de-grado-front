import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTrashedComponent } from './clients-trashed.component';

describe('ClientsTrashedComponent', () => {
  let component: ClientsTrashedComponent;
  let fixture: ComponentFixture<ClientsTrashedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTrashedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsTrashedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
