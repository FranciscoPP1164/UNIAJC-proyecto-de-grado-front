import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INavItemConfig } from '../../../../interfaces/configs/INavItem.config';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-movile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-movile.component.html',
  styleUrl: './menu-movile.component.css',
})
export class MenuMovileComponent {
  @Input() public isOpen: boolean = false;
  @Input() public options!: INavItemConfig[];
}
