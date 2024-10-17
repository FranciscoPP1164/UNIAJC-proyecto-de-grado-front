import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/layouts/header/header.component';
import { MenuMovileComponent } from '../../../components/layouts/menus/menu-movile/menu-movile.component';
import { INavItemConfig } from '../../../interfaces/configs/INavItem.config';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/utils/local-storage.service';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [HeaderComponent, MenuMovileComponent],
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

  public handleClickMenuButton(): void {
    this.isOpenMenu = !this.isOpenMenu;
    if (this.isOpenMenu) {
      this.localStorageService.store('openMenuMovile', 'true');
      return;
    }

    this.localStorageService.removeItem('openMenuMovile');
  }
}
