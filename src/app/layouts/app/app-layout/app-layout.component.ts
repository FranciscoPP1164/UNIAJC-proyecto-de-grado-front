import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/layouts/header/header.component';
import { MenuMovileComponent } from '../../../components/layouts/menus/menu-movile/menu-movile.component';
import { INavItemConfig } from '../../../interfaces/configs/INavItem.config';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/utils/local-storage.service';
import { MenuDesktopComponent } from '../../../components/layouts/menus/menu-desktop/menu-desktop.component';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [HeaderComponent, MenuMovileComponent, MenuDesktopComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
})
export class AppLayoutComponent implements OnInit {
  public isOpenMenu: boolean = false;
  public options: INavItemConfig[] = [
    {
      text: 'Home',
      path: '/',
    },
    {
      text: 'Citas',
      path: '/appointments',
    },
    {
      text: 'Enfermeros',
      path: '/nurses',
    },
    {
      text: 'Clientes',
      path: '/clients',
    },
    {
      text: 'Pacientes',
      path: '/patients',
    },
    {
      text: 'Usuarios',
      path: '/users',
    },
  ];

  public constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  public ngOnInit(): void {
    const route = this.router.url;

    this.options.forEach((option) => {
      if (option.path === route) {
        option.selected = true;
      }
    });

    this.isOpenMenu = Boolean(
      this.localStorageService.getItem('openMenuMovile')
    );
  }

  public handleClickMenuMovileButton(): void {
    this.isOpenMenu = !this.isOpenMenu;
    if (this.isOpenMenu) {
      this.localStorageService.store('openMenuMovile', 'true');
      return;
    }

    this.localStorageService.removeItem('openMenuMovile');
  }
}
