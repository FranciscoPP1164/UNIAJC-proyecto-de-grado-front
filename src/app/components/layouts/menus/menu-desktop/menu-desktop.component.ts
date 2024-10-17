import { Component, Input } from '@angular/core';
import { INavItemConfig } from '../../../../interfaces/configs/INavItem.config';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-desktop',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-desktop.component.html',
  styleUrl: './menu-desktop.component.css',
})
export class MenuDesktopComponent {
  @Input() public options!: INavItemConfig[];
}
