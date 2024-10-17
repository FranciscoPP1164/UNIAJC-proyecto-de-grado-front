import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMovileComponent } from './menu-movile.component';

describe('MenuMovileComponent', () => {
  let component: MenuMovileComponent;
  let fixture: ComponentFixture<MenuMovileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMovileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuMovileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
