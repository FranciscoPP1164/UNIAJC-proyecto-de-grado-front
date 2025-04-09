import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INurseResponse } from '../../../../interfaces/api/nurses/INurse.response';
import { INurseRequest } from '../../../../interfaces/api/nurses/INurse.request';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-nurse-form',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './nurse-form.component.html',
  styleUrl: './nurse-form.component.css',
})
export class NurseFormComponent {
  @Input() nurse?: INurseResponse;
  @Output() onSubmit = new EventEmitter<INurseRequest>();

  formNurse!: FormGroup;
  didTrySubmitForm = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildClientForm();
  }

  buildClientForm(): void {
    this.formNurse = this.formBuilder.group({
      name: [this.nurse?.name, [Validators.required]],
      genre: [this.nurse?.genre ?? 'male', [Validators.required]],
      email: [this.nurse?.email, [Validators.required]],
      phone: [this.nurse?.phone, [Validators.required]],
      document_identification: [
        this.nurse?.document_identification,
        [Validators.required],
      ],
    });
  }

  handleSubmitFormClient(): void {
    this.didTrySubmitForm = true;
    if (this.formNurse.invalid) {
      return;
    }

    const nurse = this.formNurse.value;

    this.onSubmit.emit(nurse);
  }

  get formData() {
    return this.formNurse.controls;
  }
}
