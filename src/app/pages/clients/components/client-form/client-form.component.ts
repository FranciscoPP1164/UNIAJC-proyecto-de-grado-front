import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IClientResponse } from '../../../../interfaces/api/clients/IClient.response';
import { IClientRequest } from '../../../../interfaces/api/clients/IClient.request';
import { InputTextComponent } from '../../../../components/forms/inputs/input-text/input-text.component';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextComponent],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
})
export class ClientFormComponent implements OnInit {
  @Input() client?: IClientResponse;
  @Output() onSubmit = new EventEmitter<IClientRequest>();

  formClient!: FormGroup;
  didTrySubmitForm = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildClientForm();
  }

  buildClientForm(): void {
    this.formClient = this.formBuilder.group({
      name: [this.client?.name, [Validators.required]],
      email: [this.client?.email, [Validators.required]],
      phone: [this.client?.phone, [Validators.required]],
      document_identification: [
        this.client?.document_identification,
        [Validators.required],
      ],
    });
  }

  handleSubmitFormClient(): void {
    this.didTrySubmitForm = true;
    if (this.formClient.invalid) {
      return;
    }

    const client = this.formClient.value;

    this.onSubmit.emit(client);
  }

  get formData() {
    return this.formClient.controls;
  }
}
