import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCreateComponent } from './clients-create.component';

describe('ClientsCreateComponent', () => {
  let component: ClientsCreateComponent;
  let fixture: ComponentFixture<ClientsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
