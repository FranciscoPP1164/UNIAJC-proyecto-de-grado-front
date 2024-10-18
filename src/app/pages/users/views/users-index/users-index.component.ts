import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from '../../../../layouts/app/app-layout/app-layout.component';
import { UsersService } from '../../../../services/api/users.service';
import { IUserResponse } from '../../../../interfaces/api/users/IUser.response';

@Component({
  selector: 'app-users-index',
  standalone: true,
  imports: [AppLayoutComponent],
  templateUrl: './users-index.component.html',
  styleUrl: './users-index.component.css',
})
export class UsersIndexComponent implements OnInit {
  public constructor(private usersService: UsersService) {}

  public ngOnInit(): void {}
}
