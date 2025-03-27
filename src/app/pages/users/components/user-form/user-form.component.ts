import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUserResponse } from '../../../../interfaces/api/users/IUser.response';
import { InputTextComponent } from '../../../../components/forms/inputs/input-text/input-text.component';
import { IUserRequest } from '../../../../interfaces/api/users/IUser.request';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [InputTextComponent, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  @Input() user?: IUserResponse;
  @Output() onSubmit = new EventEmitter<IUserRequest>();

  formUser!: FormGroup;
  didTrySubmitForm = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildUserForm();
  }

  buildUserForm(): void {
    this.formUser = this.formBuilder.group({
      name: [this.user?.name, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]],
      type: [this.user?.type ?? 'admin'],
      status: [this.user?.status ?? 'active'],
    });
  }

  handleSubmitFormUser(): void {
    this.didTrySubmitForm = true;
    if (this.formUser.invalid) {
      return;
    }

    const user = this.formUser.value;

    this.onSubmit.emit(user);
  }

  get formData() {
    return this.formUser.controls;
  }
}
